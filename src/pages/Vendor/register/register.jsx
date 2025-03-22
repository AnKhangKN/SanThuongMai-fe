import React from 'react'
import { Button, Image } from 'antd'
import InformationSignUp from '../../../assets/imagesVendor/InformationSignUp.png'
import { WrapperRegister, WrapperRegisterTextDescribe, WrapperRegisterTextWelcome } from './styleRegister'

const register = () => {
  return (
    <WrapperRegister>
      <div>
        <Image src={InformationSignUp} alt='Information SignUp image' style={{height: '200px', width: '200px'}}></Image>
      </div>
      <WrapperRegisterTextWelcome>Chào mừng đến với HKN!</WrapperRegisterTextWelcome>
      <WrapperRegisterTextDescribe>Vui lòng cung cấp thông tin để thành lập tài khoản người bán trên Shopee</WrapperRegisterTextDescribe>
      <Button type="primary" style={{backgroundColor: '#f6f6f6', color: "#000"}}>Bắt đầu đăng ký</Button>
    </WrapperRegister>
  )
}

export default register