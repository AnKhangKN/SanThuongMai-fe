import React from "react";
import { Result } from "antd";
import { Link } from "react-router-dom";
const NotFoundPage = () => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={
      <Link to="/" type="primary">
        Quay lại trang chủ
      </Link>
    }
  />
);

export default NotFoundPage;
