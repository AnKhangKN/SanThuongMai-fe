import styled from "styled-components";

export const Wrapper = styled.div`
  font-size: 16px;
  padding: 0px 40px 0px 26px;
`;

export const IconContainer = styled.div`
  font-size: 20px;
  display: flex;
  align-items: center;
`;

export const OptionContainer = styled.div`
  padding: 20px 0px;
  cursor: pointer;
  transition: all 0.2s ease-out;
`;

export const OptionSelect = styled.div`
  display: flex;
  align-items: center;
  padding: 0px 0px 10px 0px;
  position: relative;

  &::before {
    border: solid;
    border-width: 0 0.1rem 0.1rem 0;
    content: " ";
    display: inline-block;
    padding: 2px;
    position: absolute;
    right: -15px;
    top: 7px;
    transform: rotate(45deg);
    transition: all 0.2s ease-out;
  }
`;
