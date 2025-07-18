import { BaseEntity, parseServerErrorMessages } from "@app/kit";
import { notificationEventEmitter, NotifyToastifyContainerId } from "@app/ui";

import { ParseServerErrorResult } from "../parse-server-error";

function getMessage(message: string, options: { messagePrefix?: string }) {
  if (options.messagePrefix) return `${options.messagePrefix}: ${message}`;
  return message;
}

export function showDefaultApiErrorToaster(options: {
  error: ParseServerErrorResult;
  unexpectedErrorMessage?: string;
  messagePrefix?: string;
  entity?: { entity: BaseEntity; allowedFields: string[] };
}) {
  parseServerErrorMessages(options.error, options.entity?.allowedFields ?? [], {
    unexpectedError: () =>
      notificationEventEmitter.emit("MESSAGE_ERROR", {
        content: getMessage(options.unexpectedErrorMessage ?? "Unhandled error", options),
        options: { __toastifyOptions: { containerId: NotifyToastifyContainerId.newOnTopLimit3 } },
      }),
    stringError: (message) =>
      notificationEventEmitter.emit("MESSAGE_ERROR", {
        content: getMessage(message, options),
        options: { __toastifyOptions: { containerId: NotifyToastifyContainerId.newOnTopLimit3 } },
      }),
    fieldError: options.entity ? (field, message) => options.entity?.entity.setError(field, message) : undefined,
  });
}

export function showDefaultApiSuccessToaster(options: { text: string; messagePrefix?: string }) {
  notificationEventEmitter.emit("MESSAGE_SUCCESS", { content: getMessage(options.text, options) });
}

export function showDefaultApiWarningToaster(options: { text: string; messagePrefix?: string }) {
  notificationEventEmitter.emit("MESSAGE_WARNING", {
    content: getMessage(options.text, options),
    options: { __toastifyOptions: { containerId: NotifyToastifyContainerId.newOnTopLimit3 } },
  });
}
