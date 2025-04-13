import styled from "styled-components";

export const Wrapper = styled.div`
  background-color: #f9fafd;
  padding: 25px 35px;
`;

export const BoxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  border-radius: 5px;
  padding: 20px;
  background-color: #fff;
  background-color: #fff;
  box-shadow: 1px 1px 10px #e9e9e9;
`;

export const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #727cf5;
  background-color: rgb(114 124 245 / 25%);
  height: 40px;
  width: 40px;
  border-radius: 4px;
  font-size: 20px;
`;

export const BoxName = styled.p`
  color: rgb(151, 151, 151);
`;

export const BoxQuantity = styled.p`
  color: #333;
  font-size: 20px;
  font-weight: 500;
`;
