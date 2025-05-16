import React from "react";
import AccountPage from "../AccountPage";
import { Wrapper } from "./style";
import { Input, Form, Button, message, Card } from "antd";
import * as UserServices from "../../../../services/customer/UserServices";
import { isJsonString } from "../../../../utils";
import { jwtDecode } from "jwt-decode";
import * as AuthServices from "../../../../services/shared/AuthServices";

const PasswordChangePage = () => {
  const handleDecoded = async () => {
    let storageData = localStorage.getItem("access_token");
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData);
      const decoded = jwtDecode(storageData);
      if (decoded?.exp < Date.now() / 1000) {
        const res = await AuthServices.refreshToken();
        const accessToken = res?.access_token;
        localStorage.setItem("access_token", JSON.stringify(accessToken));
        return accessToken;
      }
      return storageData;
    }
    return null;
  };

  const onFinish = async (values) => {
    const { currentPassword, newPassword, confirmNewPassword } = values;

    if (newPassword !== confirmNewPassword) {
      return message.error("Mật khẩu mới và xác nhận mật khẩu không khớp.");
    }

    try {
      const token = await handleDecoded();

      const res = await UserServices.changePassword(token, {
        currentPassword,
        newPassword,
      });

      message.success("Đổi mật khẩu thành công!");
    } catch (error) {
      message.error(error.message || "Đã xảy ra lỗi, vui lòng thử lại.");
    }
  };

  return (
    <AccountPage>
      <Wrapper>
        <Card className="w-96 p-6 rounded-xl shadow-lg">
          <h4 className="text-2xl font-bold mb-4 text-center">Đổi mật khẩu</h4>
          <Form onFinish={onFinish} layout="vertical">
            <Form.Item
              name="currentPassword"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu hiện tại" },
              ]}
            >
              <Input.Password placeholder="Mật khẩu hiện tại" />
            </Form.Item>

            <Form.Item
              name="newPassword"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu mới" },
              ]}
            >
              <Input.Password placeholder="Mật khẩu mới" />
            </Form.Item>

            <Form.Item
              name="confirmNewPassword"
              rules={[
                { required: true, message: "Vui lòng xác nhận mật khẩu" },
              ]}
            >
              <Input.Password placeholder="Xác nhận mật khẩu mới" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Đổi mật khẩu
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Wrapper>
    </AccountPage>
  );
};

export default PasswordChangePage;
