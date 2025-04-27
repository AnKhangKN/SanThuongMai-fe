import React, { useState } from "react";
import { Form, Input, Select, Radio, Checkbox, Button } from "antd";

const { Option } = Select;
const { TextArea } = Input;

const provinces = [
  { id: "1", name: "Sóc Trăng", districts: [{ id: "11", name: "Huyện Kế Sách", wards: ["Xã Phong Nẫm"] }] },
];

const FormTaxOfVendorRegister = () => {
  const [form] = Form.useForm();
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  return (
    <Form form={form} layout="vertical" style={{ maxWidth: 600, margin: "auto" }}>
      {/* Loại hình kinh doanh */}
      <Form.Item label="Loại hình kinh doanh" name="businessType" rules={[{ required: true }]}>
        <Radio.Group>
          <Radio value="personal">Cá nhân</Radio>
          <Radio value="household">Hộ kinh doanh</Radio>
          <Radio value="company">Công ty</Radio>
        </Radio.Group>
      </Form.Item>

      {/* Địa chỉ đăng ký kinh doanh */}
      <Form.Item label="Địa chỉ đăng ký kinh doanh" name="businessAddress" rules={[{ required: true }]}>
        <Checkbox>Thêm "Việt Nam" vào thông tin địa chỉ.</Checkbox>
        <Select placeholder="Chọn tỉnh/thành phố" onChange={(value) => setSelectedProvince(value)}>
          {provinces.map((p) => (
            <Option key={p.id} value={p.id}>
              {p.name}
            </Option>
          ))}
        </Select>
        <Select
          placeholder="Chọn quận/huyện"
          onChange={(value) => setSelectedDistrict(value)}
          disabled={!selectedProvince}
        >
          {selectedProvince &&
            provinces
              .find((p) => p.id === selectedProvince)
              ?.districts.map((d) => (
                <Option key={d.id} value={d.id}>
                  {d.name}
                </Option>
              ))}
        </Select>
        <Select placeholder="Chọn phường/xã" disabled={!selectedDistrict}>
          {selectedDistrict &&
            provinces
              .find((p) => p.id === selectedProvince)
              ?.districts.find((d) => d.id === selectedDistrict)
              ?.wards.map((w, index) => (
                <Option key={index} value={w}>
                  {w}
                </Option>
              ))}
        </Select>
        <TextArea placeholder="Nhập địa chỉ cụ thể" rows={2} />
      </Form.Item>

      {/* Email nhận hóa đơn */}
      <Form.Item label="Email nhận hóa đơn điện tử" name="email">
        <Input disabled value="hieu02617@gmail.com" />
        <Button type="dashed" style={{ marginTop: 8 }}>
          + Thêm Email (1/5)
        </Button>
      </Form.Item>

      {/* Mã số thuế */}
      <Form.Item label="Mã số thuế" name="taxCode">
        <Input placeholder="Nhập vào" maxLength={14} />
      </Form.Item>

      {/* Submit
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Đăng ký
        </Button>
      </Form.Item> */}
    </Form>
  );
};

export default FormTaxOfVendorRegister