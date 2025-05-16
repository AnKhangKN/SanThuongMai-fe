import { Form, Input } from 'antd'
import React from 'react'

const InputComponent = ({ name, label, placeholder, required = false, icon, onChange }) => {
  return (
    <Form.Item
      name={name}
      label={label}
      onChange={onChange}
      rules={
        required
          ? [{ required: true, message: `Vui lòng nhập ${label.toLowerCase()}!` }]
          : []
      }
    >
      <Input placeholder={placeholder} prefix={icon} />
    </Form.Item>
  )
}

export default InputComponent