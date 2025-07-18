import { $mobx, configure } from "mobx";
import type { ObservableArrayAdministration } from "mobx/dist/types/observablearray";

import { createSetter } from "./libs/setters/createSetter";
import { createSetterArrayObservable } from "./libs/setters/createSetterArrayObservable";
import { createSetterEvent } from "./libs/setters/createSetterEvent";
import { createToggle } from "./libs/setters/createToggle";
import { createPush } from "./libs/setters/createPush";
import { createPushArray } from "./libs/setters/createPushArray";
import { createDeleteByValue } from "./libs/setters/createDeleteByValue";
import { createDeleteByIndex } from "./libs/setters/createDeleteByIndex";
import { createUpdateByIndex } from "./libs/setters/createUpdateByIndex";
import { createReoder } from "./libs/setters/createReoder";
import { onFieldChange, onMultipleFieldChange } from "./libs/events";
import {
  getValidationGroupFields,
  hasValidationGroupError,
  validateAsync,
  validateAsyncAndThrowFirstError,
} from "./libs/validations";
import { removeError, setError } from "./libs/errors";
import { submit } from "./libs/submitter";
import { initMobx } from "./libs/mobx";

configure({
  isolateGlobalState: false,
  enforceActions: "always",
  computedRequiresReaction: false,
  reactionRequiresObservable: false,
});

export class BaseEntity {
  static isBaseEntity(value: any): value is BaseEntity {
    return value instanceof BaseEntity;
  }

  declare errors: Record<string, string | undefined>;
  declare forceShowErrorKeys: Record<string, boolean | undefined>;
  declare viewErrors: Record<string, string | undefined>;
  declare hasAnyUnresolvedErrors: boolean;

  declare submitted: boolean;
  declare fullValid: boolean;
  declare lastSubmitValid: boolean;

  mobx(...args: Parameters<typeof initMobx>) {
    initMobx.apply(this, args);
  }

  declare setError: (...args: Parameters<typeof setError>) => void;
  declare removeError: (...args: Parameters<typeof removeError>) => void;
  declare submit: (...args: Parameters<typeof submit>) => Promise<boolean>;

  protected createSetter<VALUE = unknown>(
    ...args: Parameters<typeof createSetter<VALUE>>
  ): ReturnType<typeof createSetter<VALUE>> {
    return createSetter.apply(this, args);
  }

  protected createSetterArrayObservable<VALUE = unknown>(
    ...args: Parameters<typeof createSetterArrayObservable<VALUE>>
  ): ReturnType<typeof createSetterArrayObservable<VALUE>> {
    return createSetterArrayObservable.apply(this, args);
  }

  protected createSetterEvent(...args: Parameters<typeof createSetterEvent>) {
    return createSetterEvent.apply(this, args);
  }

  protected createToggle(...args: Parameters<typeof createToggle>) {
    return createToggle.apply(this, args);
  }

  protected createPush<VALUE = unknown>(
    ...args: Parameters<typeof createToggle>
  ): ReturnType<typeof createPush<VALUE>> {
    return createPush.apply(this, args);
  }

  protected createPushArray<VALUE = unknown>(
    ...args: Parameters<typeof createPushArray>
  ): ReturnType<typeof createPushArray<VALUE>> {
    return createPushArray.apply(this, args);
  }

  protected createDeleteByValue<VALUE = unknown>(
    ...args: Parameters<typeof createDeleteByValue>
  ): ReturnType<typeof createDeleteByValue<VALUE>> {
    return createDeleteByValue.apply(this, args);
  }

  protected createDeleteByIndex(...args: Parameters<typeof createDeleteByIndex>) {
    return createDeleteByIndex.apply(this, args);
  }

  protected createUpdateByIndex<VALUE = unknown>(
    ...args: Parameters<typeof createUpdateByIndex>
  ): ReturnType<typeof createUpdateByIndex<VALUE>> {
    return createUpdateByIndex.apply(this, args);
  }

  protected createReorder(...args: Parameters<typeof createReoder>) {
    return createReoder.apply(this, args);
  }

  validateAsync(...args: Parameters<typeof validateAsync>) {
    return validateAsync.apply(this, args);
  }

  validateAsyncAndThrowFirstError(...args: Parameters<typeof validateAsyncAndThrowFirstError>) {
    return validateAsyncAndThrowFirstError.apply(this, args);
  }

  getValidationGroupFields(...args: Parameters<typeof getValidationGroupFields>) {
    return getValidationGroupFields.apply(this, args);
  }

  hasValidationGroupError(...args: Parameters<typeof hasValidationGroupError>) {
    return hasValidationGroupError.apply(this, args);
  }

  onFieldChange(...args: Parameters<typeof onFieldChange>) {
    return onFieldChange.apply(this, args);
  }

  onMultipleFieldChange(...args: Parameters<typeof onMultipleFieldChange>) {
    return onMultipleFieldChange.apply(this, args);
  }

  emitArrayLengthChangedEmptyEventHack(this: BaseEntity, fieldName: string) {
    const field = (this as any)[fieldName][$mobx] as ObservableArrayAdministration;
    field.notifyArraySplice_(-1, [], []);
  }

  protected disableEnumerableForMobx(fieldName: string) {
    Object.defineProperty(this, fieldName, { enumerable: false });
  }
}
