import axios, {
  AxiosAdapter,
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
  ResponseType,
  AxiosHeaders,
} from "axios";
import { template, isNil, mergeDeepRight, path } from "@worksolutions/utils";

import { BaseEntity } from "entities/BaseEntity_chunkExport";
import { Constructable } from "types";

import { AppRequestError } from "./AppRequestError";
import { plainToClass } from "../libs";

export enum METHODS {
  POST = "post",
  GET = "get",
  PUT = "put",
  PATCH = "patch",
  DELETE = "delete",
}

export type AfterRequestSuccessMiddlewareMutableConfig = Pick<
  RequestOptions<any>,
  "entity" | "entityValidationGroups" | "returnRaw" | "validateEntity" | "responseDataFieldPath"
>;

export interface ErrorMiddlewareData {
  error: AppRequestError;
  config: InternalAxiosRequestConfig;
  shareData: Record<string, any>;
  makeRequest: (
    overrideRequestData?: RequestData,
  ) =>
    | [{ requestData: InternalAxiosRequestConfig; axiosResponse: AxiosResponse }, null]
    | [null, { requestData: InternalAxiosRequestConfig; axiosError: AxiosError }];
}

export class RequestManager {
  beforeRequestMiddleware: ((data: { config: InternalAxiosRequestConfig }) => void | Promise<void>)[] = [];
  afterRequestMiddleware: ((data: {
    config: InternalAxiosRequestConfig;
    axiosResponse: AxiosResponse;
  }) => void | Promise<void>)[] = [];
  afterRequestSuccessMiddleware: ((data: {
    mutableConfig: AfterRequestSuccessMiddlewareMutableConfig;
    axiosResponse: AxiosResponse;
  }) => void | Promise<void>)[] = [];

  errorMiddleware: ((data: ErrorMiddlewareData) => AppRequestError | Promise<AppRequestError | null> | null | any)[] =
    [];

  constructor(
    private baseURL = "",
    private requestManagerOptions: { axiosAdapter?: AxiosAdapter } = {},
  ) {}

  getBaseUrl() {
    return this.baseURL;
  }

  private async applyAllBeforeRequestMiddleware(config: InternalAxiosRequestConfig) {
    for (let i = 0; i < this.beforeRequestMiddleware.length; i++) {
      const middleware = this.beforeRequestMiddleware[i];
      await middleware({ config });
    }
  }

  private async applyAllAfterRequestMiddleware(config: InternalAxiosRequestConfig, axiosResponse: AxiosResponse) {
    for (let i = 0; i < this.afterRequestMiddleware.length; i++) {
      const middleware = this.afterRequestMiddleware[i];
      await middleware({ config, axiosResponse });
    }
  }

  private async appleAllAfterRequestSuccessMiddleware(
    mutableConfig: AfterRequestSuccessMiddlewareMutableConfig,
    axiosResponse: AxiosResponse,
  ) {
    for (let i = 0; i < this.afterRequestSuccessMiddleware.length; i++) {
      const middleware = this.afterRequestSuccessMiddleware[i];
      await middleware({ mutableConfig, axiosResponse });
    }
  }

  private async applyAllErrorMiddleware(
    config: InternalAxiosRequestConfig,
    {
      requestData = {},
      error,
      makeRequest,
    }: { requestData?: RequestData; error: AppRequestError; makeRequest: (overrideRequestData?: RequestData) => any },
  ) {
    if (requestData.disableErrorMiddlewares) return error;

    const shareData: Record<string, any> = {};
    for (let i = 0; i < this.errorMiddleware.length; i++) {
      const middleware = this.errorMiddleware[i];
      const middlewareResult = await middleware({ error, config, shareData, makeRequest });
      if (AppRequestError.isRequestError(middlewareResult)) {
        error = middlewareResult;
        continue;
      }
      if (isNil(middlewareResult)) break;
      return middlewareResult;
    }

    return error;
  }

  private async makeRequest({
    url,
    method,
    responseType,
    headers,
    requestConfig,
    requestData: {
      uploadProgressReceiver,
      downloadProgressReceiver,
      urlParams,
      additionalQueryParams,
      body,
      headers: requestDataHeaders = {},
      abortSignal,
    },
  }: Required<Pick<RequestOptions<any>, "url" | "method" | "requestConfig" | "headers">> &
    Pick<RequestOptions<any>, "responseType"> & {
      requestData: RequestData;
    }) {
    const requestData: InternalAxiosRequestConfig = {
      url,
      method,
      adapter: this.requestManagerOptions.axiosAdapter,
      baseURL: this.baseURL,
      responseType,
      headers: new AxiosHeaders(Object.assign({ Accept: "application/json" }, headers, requestDataHeaders)),
      signal: abortSignal,
    };

    if (requestConfig.contentType) requestData.headers!["Content-Type"] = requestConfig.contentType;

    requestData[method === METHODS.GET ? "params" : "data"] = body;

    if (urlParams) requestData.url = template(requestData.url!, urlParams);

    if (additionalQueryParams) requestData.params = additionalQueryParams;

    if (uploadProgressReceiver)
      requestData.onUploadProgress = function ({ loaded, total }) {
        if (total === undefined) return;
        uploadProgressReceiver!(loaded / total);
      };

    if (downloadProgressReceiver)
      requestData.onDownloadProgress = function ({ loaded, total }) {
        if (total === undefined) return;
        downloadProgressReceiver!(loaded / total);
      };

    try {
      //TODO: сделать иммутабельным
      await this.applyAllBeforeRequestMiddleware(requestData);
      const axiosResponse = await axios(requestData);
      downloadProgressReceiver?.(1);
      uploadProgressReceiver?.(1);
      await this.applyAllAfterRequestMiddleware(requestData, axiosResponse);
      return [{ requestData, axiosResponse }, null] as const;
    } catch (axiosError) {
      return [
        null,
        { requestData, axiosError } as { requestData: InternalAxiosRequestConfig; axiosError: AxiosError },
      ] as const;
    }
  }

  createRequest<Entity extends BaseEntity>({
    url,
    headers = {},
    responseType,
    method,
    requestConfig = {},
    ...otherCreateRequestOptions
  }: RequestOptions<Entity>) {
    // eslint-disable-next-line sonarjs/cognitive-complexity,complexity
    return async (requestData: RequestData = {}): Promise<Entity> => {
      const makeRequest = (overrideRequestData: Omit<RequestData, "onError" | "onSuccess"> = {}) =>
        this.makeRequest({
          url,
          headers,
          responseType,
          method,
          requestConfig,
          requestData: mergeDeepRight(requestData, overrideRequestData),
        });

      const stack = new Error().stack;
      const makeRequestResult = await makeRequest();
      const requestError = makeRequestResult[1];
      let requestResult = makeRequestResult[0];

      if (requestError) {
        if (!requestError.axiosError.config) requestError.axiosError.config = requestError.requestData;
        requestError.axiosError.stack = stack;
        const convertedError = await this.applyAllErrorMiddleware(requestError.requestData, {
          error: AppRequestError.buildFromAxiosError(requestError.axiosError),
          requestData,
          makeRequest,
        });

        if (AppRequestError.isRequestError(convertedError)) {
          if (requestData.onError) {
            if (!convertedError.data.cancelled || !!requestData.runOnErrorForCanceledRequest)
              requestData.onError({ config: requestError.requestData, requestError: convertedError });
          }
          throw convertedError;
        }

        if (!isNil(convertedError)) requestResult = convertedError;
      }

      if (!requestResult) return null!;

      const mutableConfig = {
        entity: otherCreateRequestOptions.entity,
        entityValidationGroups: otherCreateRequestOptions.entityValidationGroups,
        returnRaw: otherCreateRequestOptions.returnRaw ?? false,
        validateEntity: otherCreateRequestOptions.validateEntity ?? true,
        responseDataFieldPath: otherCreateRequestOptions.responseDataFieldPath ?? [],
      };
      await this.appleAllAfterRequestSuccessMiddleware(mutableConfig, requestResult.axiosResponse);
      const { entity, entityValidationGroups, returnRaw, validateEntity, responseDataFieldPath } = mutableConfig;

      if (returnRaw) {
        if (requestData.onSuccess)
          requestData.onSuccess({ config: requestResult.requestData, axiosResponse: requestResult.axiosResponse });
        return path(responseDataFieldPath, requestResult.axiosResponse.data) as any;
      }

      if (!entity) return null!;

      try {
        const plain = path(responseDataFieldPath, requestResult.axiosResponse.data) as any;
        const instance = plainToClass(
          entity,
          "__requestSchemaTransform" in entity ? (entity.__requestSchemaTransform as Function)?.(plain) : plain,
        );

        if (validateEntity) {
          await instance.validateAsyncAndThrowFirstError({ groups: entityValidationGroups });
        }

        if (requestData.onSuccess)
          requestData.onSuccess({ config: requestResult.requestData, axiosResponse: requestResult.axiosResponse });

        return instance;
      } catch (e) {
        const convertedError = await this.applyAllErrorMiddleware(requestResult.requestData, {
          error: new AppRequestError(
            {
              message: (e as Error).message,
              statusCode: -1,
              response: undefined,
              messageGroup: `Decoder error while ${method.toUpperCase()} ${url}`,
            },
            { validationError: e, requestResult, stack },
          ),
          requestData,
          makeRequest,
        });

        if (AppRequestError.isRequestError(convertedError)) {
          if (requestData.onError)
            requestData.onError({ config: requestResult.requestData, requestError: convertedError });
          throw convertedError;
        }
        if (!isNil(convertedError)) return convertedError;
        return null!;
      }
    };
  }
}

export interface RequestOptions<Entity extends BaseEntity> {
  url: string;
  method: METHODS;
  responseType?: ResponseType;
  headers?: Record<string, string>;
  entity?: Constructable<Entity>;
  entityValidationGroups?: string[];
  validateEntity?: boolean;
  returnRaw?: boolean;
  requestConfig?: { contentType?: string };
  responseDataFieldPath?: string[];
}

export interface ApiErrorCallbackDataInterface {
  requestError: Error | AppRequestError;
  config: InternalAxiosRequestConfig;
}

export interface ApiSuccessCallbackDataInterface {
  config: InternalAxiosRequestConfig;
  axiosResponse: AxiosResponse;
}

export interface RequestData {
  body?: any;
  headers?: Record<string, string>;
  additionalQueryParams?: Record<string, string | number>;
  urlParams?: Record<string, string | number>;
  disableErrorMiddlewares?: boolean;
  abortSignal?: AbortSignal;
  uploadProgressReceiver?: (progress: number) => void;
  downloadProgressReceiver?: (progress: number) => void;
  runOnErrorForCanceledRequest?: boolean;
  onError?: (data: ApiErrorCallbackDataInterface) => void;
  onSuccess?: (data: ApiSuccessCallbackDataInterface) => void;
}

export * from "./AppRequestError";
