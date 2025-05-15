import React from "react";
import { Form, Input, message } from "antd";
import * as AuthServices from '../../../services/shared/AuthServices';
import * as UserVendorService from '../../../services/vendor/UserVendorService';
import { isJsonString } from "../../../utils";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";

const FormOfVendorRegister = ({ form}) => {
  const user = useSelector((state) => state.user);
  const handleDecoded = () => {
    let storageData = localStorage.getItem("access_token");
    let decoded = {};
    if (storageData && isJsonString(storageData)) {
      const parsed = JSON.parse(storageData);
      decoded = jwtDecode(parsed);
      return { decoded, storageData: parsed };
    }
    return { decoded, storageData };
  };

  const fetchCreateVendor = async (UserVendorData) => {
    try {
      let { storageData, decoded } = handleDecoded();
      let accessToken = storageData;

      if (decoded?.exp < Date.now() / 1000) {
        const res = await AuthServices.refreshToken();
        if (res?.access_token) {
          accessToken = res.access_token;
          localStorage.setItem("access_token", JSON.stringify(accessToken));
        }
      }

      const res = await UserVendorService.createUserVendor(accessToken, UserVendorData);

      if (res?.status === 200) {
        message.success("Tạo người bán thành công!");
        form.resetFields();
      } else {
        message.error("Tạo người bán thất bại!");
      }
    } catch (error) {
      console.error("Lỗi khi tạo người bán:", error);
      message.error("Có lỗi xảy ra khi tạo người bán.");
    }
  };

  const onFinish = (values) => {
    const UserVendorData = {
      user_id: user?.id,
      cccd: values.cccd,
      shop: {
        name: values.shopName,
        phone: values.phone,
        address: values.address,
      },
    };
    
    fetchCreateVendor(UserVendorData);
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      {/* Tên Shop */}
      <Form.Item
        label="Tên Shop"
        name="shopName"
        rules={[{ required: true, message: "Vui lòng nhập tên Shop" }]}
      >
        <Input placeholder="Nhập vào" maxLength={30} />
      </Form.Item>

      {/* CCCD */}
      <Form.Item
        label="Căn cước công dân"
        name="cccd"
        rules={[
          { required: true, message: "Vui lòng nhập số căn cước công dân" },
          {
            pattern: /^[0-9]{12}$/, // đúng 12 số
            message: "Số căn cước công dân phải là 12 chữ số",
          },
        ]}
      >
        <Input placeholder="Nhập căn cước công dân" maxLength={12} />
      </Form.Item>

      {/* Địa chỉ lấy hàng */}
      <Form.Item
        label="Địa chỉ lấy hàng"
        name="address"
        rules={[{ required: true, message: "Vui lòng nhập địa chỉ lấy hàng" }]}
      >
        <Input placeholder="Nhập địa chỉ lấy hàng" />
      </Form.Item>

      {/* Email (disabled) */}
      <Form.Item label="Email" name="email">
        <Input disabled placeholder={user?.email || "Email"} />
      </Form.Item>

      {/* Số điện thoại */}
      <Form.Item
        label="Số điện thoại"
        name="phone"
        rules={[
          { required: true, message: "Vui lòng nhập số điện thoại" },
          {
            pattern: /^[0-9]{10}$/,
            message: "Số điện thoại phải là 10 chữ số",
          },
        ]}
      >
        <Input addonBefore="+84" placeholder="Nhập vào" maxLength={10} />
      </Form.Item>
    </Form>
  );
};

export default FormOfVendorRegister;
