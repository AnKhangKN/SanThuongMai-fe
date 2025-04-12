import React from 'react'
import { WrapperVendor } from '../VendorMain/styleVendorMain'
// import MenuVendorComponent from '../../../components/VendorComponents/MenuVendorComponent/MenuVendorComponent'
import { Col } from 'antd'

const AddProduct = () => {
  return (
    <div>
      <WrapperVendor>
              <Col span={5} style={{border: '1px solid red'}}>
                Chú thích
              </Col>
              <Col span={19} style={{border: '1px solid blue'}}>
                Add product
              </Col>
            </WrapperVendor>
    </div>
  )
}

export default AddProduct