import React from 'react'
import { Form, Select } from 'antd';

const { Option } = Select;

const ComboboxComponent = ({
  name,
  label,
  placeholder,
  options = [],
  required = false,
  onChange,
}) => {
  return (
    <Form.Item
      name={name}
      label={label}
      rules={
        required
          ? [{ required: true, message: `Vui lòng chọn ${label.toLowerCase()}!` }]
          : []
      }
    >
      <Select placeholder={placeholder} onChange={onChange}>
        {options.map((option) => (
          <Option key={option.value} value={option.value}>
            {option.label}
          </Option>
        ))}
      </Select>
    </Form.Item>
  )
}

export default ComboboxComponent
