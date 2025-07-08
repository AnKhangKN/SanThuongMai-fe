import React, { useEffect, useState } from 'react'
import shopLogo from '../../../assets/images/Logo_Trang.jpg'
import {
  ShopProfileWrapper,
  ShopAvatar,
  ShopInfo,
  ShopName,
  ShopDescription,
  CustomUpload,
} from './styleOfProfile';
// import { useSelector } from 'react-redux';
import { Modal, Button, Form, Input, Divider, Descriptions, Spin, message, Row, Col, Flex, Upload } from 'antd';
import * as AuthServices from "../../../services/shared/AuthServices";
import * as UserVendorService from "../../../services/vendor/UserVendorService";
import { isJsonString } from "../../../utils";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import ModalProfile from './ModalProfile';
import {
  UploadOutlined,
} from '@ant-design/icons';

const ProFileShop = () => {
  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fileList, setFileList] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shopInfo, setShopInfo] = useState({});

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const baseUrl = "http://localhost:8080"; // backend url

    const handleDecoded = async () => {
      let storageToken = localStorage.getItem("access_token");
    
      if (!storageToken) return null;
    
      // Nếu token đang ở dạng JSON string → parse
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
            return newAccessToken;
          } else {
            return null;
          }
        }
    
        return storageToken;
      } catch (err) {
        console.error("Lỗi khi decode token:", err);
        return null;
      }
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

  const handleUploadAvatar = async () => {
  const token = await handleDecoded();
  if (!token) {
    message.error("Vui lòng đăng nhập lại.");
    return;
  }

  const formData = new FormData();
  formData.append("image", fileList[0].originFileObj);

  try {
    const res = await UserVendorService.updateVendorAvatar(token, formData);
    if (res?.status === "OK") {
      message.success("Cập nhật ảnh thành công!");
      fetchGetVendor();
      setShop(res.data); // ✅ Cập nhật lại state shop -> React tự re-render ảnh
      setFileList([]); // Xóa file đã chọn (tùy bạn)
    } else {
      message.error("Thất bại khi cập nhật ảnh.");
    }
  } catch (error) {
    console.error(error);
    message.error("Có lỗi xảy ra khi cập nhật ảnh.");
  }
};

  return (
    <>
      <ShopProfileWrapper>
      
      <ShopInfo>
        <ShopName>{ shop.shopName || "Tên shop chưa có"}</ShopName>

        <ShopDescription>{shop.description || "Chưa có mô tả cho shop."}</ShopDescription>

        <Divider />

        <Row gutter={16}>
          <Col span={8}>
            <ShopAvatar src={  shop.shopAvatar
      ? `${baseUrl}/api/avatar/${shop.shopAvatar}?t=${Date.now()}`
      : shopLogo
  } />    
            
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
              <CustomUpload
              listType="picture"
              fileList={fileList}
              beforeUpload={() => false}
              onChange={({ fileList }) => setFileList(fileList)}
              maxCount={1}
            >
              <Button icon={<UploadOutlined />} >Chọn ảnh mới</Button>
            </CustomUpload>
                    <Divider type="vertical" />
            <Button type="primary" onClick={handleUploadAvatar} disabled={fileList.length === 0}>
              Cập nhật ảnh
            </Button>
            </div>
            
          </Col>

          <Col span={16}>
              <Descriptions column={1} size="small">
          <Descriptions.Item label="Điện thoại">{ shop.phone || "Chưa có"}</Descriptions.Item>
          <Descriptions.Item label="Địa chỉ">{ shop.address || "Chưa có"}</Descriptions.Item>
          <Descriptions.Item label="Thành phố">{ shop.city || "Chưa có"}</Descriptions.Item>
          <Descriptions.Item label="Trạng thái tài khoản">
          {shop.state === 'active'
            ? 'Đang hoạt động'
            : shop.state === 'pending'
            ? 'Chờ xét duyệt'
            : 'Ngưng hoạt động'}
        </Descriptions.Item>
          <Descriptions.Item label="Người theo dõi">{ shop.followers || 0}</Descriptions.Item>
          <Descriptions.Item label="Sản phẩm đã bán">{ shop.soldCount || 0}</Descriptions.Item>
        </Descriptions>
          </Col>
        </Row>

        <Row style={{ display: Flex, alignItems: "center", justifyContent: "center" }}>
          <Button type="primary" style={{ marginTop: 16, width: "40%" }} onClick={openModal}>
          Sửa thông tin cửa hàng
        </Button>
        </Row>

        <ModalProfile
        visible={isModalOpen}
        onClose={closeModal}
        initialValues={shop}
        onUpdateSuccess={(updatedShop) => {
          setShop(updatedShop); // <- Cập nhật lại UI ngay
          fetchGetVendor();
          setIsModalOpen(false);
        }}
        />
      </ShopInfo>
    </ShopProfileWrapper>
    </>
  )
}

export default ProFileShop;
