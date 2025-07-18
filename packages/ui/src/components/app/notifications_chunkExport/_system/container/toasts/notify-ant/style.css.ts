import { globalStyle } from "@vanilla-extract/css";

globalStyle(".ant-notification .ant-notification-notice-message:empty", {
  display: "none",
});

globalStyle(".ant-notification .ant-notification-notice-close", {
  right: "6px !important",
  top: "6px !important",
});
