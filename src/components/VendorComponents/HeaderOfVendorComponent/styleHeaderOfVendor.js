import { Image, Row } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled(Row)`
  //   height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  background-color: #fff;
`;

export const WrapperHeaderImageLogo = styled(Image)`
  width: 30px;
  height: 30px;
  object-fit: cover;
  margin: 4px 0;
`;

export const WrapperHeaderTextLogo = styled.span`
  font-size: 18px;
  color: #1d1d1d;
  margin-top: 2px;
  margin-left: 5px;
  font-weight: 400;
`;

export const WrapperHeaderTextAvatar = styled.span`
  max-width: 160px;
  font-size: 14px;
  line-height: 1.2;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
