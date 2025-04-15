import React from 'react'
import { WrapperVendor } from '../VendorMain/styleVendorMain'
import MenuVendorComponent from '../../../components/VendorComponents/MenuVendorComponent/MenuVendorComponent'

const EditProduct = () => {
  return (
    <div>
      <WrapperVendor>
              <Col span={5} style={{border: '1px solid red'}}>
                <MenuVendorComponent />
              </Col>
              <Col span={19} style={{border: '1px solid blue'}}>
                EditProduct
              </Col>
            </WrapperVendor>
    </div>
  )
}

export default EditProduct