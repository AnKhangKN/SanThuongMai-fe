import React , { useState } from "react";
import { Form, Input, Button, message, Col, Row, Upload } from "antd";
import VendorSteps from "../../../components/VendorComponents/VendorSteps/VendorSteps";
import {
  WrapperFormItem,
  WrapperFormVendor,
  WrapperPositionButtonVendor,
  WrapperStepsPadding,
  WrapperStepsVendor,
} from "./styleForm";
import {
  UploadOutlined,
} from '@ant-design/icons';
import * as AuthServices from "../../../services/shared/AuthServices";
import * as UserVendorService from "../../../services/vendor/UserVendorService";
import { isJsonString } from "../../../utils";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [fileList, setFileList] = useState([]);

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

  const fetchCreateVendor = async (formData) => {
  try {
    const token = await handleDecoded();

    const res = await UserVendorService.createUserVendor(
      token,
      formData
    );

    if (res?.status === 200) {
      message.success("Tạo người bán thành công!");
      form.resetFields();
      navigate("/vendor/register-success");
    } else {
      message.error("Tạo người bán thất bại!");
    }
  } catch (error) {
    console.error("Lỗi khi tạo người bán:", error);
    message.error("Có lỗi xảy ra khi tạo người bán.");
  }
};

  const beforeUpload = (file) => {
  const isImage = file.type.startsWith("image/");
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isImage) {
    message.error("Chỉ được upload ảnh!");
    return Upload.LIST_IGNORE;
  }
  if (!isLt2M) {
    message.error("Ảnh phải nhỏ hơn 2MB!");
    return Upload.LIST_IGNORE;
  }
  return true;
};

const handleChange = ({ fileList: newFileList }) => {
  setFileList(newFileList);
};

  const onFinish = async (values) => {
  try {
    const formData = new FormData();
    

    const shopData = {
      shopName: values.shopName,
      phone: values.phone,
      address: values.address,
      city: values.city,
      description: values.description || "",
      ownerId: user?.id, // Có thể không cần nếu backend lấy từ URL
      // ⚠️ shopAvatar: giá trị sẽ được backend set từ ảnh upload, không cần thêm ở đây!
        };

    if (fileList.length > 0) {
      formData.append("image", fileList[0].originFileObj);
      // Có thể backend cần tự set field `shopAvatar` trong service sau khi lưu file
    }
    
    formData.append("shop", JSON.stringify(shopData)); // 👈 RẤT QUAN TRỌNG
    console.log("🔥 shopData gửi:", shopData);

    // Đưa userId vào query hoặc URL tùy backend, nếu cần
    await fetchCreateVendor(formData);
  } catch (err) {
    console.error("Lỗi khi xử lý form:", err);
  }
};

  return (
    <div>
      <WrapperStepsPadding>
        <WrapperStepsVendor>
          <VendorSteps current={0} />
        </WrapperStepsVendor>
      </WrapperStepsPadding>

      <WrapperStepsPadding>
        <WrapperFormVendor>
          <Form form={form} layout="vertical" onFinish={onFinish}>

            <Row>
              <Col span={8}>
                <WrapperFormItem label="Hình ảnh của cửa hàng" name="image">
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={handleChange}
              beforeUpload={beforeUpload}
              maxCount={1}
              showUploadList={true}
              onPreview={(file) => {
                window.open(URL.createObjectURL(file.originFileObj));
              }}
            >
              {fileList.length < 1 && (
                <div>
                  <UploadOutlined />
                  <div style={{ marginTop: 8 }}>Thêm ảnh</div>
                </div>
              )}
            </Upload>
          </WrapperFormItem>

                {/* Tên Shop */}
                <WrapperFormItem
                  label="Tên Shop"
                  name="shopName"
                  rules={[{ required: true, message: "Vui lòng nhập tên Shop" }]}
                >
                  <Input placeholder="Nhập vào" maxLength={30} />
                </WrapperFormItem>
              </Col>

              <Col span={8}>
                <WrapperFormItem
                label="Mô tả"
                name="description"
              >
                <Input placeholder="Nhập mô tả cửa hàng" />
            </WrapperFormItem>

                <WrapperFormItem
                label="Thành phố"
                name="city"
                rules={[
                  { required: true, message: "Vui lòng chọn thành phố" },
                ]}
              >
                <Input placeholder="Nhập thành phố" />
            </WrapperFormItem>

            {/* Địa chỉ lấy hàng */}
            <WrapperFormItem
              label="Địa chỉ lấy hàng"
              name="address"
              rules={[{ required: true, message: "Vui lòng nhập địa chỉ lấy hàng" }]}
            >
              <Input placeholder="Nhập địa chỉ lấy hàng" />
            </WrapperFormItem>
              </Col>

              <Col span={8}>
                {/* Email */}
            <WrapperFormItem label="Email" name="email">
              <Input disabled placeholder={user?.email || "Email"} />
            </WrapperFormItem>

            {/* Số điện thoại */}
            <WrapperFormItem
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
            </WrapperFormItem>
              </Col>
            </Row>
          
          </Form>
        </WrapperFormVendor>
      </WrapperStepsPadding>

      <WrapperPositionButtonVendor>
        <Button
          style={{ backgroundColor: "#333", color: "#fff" }}
          onClick={async () => {
            try {
              await form.validateFields();
              form.submit(); // Gọi onFinish
            } catch {
              message.error("Vui lòng điền đầy đủ thông tin hợp lệ!");
            }
          }}
        >
          Tiếp theo
        </Button>
      </WrapperPositionButtonVendor>
    </div>
  );
};

export default RegisterForm;
