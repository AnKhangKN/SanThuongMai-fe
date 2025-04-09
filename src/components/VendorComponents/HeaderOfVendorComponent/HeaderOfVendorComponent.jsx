import { Avatar, Col } from 'antd'
import React from 'react'
import logo from '../../../assets/images/Logo_Trang.jpg'
import avatar from '../../../assets/imagesVendor/avatar.jpg'
import {
  DownOutlined
} from '@ant-design/icons';
import { WrapperHeader, WrapperHeaderImageLogo, WrapperHeaderTextAvatar, WrapperHeaderTextLogo } from './styleHeaderOfVendor';



const HeaderOfVendorComponent = (props) => {
  const {
    textHeader
  } = props
  return (
    <WrapperHeader>
      <Col span={12} style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
        <WrapperHeaderImageLogo src={logo} alt='LogoHKN' preview={false} style={{width: '50px', height: '30px'}}></WrapperHeaderImageLogo>
        <WrapperHeaderTextLogo>{textHeader}</WrapperHeaderTextLogo>
      </Col>

      <Col span={12} style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
        <Avatar src={avatar} size="default" gap={"10px"}></Avatar>
        {/* <WrapperHeaderImageAvatar src={avatar} alt='avatar' preview={false}></WrapperHeaderImageAvatar> */}
        <WrapperHeaderTextAvatar>phmvnhiu704</WrapperHeaderTextAvatar>
        <DownOutlined style={{width: '16px', height: '16px', marginLeft: '10px'}} />
      </Col>
    </WrapperHeader>
  )
}

export default HeaderOfVendorComponent