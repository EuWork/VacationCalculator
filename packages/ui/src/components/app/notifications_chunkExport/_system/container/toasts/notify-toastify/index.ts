import { Id, toast, ToastOptions } from "react-toastify";

import { ToastInfo } from "../index";
import { NotifyToastifyContainerId } from "./Containers";

import "./style.css";

const rawToastOptions: Partial<ToastOptions> = {
  position: "top-right",
  autoClose: 10000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  theme: "dark",
  closeButton: false,
  icon: false,
  containerId: NotifyToastifyContainerId.default,
};

const openedToasts = new Set<Id>();

export function showInfoRaw(data: ToastInfo) {
  const options: ToastOptions = { ...rawToastOptions, onClose: () => openedToasts.delete(id) };
  if (data.options) {
    if ("autoClose" in data.options) options.autoClose = data.options.autoClose!;
    if ("placement" in data.options) {
      if (data.options.placement === "topRight") options.position = "top-right";
      if (data.options.placement === "topCenter") options.position = "top-center";
    }

    if (data.options.__toastifyOptions?.containerId) {
      options.containerId = data.options.__toastifyOptions.containerId;
    }
  }

  if (options.containerId === NotifyToastifyContainerId.newOnTopLimit3) {
    if (openedToasts.size === 3) {
      const id = [...openedToasts.values()][0];
      toast.dismiss(id);
      openedToasts.delete(id);
    }
  }

  const id = toast.success(data.content, options);
  openedToasts.add(id);
}

export { default as NotifyToastifyContainers, NotifyToastifyContainerId } from "./Containers";
