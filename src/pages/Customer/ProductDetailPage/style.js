import styled from "styled-components";

export const LocationText = styled.div`
  margin-right: 25px;
  position: relative;
  &::after {
    top: 25px;
    right: -16px;
    position: absolute;
    content: "";
    height: 9px;
    width: 9px;
    border-top: 0.5px solid #333;
    border-right: 0.5px solid #333;
    transform: rotate(45deg);
  }
`;

export const DetailBox = styled.div`
  margin-top: 20px;
  background-color: #fff;
  border-radius: 4px;
  padding: 20px;
`;
