import { EventEmitter } from "@worksolutions/utils";
import { SimpleEventEmitter } from "@app/kit";

import { ToastInfo } from "./_system/container/toasts";

export const notificationEventEmitter = new EventEmitter<{
  NOTIFICATION_RAW: ToastInfo;
  NOTIFICATION_ERROR: ToastInfo;
  NOTIFICATION_INFO: ToastInfo;
  NOTIFICATION_WARNING: ToastInfo;
  MESSAGE_ERROR: ToastInfo;
  MESSAGE_INFO: ToastInfo;
  MESSAGE_WARNING: ToastInfo;
  MESSAGE_SUCCESS: ToastInfo;
}>(SimpleEventEmitter);

export { type ToastInfo } from "./_system/container/toasts";
