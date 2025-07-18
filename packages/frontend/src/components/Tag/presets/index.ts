import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  MinusCircleOutlined,
  ToolOutlined,
  WarningOutlined,
} from "@ant-design/icons";

export const icons = {
  success: CheckCircleOutlined,
  warning: ExclamationCircleOutlined,
  error: WarningOutlined,
  minus: MinusCircleOutlined,
  repair: ToolOutlined,
};

export const defaultIconByColor = {
  success: icons.success,
  warning: icons.warning,
  error: icons.error,
  default: null,
};
