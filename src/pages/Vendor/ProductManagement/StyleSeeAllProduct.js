import { Tabs } from "antd";
import styled from "styled-components";

export const WrapperHeaderSeeAllProduct = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const WrapperUnderHeaderSeeAllProduct = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const StyledTh = styled.th`
  background-color: #fafafa;
  padding: 12px;
  border-bottom: 1px solid #ddd;
  text-align: left;
  font-weight: 600;
`;

export const StyledTd = styled.td`
  padding: 12px;
  border-bottom: 1px solid #f0f0f0;
  vertical-align: middle;
`;

export const ProductImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 4px;
`;

export const EditButton = styled.button`
  background-color: #1890ff;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #40a9ff;
  }
`;

export const WrapperTabs = styled(Tabs)`
  width: 100%;
  margin-top: 20px;
`;
