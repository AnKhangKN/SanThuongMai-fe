import styled from "styled-components";

export const IconWrapper = styled.div`
  font-size: 30px;
  cursor: pointer;
  line-height: 85px;
  margin: 0px 40px 0px 70px;
  position: relative;
`;

export const SumCart = styled.div`
  position: absolute;
  top: 16px;
  border-radius: 50%;
  line-height: 22px;
  color: #f6402e;
  font-size: 12px;
  background: #fff;
  height: 22px;
  right: -10px;
  width: 22px;
  text-align: center;
`;

// cart
export const CartWrapper = styled.div`
  cursor: pointer;
  position: relative;
`;

export const CartModal = styled.div`
  position: absolute;
  width: 400px;
  right: 0px;
  color: #333;
  padding: 20px;
  visibility: hidden; /* Sử dụng visibility thay vì display: none */
  opacity: 0;
  z-index: 10;
  top: 70px;
  border-radius: 2px;
  background-color: #fff;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.26);
  transition: opacity 0.3s ease, visibility 0.3s ease; /* Thêm transition cho opacity và visibility */

  ${CartWrapper}:hover & {
    visibility: visible; /* Hiển thị modal khi hover */
    opacity: 1;
  }

  &::before {
    position: absolute;
    content: "";
    top: -7px;
    right: 44px;
    width: 15px;
    height: 15px;
    background-color: #fff;
    transform: rotate(45deg);
  }
`;
