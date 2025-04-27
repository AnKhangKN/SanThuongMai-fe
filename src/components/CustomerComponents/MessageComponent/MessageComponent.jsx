import { message } from "antd";

const info = (mes = "information") => {
  message.info(mes);
};

const error = (mes = "error") => {
  message.error(mes);
};

const success = (mes = "success") => {
  message.success(mes);
};

const warning = (mes = "warning") => {
  message.warning(mes);
};

export { info, error, success, warning };
