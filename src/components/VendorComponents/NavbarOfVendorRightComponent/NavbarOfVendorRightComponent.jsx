import React from 'react'
import {
  BellFilled,
  SmileFilled,
  WechatFilled
} from '@ant-design/icons';
import { WrapperNavbar, WrapperNavbarIcon } from './styleOfNavbarVendor';

const NavbarOfVendorComponent = () => {
  return (
    <WrapperNavbar>
      <WrapperNavbarIcon>
        <BellFilled />
      </WrapperNavbarIcon>
      <WrapperNavbarIcon>
      <SmileFilled />
      </WrapperNavbarIcon>
      <WrapperNavbarIcon>
        <WechatFilled />
      </WrapperNavbarIcon>
    </WrapperNavbar>
  )
}

export default NavbarOfVendorComponent