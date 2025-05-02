import React, { useEffect } from 'react';
import { Modal, Form, Input, InputNumber } from 'antd';

const { TextArea } = Input;

const EditProductModal = ({ visible, onCancel, onOk, product }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (product) {
      form.setFieldsValue({
        product_name: product.product_name,
        description: product.description,
        category: product.category,
        price: product.details?.[0]?.price || 0,
        quantity: product.details?.[0]?.quantity || 0,
        color: product.details?.[0]?.color || '',
        size: product.details?.[0]?.size || '',
      });
    }
  }, [product, form]);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        onOk({ ...product, ...values });
      })
      .catch((info) => {
        console.log('Validation Failed:', info);
      });
  };

  return (
    <Modal
      visible={visible}
      title="Sửa thông tin sản phẩm"
      onCancel={onCancel}
      onOk={handleOk}
      okText="Lưu"
      cancelText="Hủy"
    >
      <Form layout="vertical" form={form}>
        <Form.Item name="product_name" label="Tên sản phẩm" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="description" label="Mô tả">
          <TextArea rows={3} />
        </Form.Item>

        <Form.Item name="category" label="Danh mục" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="price" label="Giá bán" rules={[{ required: true, type: 'number', min: 0 }]}>
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item name="quantity" label="Số lượng" rules={[{ required: true, type: 'number', min: 0 }]}>
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item name="color" label="Màu sắc">
          <Input />
        </Form.Item>

        <Form.Item name="size" label="Kích thước">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditProductModal;
