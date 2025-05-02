import React from "react";
import {Form, Input } from "antd";


const FormOfVendorRegister = () => {
  const [form] = Form.useForm();

  return (
    <div style={{ maxWidth: "500px", margin: "auto" }}>
      <Form form={form} layout="vertical">
        {/* Tên Shop */}
        <Form.Item
          label="Tên Shop"
          name="shopName"
          rules={[{ required: true, message: "Vui lòng nhập tên Shop" }]}
        >
          <Input placeholder="Nhập vào" maxLength={30} />
        </Form.Item>

        <Form.Item label="Căn cước công dân" name="address">
          <Input placeholder="Nhập căn cước công dân" />
        </Form.Item>

        {/* Địa chỉ lấy hàng */}
        <Form.Item label="Địa chỉ lấy hàng" name="address">
          <Input placeholder="Nhập địa chỉ lấy hàng" />
        </Form.Item>

        {/* Email (disabled) */}
        <Form.Item label="Email" name="email">
          <Input disabled placeholder="hieu02617@gmail.com" />
        </Form.Item>

        {/* Số điện thoại */}
        <Form.Item
          label="Số điện thoại"
          name="phone"
          rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
        >
          <Input addonBefore="+84" placeholder="Nhập vào" />
        </Form.Item>

        {/* Nhập mã xác minh
        <Form.Item label="Mã xác minh" name="verificationCode">
          <Input placeholder="Nhập vào" />
        </Form.Item> */}
      </Form>
    </div>
  );
};

export default FormOfVendorRegister