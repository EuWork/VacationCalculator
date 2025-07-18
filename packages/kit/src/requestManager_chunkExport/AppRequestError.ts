import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from "axios";

export class AppRequestError extends Error {
  static isRequestError(data: any): data is AppRequestError {
    return data instanceof AppRequestError;
  }

  private static prepareAxiosConfigForDebug(config: InternalAxiosRequestConfig) {
    return {
      timeout: config.timeout,
      headers: config.headers,
      url: config.url,
      baseURL: config.baseURL,
      method: config.method,
      data: config.data,
    };
  }

  static buildFromAxiosError(error: AxiosError<any>) {
    const axiosConfig = this.prepareAxiosConfigForDebug(error.config!);
    return new AppRequestError(
      {
        message: error.response?.data?.message || error.message,
        statusCode: error.response?.status ?? -1,
        response: error.response,
        cancelled: axios.isCancel(error),
        messageGroup: `Axios error while ${axiosConfig.method!.toUpperCase()} ${axiosConfig.url}`,
      },
      { axiosConfig, stack: error.stack, originalError: error },
    );
  }

  constructor(
    public data: {
      message: string;
      messageGroup?: string;
      statusCode: number;
      response?: AxiosResponse;
      cancelled?: boolean;
    },
    public debug?: any,
  ) {
    super(data.message);
    if (typeof window !== "undefined" && (window as any).disableAppRequestErrorLogger) return;
    const group = data.messageGroup ?? data.message;
    console.groupCollapsed(group);
    console.groupCollapsed("Debug info");
    console.log(debug);
    console.groupEnd();
    console.groupCollapsed("Serialized error");
    console.dir(this.serialize(), { depth: 30 });
    console.groupEnd();
    console.groupEnd();
  }

  serialize() {
    return {
      message: this.data.message,
      group: this.data.messageGroup,
      statusCode: this.data.statusCode,
      data: this.data.response?.data ?? null,
    };
  }
}
