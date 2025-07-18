import "react-toastify/dist/ReactToastify.css";

import React from "react";
import { useEventEmitter } from "@worksolutions/react-utils";
import { message, notification } from "antd";

import {
  NotifyToastifyContainers,
  showInfoRaw,
  showMessageInfoToastify,
  showNotificationWarningToastify,
  showNotificationErrorToastify,
  ToastInfo,
  showNotificationErrorAnt,
  showMessageInfoAnt,
  showNotificationWarningAnt,
  showNotificationSuccessAnt,
} from "./toasts";
import { notificationEventEmitter } from "../../emitter";

function NotificationsContainer() {
  const [notificationApi, notificationContextHolder] = notification.useNotification();
  const [messageApi, messageContextHolder] = message.useMessage();

  useEventEmitter(notificationEventEmitter, "NOTIFICATION_RAW", showInfoRaw);

  useEventEmitter(
    notificationEventEmitter,
    "NOTIFICATION_ERROR",
    React.useCallback((event: ToastInfo) => showNotificationErrorToastify(event, notificationApi), [notificationApi]),
  );

  useEventEmitter(
    notificationEventEmitter,
    "NOTIFICATION_INFO",
    React.useCallback((event: ToastInfo) => showMessageInfoToastify(event, notificationApi), [notificationApi]),
  );

  useEventEmitter(
    notificationEventEmitter,
    "NOTIFICATION_WARNING",
    React.useCallback((event: ToastInfo) => showNotificationWarningToastify(event, notificationApi), [notificationApi]),
  );

  useEventEmitter(
    notificationEventEmitter,
    "MESSAGE_ERROR",
    React.useCallback((event: ToastInfo) => showNotificationErrorAnt(event, messageApi), [messageApi]),
  );

  useEventEmitter(
    notificationEventEmitter,
    "MESSAGE_INFO",
    React.useCallback((event: ToastInfo) => showMessageInfoAnt(event, messageApi), [messageApi]),
  );

  useEventEmitter(
    notificationEventEmitter,
    "MESSAGE_WARNING",
    React.useCallback((event: ToastInfo) => showNotificationWarningAnt(event, messageApi), [messageApi]),
  );

  useEventEmitter(
    notificationEventEmitter,
    "MESSAGE_SUCCESS",
    React.useCallback((event: ToastInfo) => showNotificationSuccessAnt(event, messageApi), [messageApi]),
  );

  return (
    <>
      {notificationContextHolder}
      {messageContextHolder}
      <NotifyToastifyContainers />
    </>
  );
}

export default React.memo(NotificationsContainer);

export { NotifyToastifyContainerId } from "./toasts/notify-toastify";
