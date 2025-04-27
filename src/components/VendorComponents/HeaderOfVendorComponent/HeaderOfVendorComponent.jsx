import { Avatar, Col, Image } from 'antd'
import React, { useState, useRef, useEffect } from 'react'
import logo from '../../../assets/images/Logo_Trang.jpg'
import {
  DownOutlined,
  ShopOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { AvatarWrapper, DropdownMenu, WrapperAvatarList, WrapperHeader, WrapperHeaderImageAvatar, WrapperHeaderImageLogo, WrapperHeaderTextAvatar, WrapperHeaderTextLogo } from './styleHeaderOfVendor';
import { useNavigate } from 'react-router-dom';



const HeaderOfVendorComponent = (props) => {
  const navigate = useNavigate();

  const handleClickToProfileShop = () => {
    navigate('/vendor/profile-shop'); // Đường dẫn bạn muốn chuyển đến
  };

  const handleClickToMainVendor = () => {
    navigate('/vendor');
  };

  const handleClickToLogin = () => {
    navigate('/vendor/login');
  }
  const { textHeader } = props;
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setOpen(prev => !prev);
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <WrapperHeader>
      <Col span={12} style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
        <WrapperHeaderImageLogo onClick={handleClickToMainVendor} src={logo} alt='LogoHKN' preview={false} style={{width: '50px', height: '30px'}}></WrapperHeaderImageLogo>
        <WrapperHeaderTextLogo>{textHeader}</WrapperHeaderTextLogo>
      </Col>

      <Col span={12} style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
        <AvatarWrapper ref={dropdownRef}>
          <WrapperHeaderImageAvatar onClick={toggleDropdown}>
            <Avatar src={logo} size="default" gap={"10px"}></Avatar>
            {/* <WrapperHeaderImageAvatar src={avatar} alt='avatar' preview={false}></WrapperHeaderImageAvatar> */}
            <WrapperHeaderTextAvatar>hknsports</WrapperHeaderTextAvatar>
            <DownOutlined style={{width: '16px', height: '16px', marginLeft: '10px'}} />
          </WrapperHeaderImageAvatar>

          {open && (
          <DropdownMenu>
            <WrapperAvatarList>
              <Image src={logo} preview={false} style={{width: '56px', height: '56px', margin: '0 0 10px'}}/>
              <span style={{fontSize: '16px', fontWeight: '500', padding: '0 16px', wordBreak: 'break-word'}}>hknsports</span>
            </WrapperAvatarList>
            <div className="menu-item" onClick={handleClickToProfileShop}><ShopOutlined style={{fontSize: '16px', marginRight: '10px'}} /> Hồ sơ Shop</div>
            <div className="menu-item" onClick={handleClickToLogin}><LogoutOutlined style={{fontSize: '16px', marginRight: '10px'}} /> Đăng xuất</div>
          </DropdownMenu>
        )}
      </AvatarWrapper>
      </Col>
    </WrapperHeader>
  )
}

export default HeaderOfVendorComponent