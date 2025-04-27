import styled from "styled-components";

export const ContainerSearchInput = styled.div`
  width: 90%;
  position: relative;
`;

export const ModalSearch = styled.div`
  top: 40px;
  left: -3px;
  padding: 10px;
  border-radius: 2px;
  position: absolute;
  z-index: 20;
  background-color: #fff;
  width: 100%;
  color: #333;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.26);
  visibility: hidden;
  /* visibility: visible; */
`;
