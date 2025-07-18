import type { ArgsProps as NotificationArgProps, NotificationInstance } from "antd/es/notification/interface";
import type { ArgsProps as MessageArgProps, MessageInstance } from "antd/es/message/interface";

import "./style.css";

import { ToastInfo } from "../index";

const notificationOptions: Partial<NotificationArgProps> = {
  duration: 10,
  placement: "topRight",
};

const messageOptions: Partial<MessageArgProps> = {
  duration: 10,
};

function getNotificationOptions(data: ToastInfo) {
  const options: NotificationArgProps = { ...notificationOptions, message: "", description: data.content };
  if (data.options) {
    if ("autoClose" in data.options) options.duration = data.options.autoClose! / 1000;
    if ("placement" in data.options) {
      if (data.options.placement === "topRight") options.placement = "topRight";
      if (data.options.placement === "topCenter") options.placement = "top";
    }
  }

  return options;
}

function getMessageOptions(data: ToastInfo) {
  const options: MessageArgProps = { ...messageOptions, content: data.content };
  if (data.options) {
    if ("autoClose" in data.options) options.duration = data.options.autoClose! / 1000;
  }

  return options;
}

export function showNotificationErrorToastify(data: ToastInfo, api: NotificationInstance) {
  api.error(getNotificationOptions(data));
}

export function showMessageInfoToastify(data: ToastInfo, api: NotificationInstance) {
  api.info(getNotificationOptions(data));
}

export function showNotificationWarningToastify(data: ToastInfo, api: NotificationInstance) {
  api.warning(getNotificationOptions(data));
}

export function showNotificationErrorAnt(data: ToastInfo, api: MessageInstance) {
  void api.error(getMessageOptions(data));
}

export function showMessageInfoAnt(data: ToastInfo, api: MessageInstance) {
  void api.info(getMessageOptions(data));
}

export function showNotificationWarningAnt(data: ToastInfo, api: MessageInstance) {
  void api.warning(getMessageOptions(data));
}

export function showNotificationSuccessAnt(data: ToastInfo, api: MessageInstance) {
  void api.success(getMessageOptions(data));
}
