import React, { useEffect, useState } from 'react'
import shopLogo from '../../../assets/images/Logo_Trang.jpg'
import {
  ShopProfileWrapper,
  ShopAvatar,
  ShopInfo,
  ShopName,
  ShopDescription,
  ShopDetail
} from './styleOfProfile';
// import { useSelector } from 'react-redux';
import { Modal, Button, Form, Input, Divider, Descriptions, Spin, message, Row, Col } from 'antd';
import * as AuthServices from "../../../services/shared/AuthServices";
import * as UserVendorService from "../../../services/vendor/UserVendorService";
import { isJsonString } from "../../../utils";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";

const ProFileShop = () => {
  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);

  const baseUrl = "http://localhost:8080"; // backend url

  // const [isModalVisible, setIsModalVisible] = useState(false);

  // // Form instance để reset hoặc validate
  // const [form] = Form.useForm();

  // // Mở modal
  // const showModal = () => {
  //   // Khi mở modal, đặt giá trị form theo user hiện tại
  //   form.setFieldsValue({
  //     shopName: 'Shop Thể Thao HKN', // Bạn có thể lấy từ user nếu có
  //     email: user?.email,
  //     phone: user?.shop?.phone,
  //     address: '123 Nguyễn Trãi, Q.5, TP.HCM', // Nên lấy từ state nếu có
  //     description: 'Chuyên cung cấp các dụng cụ thể thao chất lượng cao, giá cả hợp lý.'
  //   });
  //   setIsModalVisible(true);
  // };

  // // Đóng modal
  // const handleCancel = () => {
  //   setIsModalVisible(false);
  // };

  // // Xử lý submit form
  // const onFinish = (values) => {
  //   console.log('Thông tin sửa:', values);
  //   // Ở đây bạn có thể gọi API để lưu thông tin
  //   // Sau khi lưu thành công thì đóng modal
  //   setIsModalVisible(false);
  // };

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

  const fetchGetVendor = async () => {
    try {
      const token = await handleDecoded();
      if (!token) {
        message.error("Không có token hợp lệ.");
        return;
      }

      const res = await UserVendorService.getVendorInfo(token);
      if (res?.status === "OK" && res.data) {
        setShop(res.data);
      } else {
        message.error("Không thể lấy thông tin cửa hàng.");
      }
    } catch (error) {
      console.error("Lỗi khi lấy thông tin shop:", error);
      message.error("Có lỗi xảy ra khi lấy thông tin.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGetVendor();
  }, []);

  if (loading) return <Spin tip="Đang tải thông tin cửa hàng..." />;

  if (!shop) return <p>Không tìm thấy thông tin cửa hàng.</p>;
  return (
    <>
      <ShopProfileWrapper>
      
      <ShopInfo>
        <ShopName>{ shop.shopName || "Tên shop chưa có"}</ShopName>

        <ShopDescription>{shop.description || "Chưa có mô tả cho shop."}</ShopDescription>

        <Divider />

        <Row>
          <Col span={12}>
            <ShopAvatar src={ shop.shopAvatar
            ? `${baseUrl}/api/avatar/${shop.shopAvatar}`
            : shopLogo} alt="Shop Logo" />            
          </Col>

          <Col span={12}>
              <Descriptions column={1} size="small">
          <Descriptions.Item label="Điện thoại">{ shop.phone || "Chưa có"}</Descriptions.Item>
          <Descriptions.Item label="Địa chỉ">{ shop.address || "Chưa có"}</Descriptions.Item>
          <Descriptions.Item label="Thành phố">{ shop.city || "Chưa có"}</Descriptions.Item>
          <Descriptions.Item label="Trạng thái tài khoản">
            { shop.state === 'active'
              ? 'Đang hoạt động'
              : 0 === 'pending'
              ? 'Chờ xét duyệt'
              : 'Ngưng hoạt động'}
          </Descriptions.Item>
          <Descriptions.Item label="Người theo dõi">{ shop.followers || 0}</Descriptions.Item>
          <Descriptions.Item label="Sản phẩm đã bán">{ shop.soldCount || 0}</Descriptions.Item>
        </Descriptions>
          </Col>
        </Row>        

        <Button type="primary"  style={{ marginTop: 16 }}>
          {/* onClick={showModal} */}
          Sửa thông tin cửa hàng
        </Button>
      </ShopInfo>
    </ShopProfileWrapper>

      {/* <Modal
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
      </Modal> */}
    </>
  )
}

export default ProFileShop;
