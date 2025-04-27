import styled from "styled-components";

export const ImageCart = styled.div`
  width: 100%;
  position: relative;

  &::before {
    content: "Top";
    position: absolute;
    top: 0px;
    width: 40px;
    height: 40px;
    background-color: red;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &::after {
    content: "Đã bán 30k";
    position: absolute;
    color: #fff;
    bottom: 0px;
    left: 0px;
    right: 0px;
    background-color: rgba(0, 0, 0, 0.5);
  }
`;
