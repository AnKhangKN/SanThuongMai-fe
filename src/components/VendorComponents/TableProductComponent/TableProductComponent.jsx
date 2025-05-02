import React from 'react';
import { Table, Button, Popconfirm, Image, Tag } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const TableProductComponent = ({ dataSource, onEdit, onDelete }) => {
  const columns = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'product_name',
      key: 'product_name',
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'images',
      key: 'images',
      render: (images) => (
        images && images.length > 0 ? (
          <Image src={images[0]} alt="ảnh sản phẩm" width={60} height={60} />
        ) : (
          <span>Không có ảnh</span>
        )
      )
    },
    {
      title: 'Giá bán',
      dataIndex: 'details',
      key: 'sellPrice',
      render: (details) => (
        details?.[0]?.price
          ? `${details[0].price.toLocaleString()} VND`
          : 'Không có'
      )
    },
    {
      title: 'Số lượng',
      dataIndex: 'details',
      key: 'quantity',
      render: (details) => (
        details?.[0]?.quantity ?? 'Không có'
      )
    },
    {
      title: 'Danh mục',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = 'default';
        if (status === 'active') color = 'green';
        else if (status === 'inactive') color = 'gray';
        else if (status === 'pending') color = 'orange';
        else if (status === 'banned') color = 'red';

        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      }
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => onEdit(record)}
            style={{ marginRight: 8 }}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa sản phẩm này?"
            onConfirm={() => onDelete(record)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button type="primary" danger icon={<DeleteOutlined />}>
              Xóa
            </Button>
          </Popconfirm>
        </>
      )
    }
  ];

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      rowKey="_id" // đảm bảo mỗi dòng có key duy nhất
      pagination={{ pageSize: 5 }}
    />
  );
};

export default TableProductComponent;
