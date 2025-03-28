import React, { useState } from "react";
import { Button, Form, Input, Modal, Select } from "antd";

const { Option } = Select;

const provinces = [
  {
    id: "1",
    name: "Hà Nội",
    districts: [
      {
        id: "11",
        name: "Quận Ba Đình",
        wards: [{ id: "111", name: "Phường Điện Biên" }, { id: "112", name: "Phường Cống Vị" }],
      },
      {
        id: "12",
        name: "Quận Hoàn Kiếm",
        wards: [{ id: "121", name: "Phường Hàng Trống" }, { id: "122", name: "Phường Lý Thái Tổ" }],
      },
    ],
  },
  {
    id: "2",
    name: "TP. Hồ Chí Minh",
    districts: [
      {
        id: "21",
        name: "Quận 1",
        wards: [{ id: "211", name: "Phường Bến Nghé" }, { id: "212", name: "Phường Bến Thành" }],
      },
    ],
  },
];

const FormOfVendorRegister = () => {
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  const showAddressModal = () => {
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const handleProvinceChange = (value) => {
    setSelectedProvince(value);
    setSelectedDistrict(null);
  };

  const handleDistrictChange = (value) => {
    setSelectedDistrict(value);
  };

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

        {/* Địa chỉ lấy hàng */}
        <Form.Item label="Địa chỉ lấy hàng" name="address">
          <Button type="dashed" onClick={showAddressModal}>
            + Thêm
          </Button>
        </Form.Item>

        {/* Email (disabled) */}
        <Form.Item label="Email" name="email">
          <Input disabled value="hieu02617@gmail.com" />
        </Form.Item>

        {/* Số điện thoại */}
        <Form.Item
          label="Số điện thoại"
          name="phone"
          rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
        >
          <Input addonBefore="+84" placeholder="Nhập vào" />
        </Form.Item>

        {/* Nhập mã xác minh */}
        <Form.Item label="Mã xác minh" name="verificationCode">
          <Input placeholder="Nhập vào" />
        </Form.Item>

        {/* Submit */}
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{backgroundColor: "#333", color: "#fff"}}>
            Gửi
          </Button>
        </Form.Item>
      </Form>

      {/* Modal thêm địa chỉ */}
      <Modal
        title="Thêm địa chỉ"
        open={modalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Hủy
          </Button>,
          <Button key="submit" type="primary" onClick={handleCancel}>
            Lưu
          </Button>,
        ]}
      >
        <Form layout="vertical">
          {/* Họ & Tên */}
          <Form.Item label="Họ & Tên" name="fullName" rules={[{ required: true, message: "Vui lòng nhập họ & tên" }]}>
            <Input placeholder="Nhập họ & tên" />
          </Form.Item>

          {/* Số điện thoại */}
          <Form.Item
            label="Số điện thoại"
            name="modalPhone"
            rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
          >
            <Input placeholder="Nhập số điện thoại" />
          </Form.Item>

          {/* Tỉnh/Thành phố */}
          <Form.Item label="Tỉnh/Thành phố" name="province">
            <Select placeholder="Chọn Tỉnh/Thành phố" onChange={handleProvinceChange}>
              {provinces.map((province) => (
                <Option key={province.id} value={province.id}>
                  {province.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* Quận/Huyện */}
          <Form.Item label="Quận/Huyện" name="district">
            <Select
              placeholder="Chọn Quận/Huyện"
              onChange={handleDistrictChange}
              disabled={!selectedProvince}
            >
              {selectedProvince &&
                provinces
                  .find((p) => p.id === selectedProvince)
                  ?.districts.map((district) => (
                    <Option key={district.id} value={district.id}>
                      {district.name}
                    </Option>
                  ))}
            </Select>
          </Form.Item>

          {/* Phường/Xã */}
          <Form.Item label="Phường/Xã" name="ward">
            <Select placeholder="Chọn Phường/Xã" disabled={!selectedDistrict}>
              {selectedDistrict &&
                provinces
                  .find((p) => p.id === selectedProvince)
                  ?.districts.find((d) => d.id === selectedDistrict)
                  ?.wards.map((ward) => (
                    <Option key={ward.id} value={ward.id}>
                      {ward.name}
                    </Option>
                  ))}
            </Select>
          </Form.Item>

          {/* Địa chỉ chi tiết */}
          <Form.Item label="Địa chỉ chi tiết" name="detailAddress">
            <Input placeholder="Nhập địa chỉ cụ thể (số nhà, đường...)" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default FormOfVendorRegister