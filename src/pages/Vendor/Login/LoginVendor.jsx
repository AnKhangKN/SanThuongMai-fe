import React from "react";
import { Button, Input, Form } from "antd";
import {
  LoginContainer,
  LoginBox,
  Title,
  StyledFormItem,
  ExtraLinks,
} from "./styleOfLogin";
import { Link, useNavigate } from "react-router-dom";

const LoginVendor = () => {
  const navigate = useNavigate();

  const handleClickToRegister = () => {
    navigate("/vendor/register"); // Đường dẫn bạn muốn chuyển đến
  };

  const handleFinish = (values) => {
    console.log("Login info:", values);
    // Xử lý đăng nhập
  };
  return (
    <LoginContainer>
      <LoginBox>
        <Title>Đăng nhập Vendor</Title>
        <Form layout="vertical" onFinish={handleFinish}>
          <StyledFormItem
            label="Tên đăng nhập"
            name="username"
            rules={[
              { required: true, message: "Vui lòng nhập tên đăng nhập!" },
            ]}
          >
            <Input placeholder="Tên đăng nhập" />
          </StyledFormItem>

          <StyledFormItem
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password placeholder="Mật khẩu" />
          </StyledFormItem>

          <Button type="primary" htmlType="submit" block>
            Đăng nhập
          </Button>

          <ExtraLinks>
            <Link to="">Quên mật khẩu?</Link>
            <span>
              Chưa có tài khoản?{" "}
              <Link to="/vendor/register">
                Đăng ký
              </Link>
            </span>
          </ExtraLinks>
        </Form>
      </LoginBox>
    </LoginContainer>
  );
};

export default LoginVendor;
