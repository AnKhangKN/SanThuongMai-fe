import styled from "styled-components";

export const Wrapper = styled.div`
  line-height: 34px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
`;

export const ConnectText = styled.div`
  position: relative;
  padding: 0 8px 0px 20px;

  &::before {
    content: "";
    position: absolute;
    top: 9px;
    left: 0;
    border-right: 0.5px solid #ccc;
    height: 15px;
    padding-left: 10px;
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  margin-right: 5px;
  cursor: pointer;
`;
