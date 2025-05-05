import styled from "styled-components";

export const ContainerPrice = styled.div`
  position: relative;
`;

export const WrapperPrice = styled.div`
  width: 200px;
  background-color: #fff;
  padding: 5px 15px;
  position: relative;
  cursor: pointer;
  border-radius: 2px;

  &::after {
    content: "";
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%) rotate(45deg);
    width: 7px;
    height: 7px;
    border-right: 2px solid #333;
    border-bottom: 2px solid #333;
    pointer-events: none;
  }
`;

export const ChoosePrice = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #fff;
  padding: 10px 15px;
  width: 200px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  border-radius: 2px;
  margin-top: 5px;
  visibility: hidden;
  opacity: 0;
  transition: all 0.3s ease;

  ${ContainerPrice}:hover & {
    visibility: visible;
    opacity: 1;
  }
`;
