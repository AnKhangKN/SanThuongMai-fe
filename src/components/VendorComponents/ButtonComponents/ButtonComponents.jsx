import { Button } from 'antd'
import React from 'react'
import { LoadingOutlined } from '@ant-design/icons';

const ButtonComponents = ({size, onClick,icon = <LoadingOutlined />, styleButton, styleTextButton, textButton,  ...rests}) => {
  return (
    <Button
        onClick={onClick}
        size={size}
        icon={icon}
        style={styleButton}
        {...rests}
    > <span style={styleTextButton}>{textButton}</span>
    </Button>
  )
}

export default ButtonComponents