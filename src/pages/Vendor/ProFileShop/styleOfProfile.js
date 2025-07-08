import { Upload } from "antd";
import styled from "styled-components";

export const ShopProfileWrapper = styled.div`
  display: flex;
  padding: 24px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

export const ShopAvatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 12px;
  object-fit: cover;
`;

export const ShopInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const ShopName = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #1f1f1f;
  margin-bottom: 12px;
`;

export const ShopDescription = styled.p`
  font-size: 16px;
  color: #595959;
  margin-bottom: 12px;
`;

export const ShopDetail = styled.div`
  font-size: 14px;
  color: #4a4a4a;
  line-height: 1.6;

  p {
    margin: 4px 0;
  }
`;

export const CustomUpload = styled(Upload)`
  .ant-upload-list-item-name {
    max-width: 120px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;
