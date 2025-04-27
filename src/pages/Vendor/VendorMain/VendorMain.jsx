import { Col } from 'antd'
// import {
//   AppstoreOutlined,
//   ShoppingCartOutlined,
//   OrderedListOutlined,
//   DollarCircleOutlined,
//   MessageOutlined,
// } from '@ant-design/icons';
import { WrapperItemNumber, WrapperItemText, WrapperVendor, WrapperVendorBackgroundItem, WrapperVendorMain, WrapperVendorMainItem, WrapperVendorTextMain } from './styleVendorMain';
// import MenuVendorComponent from '../../../components/VendorComponents/MenuVendorComponent/MenuVendorComponent';

const VendorMain = () => {  
  return (
    <div>
      <WrapperVendor>
        <Col span={24}>
          
          <WrapperVendorMain>
            <WrapperVendorTextMain>Danh sách cần làm</WrapperVendorTextMain>
            <WrapperVendorMainItem>
              <WrapperVendorBackgroundItem>
                <WrapperItemNumber>0</WrapperItemNumber>
                <WrapperItemText>Chờ lấy hàng</WrapperItemText>
              </WrapperVendorBackgroundItem>

              <WrapperVendorBackgroundItem>
                <WrapperItemNumber>0</WrapperItemNumber>
                <WrapperItemText>Đã xử lý</WrapperItemText>
              </WrapperVendorBackgroundItem>

              <WrapperVendorBackgroundItem>
                <WrapperItemNumber>0</WrapperItemNumber>
                <WrapperItemText>Đơn trả hàng/Hoàn tiền/Hủy</WrapperItemText>
              </WrapperVendorBackgroundItem>

              <WrapperVendorBackgroundItem>
                <WrapperItemNumber>0</WrapperItemNumber>
                <WrapperItemText>Sản phẩm bị tạm khóa</WrapperItemText>
              </WrapperVendorBackgroundItem>
            </WrapperVendorMainItem>
          </WrapperVendorMain>

        </Col>
      </WrapperVendor>
    </div>
  )
}

export default VendorMain