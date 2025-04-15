import React from 'react'
import { Table, Button, Space } from 'antd';

const TableProductComponent = ({ dataSource, onEdit, onDelete }) => {
  const columns = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Giá nhập',
      dataIndex: 'importPrice',
      key: 'importPrice',
      render: (text) => `${text.toLocaleString()}₫`,
    },
    {
      title: 'Giá bán',
      dataIndex: 'sellPrice',
      key: 'sellPrice',
      render: (text) => `${text.toLocaleString()}₫`,
    },
    {
      title: 'Thương hiệu',
      dataIndex: 'brand',
      key: 'brand',
    },
    {
      title: 'Xuất xứ',
      dataIndex: 'origin',
      key: 'origin',
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => onEdit(record)}>Sửa</Button>
          <Button type="link" danger onClick={() => onDelete(record)}>Xóa</Button>
        </Space>
      ),
    },
  ];
  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      rowKey="id" // key của mỗi dòng (quan trọng để React hiệu quả)
    />
  )
}

export default TableProductComponent