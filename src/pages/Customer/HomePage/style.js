import styled from "styled-components";

export const LineSuggest = styled.div`
  position: sticky;
  top: 120px;
  z-index: 10;
  line-height: 60px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0px 10px 0px;
  color: #ee4d2d;
  text-transform: uppercase;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 5px;
    background-color: #ee4d2d;
  }
`;
