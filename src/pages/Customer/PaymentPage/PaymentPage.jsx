import React from "react";
import { Container, Wrapper } from "./style";
import ButtonComponent from "../../../components/CustomerComponents/ButtonComponent/ButtonComponent";

const PaymentPage = () => {
  return (
    <Wrapper>
      <Container>
        <div>
          Thông tin giao hàng
          {/* module */}
          <div></div>
        </div>
        <div>Sản phẩm</div>
        <div>
          <div>Phương thức thanh toán</div>
          <div>
            <div>Tổng tiền hàng: </div>
            <div>
              <div>Các phí khác: </div>
              <div></div>
            </div>
            <div>Tổng thanh toán: </div>
          </div>
          <div>
            <div>
              Khi nhấn 'Đặt hàng', bạn xác nhận rằng bạn đồng ý với Điều khoản
              Shopee của Shopee.
            </div>
            <ButtonComponent name="Đặt hàng" />
          </div>
        </div>
      </Container>
    </Wrapper>
  );
};

export default PaymentPage;
