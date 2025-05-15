import { Card, Form, Input, Button, Select, message } from "antd";

const { Option } = Select;

const AddPaymentGateway = () => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    message.success("Đã thêm cổng thanh toán thành công!");
    form.resetFields();
  };
  return (
    <Card title="Thêm cổng thanh toán mới" style={{ marginTop: 24 }}>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="type"
          label="Loại cổng thanh toán"
          rules={[{ required: true, message: "Vui lòng chọn loại cổng!" }]}
        >
          <Select placeholder="Chọn cổng thanh toán">
            <Option value="momo">Momo</Option>
            <Option value="zalopay">ZaloPay</Option>
            <Option value="bank">Chuyển khoản ngân hàng</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="accountName"
          label="Tên tài khoản / Tên chủ"
          rules={[{ required: true, message: "Vui lòng nhập tên tài khoản!" }]}
        >
          <Input placeholder="Nhập tên tài khoản hoặc tên chủ" />
        </Form.Item>

        <Form.Item
          name="accountNumber"
          label="Số tài khoản / Mã ví"
          rules={[{ required: true, message: "Vui lòng nhập số tài khoản!" }]}
        >
          <Input placeholder="Ví dụ: 123456789 hoặc mã ví" />
        </Form.Item>

        <Form.Item name="description" label="Mô tả (tuỳ chọn)">
          <Input.TextArea placeholder="Thông tin thêm nếu cần" rows={3} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Lưu
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={() => form.resetFields()}>
            Hủy
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AddPaymentGateway;
