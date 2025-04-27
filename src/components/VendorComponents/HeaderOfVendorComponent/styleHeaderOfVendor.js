import { Image, Row } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled(Row)`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  line-height: 60px;
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

export const WrapperHeaderImageAvatar = styled.div`
  padding: 2px 16px;
  &:hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.06);
  }
`;

export const AvatarWrapper = styled.div`
  position: relative;
  display: inline-block;
  z-index: 10;
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 10px;
  background: #fff;
  border: 1px solid #ddd;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  padding: 8px 0;
  width: 290px;

  .menu-item {
    display: flex;
    align-items: center;
    position: relative;
    height: 32px;
    z-index: 999;
    padding: 12px 16px;
    box-sizing: border-box;
    color: #333;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
      background: #f5f5f5;
    }
  }
`;

export const WrapperAvatarList = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 12px 16px 7px;
  align-items: center;
  text-align: center;
`;
