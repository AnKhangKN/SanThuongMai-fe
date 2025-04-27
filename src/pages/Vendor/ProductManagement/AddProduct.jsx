import React from 'react'
import { WrapperVendor } from '../VendorMain/styleVendorMain'
// import MenuVendorComponent from '../../../components/VendorComponents/MenuVendorComponent/MenuVendorComponent'
import { Card, Col, Form, List, Typography, Input, Button, Upload, Space, Select } from 'antd'
import {
  CheckCircleFilled,
  UploadOutlined 
} from '@ant-design/icons';

const { Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

// Mỗi mục sẽ có text + trạng thái đã hoàn thành hay chưa
const checklist = [
  { text: 'Thêm ít nhất 3 hình ảnh', done: false },
  { text: 'Tên sản phẩm có ít nhất 25~100 kí tự', done: false },
  { text: 'Thêm ít nhất 100 kí tự hoặc 1 hình ảnh trong mô tả sản phẩm', done: false },
  { text: 'Thêm thương hiệu', done: false },
];


const AddProduct = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Dữ liệu đã nhập:', values);
    };

  return (
    <div>
      <WrapperVendor>
              <Card
                title="Gợi ý điền Thông tin"
                headStyle={{ backgroundColor: '#e6f4ff' }} // màu nền tiêu đề
                style={{ width: '100%', borderTop: '5px solid blue' }}
              >
                <List
                  dataSource={checklist}
                  renderItem={(item) => (
                    <List.Item>
                      <CheckCircleFilled style={{ color: item.done ? '#52c41a' : '#d9d9d9', marginRight: 8 }} />
                      <Text type={item.done ? 'default' : 'secondary'}>{item.text}</Text>
                    </List.Item>
                  )}
              />
              </Card>
              <Col span={24}>
              <div style={{padding: '24px'}}>
                <div>
                  <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    style={{ maxWidth: 800, margin: '0 auto' }}
                  >
                    {/* THÔNG TIN CƠ BẢN */}
                    <h2>Thông tin cơ bản</h2>

                    <Form.Item
                      name="coverImage"
                      label="Ảnh bìa"
                      valuePropName="fileList"
                      getValueFromEvent={(e) => Array.isArray(e) ? e : e?.fileList}
                      rules={[{ required: true, message: 'Vui lòng chọn ảnh bìa!' }]}
                    >
                      <Upload beforeUpload={() => false} maxCount={1} listType="picture">
                        <Button icon={<UploadOutlined />}>Chọn ảnh bìa</Button>
                      </Upload>
                    </Form.Item>

                    <Form.Item
                      name="images"
                      label="Hình ảnh sản phẩm"
                      valuePropName="fileList"
                      getValueFromEvent={(e) => Array.isArray(e) ? e : e?.fileList}
                      rules={[{ required: true, message: 'Vui lòng chọn hình ảnh sản phẩm!' }]}
                    >
                      <Upload beforeUpload={() => false} multiple listType="picture">
                        <Button icon={<UploadOutlined />}>Tải lên hình ảnh</Button>
                      </Upload>
                    </Form.Item>

                    <Form.Item
                      name="productName"
                      label="Tên sản phẩm"
                      rules={[
                        { required: true, message: 'Vui lòng nhập tên sản phẩm!' },
                        { min: 25, message: 'Tên sản phẩm phải có ít nhất 25 kí tự' },
                      ]}
                    >
                      <Input placeholder="Nhập tên sản phẩm" />
                    </Form.Item>

                    <Form.Item
                      name="description"
                      label="Mô tả sản phẩm"
                      rules={[{ required: true, message: 'Vui lòng nhập mô tả sản phẩm!' }]}
                    >
                      <TextArea rows={5} placeholder="Nhập mô tả sản phẩm" />
                    </Form.Item>

                    {/* THÔNG TIN CHI TIẾT */}
                    <h2>Thông tin chi tiết</h2>

                    <Form.Item
                      name="brand"
                      label="Thương hiệu"
                      rules={[{ required: true, message: 'Vui lòng chọn thương hiệu!' }]}
                    >
                      <Select placeholder="Chọn thương hiệu">
                        <Option value="Nike">Nike</Option>
                        <Option value="Adidas">Adidas</Option>
                        <Option value="Puma">Puma</Option>
                      </Select>
                    </Form.Item>

                    <Form.Item
                      name="origin"
                      label="Xuất xứ"
                      rules={[{ required: true, message: 'Vui lòng chọn xuất xứ!' }]}
                    >
                      <Select placeholder="Chọn xuất xứ">
                        <Option value="Việt Nam">Việt Nam</Option>
                        <Option value="Trung Quốc">Trung Quốc</Option>
                        <Option value="Mỹ">Mỹ</Option>
                      </Select>
                    </Form.Item>

                    <Form.Item
                      name="warranty"
                      label="Bảo hành"
                      rules={[{ required: true, message: 'Vui lòng chọn thời gian bảo hành!' }]}
                    >
                      <Select placeholder="Chọn thời gian bảo hành">
                        <Option value="6 tháng">6 tháng</Option>
                        <Option value="12 tháng">12 tháng</Option>
                        <Option value="24 tháng">24 tháng</Option>
                      </Select>
                    </Form.Item>

                    <Form.Item
                      name="material"
                      label="Chất liệu"
                      rules={[{ required: true, message: 'Vui lòng chọn chất liệu!' }]}
                    >
                      <Select placeholder="Chọn chất liệu">
                        <Option value="Vải">Vải</Option>
                        <Option value="Da">Da</Option>
                        <Option value="Nhựa">Nhựa</Option>
                      </Select>
                    </Form.Item>

                    <Form.Item
                      name="color"
                      label="Màu sắc"
                      rules={[{ required: true, message: 'Vui lòng nhập màu sắc!' }]}
                    >
                      <Input placeholder="Nhập màu sắc" />
                    </Form.Item>

                    {/* GIÁ SẢN PHẨM */}
                    <h2>Giá sản phẩm</h2>

                    <Form.Item
                      name="costPrice"
                      label="Giá nhập"
                      rules={[{ required: true, message: 'Vui lòng nhập giá nhập!' }]}
                    >
                      <Input type="number" placeholder="Nhập giá nhập" />
                    </Form.Item>

                    <Form.Item
                      name="salePrice"
                      label="Giá bán"
                      rules={[{ required: true, message: 'Vui lòng nhập giá bán!' }]}
                    >
                      <Input type="number" placeholder="Nhập giá bán" />
                    </Form.Item>

                    <Form.Item>
                      <Space>
                        <Button type="primary" htmlType="submit" style={{ backgroundColor: "#333", color: "#fff" }}>
                          Lưu sản phẩm
                        </Button>
                        <Button htmlType="button" onClick={() => form.resetFields()}>
                          Xóa hết
                        </Button>
                      </Space>
                    </Form.Item>
                  </Form>
                  </div>
                </div>
              </Col>
      </WrapperVendor>
    </div>
  )
}

export default AddProduct