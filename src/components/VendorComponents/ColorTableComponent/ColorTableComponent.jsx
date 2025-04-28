import React from 'react';
import { Button, Input, Space, Table, Form, Popconfirm } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { SketchPicker } from 'react-color';

const ColorTableComponent = ({ name }) => {
  return (
    <Form.List name={name}>
      {(fields, { add, remove }) => (
        <>
          <Table
            dataSource={fields}
            pagination={false}
            rowKey="key"
            columns={[
              {
                title: 'Tên màu',
                render: (_, field) => (
                  <Form.Item
                    {...field}
                    name={[field.name, 'name']}
                    fieldKey={[field.fieldKey, 'name']}
                    rules={[{ required: true, message: 'Nhập tên màu' }]}
                    noStyle
                  >
                    <Input placeholder="Nhập tên màu" />
                  </Form.Item>
                ),
              },
              {
                title: 'Mã màu',
                render: (_, field) => (
                  <Form.Item
                    {...field}
                    name={[field.name, 'code']}
                    fieldKey={[field.fieldKey, 'code']}
                    rules={[{ required: true, message: 'Chọn mã màu' }]}
                    noStyle
                  >
                    <SketchColorPicker />
                  </Form.Item>
                ),
              },
              {
                title: 'Số lượng tồn',
                render: (_, field) => (
                  <Form.Item
                    {...field}
                    name={[field.name, 'stock']}
                    fieldKey={[field.fieldKey, 'stock']}
                    rules={[{ required: true, message: 'Nhập số lượng tồn' }]}
                    noStyle
                  >
                    <Input type="number" placeholder="Nhập tồn kho" min={0} />
                  </Form.Item>
                ),
              },
              {
                title: 'Thao tác',
                render: (_, field) => (
                  <Popconfirm title="Xoá màu này?" onConfirm={() => remove(field.name)}>
                    <Button danger>Xóa</Button>
                  </Popconfirm>
                ),
              },
            ]}
          />

          <Button
            onClick={() => add({ name: '', code: '#000000', stock: 0 })}
            type="dashed"
            icon={<PlusOutlined />}
            style={{ width: '100%', marginTop: 16 }}
          >
            Thêm màu
          </Button>
        </>
      )}
    </Form.List>
  );
};

export default ColorTableComponent;

// Component riêng để chọn màu
const SketchColorPicker = ({ value = '#000000', onChange }) => {
  return (
    <SketchPicker
      color={value}
      onChangeComplete={(color) => {
        if (onChange) {
          onChange(color.hex);
        }
      }}
    />
  );
};
