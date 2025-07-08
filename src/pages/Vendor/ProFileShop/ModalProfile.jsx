import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Input, message, Spin, Row, Col } from "antd";
import * as AuthServices from "../../../services/shared/AuthServices";
import * as UserVendorService from "../../../services/vendor/UserVendorService";
import { isJsonString } from "../../../utils";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";

export const ModalProfile = ({ visible, onClose, initialValues, onUpdateSuccess }) => {

    const [form] = Form.useForm();

    const handleDecoded = async () => {
    let storageToken = localStorage.getItem("access_token");
    if (!storageToken) return null;

    if (isJsonString(storageToken)) {
        storageToken = JSON.parse(storageToken);
    }

    try {
        const decoded = jwtDecode(storageToken);
        const isExpired = decoded.exp < Date.now() / 1000;

        if (isExpired) {
        const res = await AuthServices.refreshToken();
        const newAccessToken = res?.access_token;
        if (newAccessToken) {
            localStorage.setItem("access_token", newAccessToken);
            return { decoded: jwtDecode(newAccessToken), storageData: newAccessToken };
        } else {
            return null;
        }
        }

        return { decoded, storageData: storageToken };
    } catch (err) {
        console.error("Lỗi khi decode token:", err);
        return null;
    }
};

  const handleUpdate = async () => {
  try {
    const values = await form.validateFields();

    const { storageData } = await handleDecoded();
    if (!storageData) {
      message.error("Vui lòng đăng nhập lại!");
      return;
    }

    const res = await UserVendorService.updateUserVendor(storageData, values);
    if (res?.status === "OK") {
      message.success("Cập nhật thông tin thành công!");
      onUpdateSuccess(res.data);
      onClose();
      form.resetFields(); // thêm nếu muốn reset sau khi đóng modal
    } else {
      message.error("Cập nhật thất bại!");
    }
  } catch (error) {
    console.error(error);
    message.error("Lỗi khi cập nhật thông tin");
  }
};

useEffect(() => {
  if (initialValues) {
    form.setFieldsValue({
      shopName: initialValues.shopName,
      description: initialValues.description,
      phone: initialValues.phone,
      city: initialValues.city,
      address: initialValues.address
    });
  }
}, [initialValues]);

  return (
    <Modal
      title={<h3 style={{ textAlign: "center" }}>Chỉnh sửa thông tin cửa hàng</h3>}
      open={visible}
      onCancel={onClose}
      onOk={handleUpdate}
      okText="Sửa thông tin"
      cancelText="Hủy"
    >
      <Form form={form} layout="vertical"> 

        <Row gutter={16}>
            <Col span={12}>
                <Form.Item
                label="Tên shop"
                name="shopName"
                rules={[{ required: true, message: "Vui lòng nhập tên shop" }]}
                >
                <Input />
                </Form.Item>

                <Form.Item label="Mô tả" name="description">
                <Input.TextArea rows={3} />
                </Form.Item>
            </Col>

            <Col span={12}>
                <Form.Item
                label="Số điện thoại"
                name="phone"
                rules={[
                    { required: true, message: "Vui lòng nhập số điện thoại" },
                    { pattern: /^[0-9]{10}$/, message: "Số điện thoại không hợp lệ" },
                ]}
                >
                <Input />
                </Form.Item>

                <Form.Item
                label="Thành phố"
                name="city"
                rules={[{ required: true, message: "Vui lòng nhập thành phố" }]}
                >
                <Input />
                </Form.Item>

                <Form.Item
                label="Địa chỉ"
                name="address"
                rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
                >
                <Input />
                </Form.Item>
            </Col>
        </Row>
      </Form>
    </Modal>
  )
}

export default ModalProfile;