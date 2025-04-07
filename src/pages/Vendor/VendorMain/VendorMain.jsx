import { Col, Menu, Row } from 'antd'
import React from 'react'
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import MenuProps from 'antd';

const VendorMain = () => {
  const onClick = e => {
    console.log('click ', e);
  };

  const items = [
    {
      key: 'sub1',
      label: 'Navigation One',
      icon: <MailOutlined />,
      children: [
        {
          key: 'g1',
          label: 'Item 1',
          type: 'group',
          children: [
            { key: '1', label: 'Option 1' },
            { key: '2', label: 'Option 2' },
          ],
        },
        {
          key: 'g2',
          label: 'Item 2',
          type: 'group',
          children: [
            { key: '3', label: 'Option 3' },
            { key: '4', label: 'Option 4' },
          ],
        },
      ],
    },
    {
      key: 'sub2',
      label: 'Navigation Two',
      icon: <AppstoreOutlined />,
      children: [
        { key: '5', label: 'Option 5' },
        { key: '6', label: 'Option 6' },
        {
          key: 'sub3',
          label: 'Submenu',
          children: [
            { key: '7', label: 'Option 7' },
            { key: '8', label: 'Option 8' },
          ],
        },
      ],
    },
    {
      type: 'divider',
    },
    {
      key: 'sub4',
      label: 'Navigation Three',
      icon: <SettingOutlined />,
      children: [
        { key: '9', label: 'Option 9' },
        { key: '10', label: 'Option 10' },
        { key: '11', label: 'Option 11' },
        { key: '12', label: 'Option 12' },
      ],
    },
    {
      key: 'grp',
      label: 'Group',
      type: 'group',
      children: [
        { key: '13', label: 'Option 13' },
        { key: '14', label: 'Option 14' },
      ],
    },
  ];
  
  return (
    <div>
      <Row>
        <Col span={5} style={{border: '1px solid red'}}>
        <Menu
          onClick={onClick} // Xử lý khi click vào item
          style={{ width: 256 }} // Chiều rộng menu
          defaultSelectedKeys={['1']} // Item được chọn mặc định
          defaultOpenKeys={['sub1']} // Mục đang mở mặc định
          mode="inline" // Dạng menu: 'inline' | 'vertical' | 'horizontal'
          items={items} // Dữ liệu menu
        />
        </Col>
        <Col span={19} style={{border: '1px solid blue'}}>VendorMain</Col>
      </Row>
    </div>
  )
}

export default VendorMain