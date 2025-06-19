import React, { useState } from 'react'
import shopLogo from '../../../assets/images/Logo_Trang.jpg'
import {
  ShopProfileWrapper,
  ShopAvatar,
  ShopInfo,
  ShopName,
  ShopDescription,
  ShopDetail
} from './styleOfProfile';
import { useSelector } from 'react-redux';
import { Modal, Button, Form, Input } from 'antd';

const ProFileShop = () => {
  const user = useSelector((state) => state.user);

  const [isModalVisible, setIsModalVisible] = useState(false);

  // Form instance để reset hoặc validate
  const [form] = Form.useForm();

  // Mở modal
  const showModal = () => {
    // Khi mở modal, đặt giá trị form theo user hiện tại
    form.setFieldsValue({
      shopName: 'Shop Thể Thao HKN', // Bạn có thể lấy từ user nếu có
      email: user?.email,
      phone: user?.shop?.phone,
      address: '123 Nguyễn Trãi, Q.5, TP.HCM', // Nên lấy từ state nếu có
      description: 'Chuyên cung cấp các dụng cụ thể thao chất lượng cao, giá cả hợp lý.'
    });
    setIsModalVisible(true);
  };

  // Đóng modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Xử lý submit form
  const onFinish = (values) => {
    console.log('Thông tin sửa:', values);
    // Ở đây bạn có thể gọi API để lưu thông tin
    // Sau khi lưu thành công thì đóng modal
    setIsModalVisible(false);
  };

  return (
    <>
      <ShopProfileWrapper>
        <ShopAvatar src={shopLogo} alt="Shop Logo" />
        <ShopInfo>
          <ShopName>Shop Thể Thao HKN</ShopName>
          <ShopDescription>
            Chuyên cung cấp các dụng cụ thể thao chất lượng cao, giá cả hợp lý.
          </ShopDescription>
          <ShopDetail>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Điện thoại:</strong> {user?.shop?.phone}</p>
            <p><strong>Địa chỉ:</strong> 123 Nguyễn Trãi, Q.5, TP.HCM</p>
          </ShopDetail>
          <Button type="primary" onClick={showModal}>Sửa thông tin cửa hàng</Button>
        </ShopInfo>
      </ShopProfileWrapper>

      <Modal
        title="Sửa thông tin cửa hàng"
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={() => form.submit()}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            label="Tên shop"
            name="shopName"
            rules={[{ required: true, message: 'Vui lòng nhập tên shop!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Vui lòng nhập email!' },
              { type: 'email', message: 'Email không hợp lệ!' }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Điện thoại"
            name="phone"
            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Địa chỉ"
            name="address"
            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mô tả"
            name="description"
          >
            <Input.TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default ProFileShop;
