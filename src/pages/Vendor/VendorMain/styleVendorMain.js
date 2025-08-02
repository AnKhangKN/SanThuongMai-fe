import { Row } from "antd";
import styled from "styled-components";

// Wrapper chính cho toàn bộ trang
export const WrapperVendor = styled(Row)`
  width: 100%;
  // min-height: 100vh;
  padding: 32px 16px;
`;

// Phần container chính giữa
export const WrapperVendorMain = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

// Tiêu đề
export const WrapperVendorTextMain = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #222;
  margin-bottom: 24px;
`;

// Flex cho danh sách các khối thông tin
export const WrapperVendorMainItem = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
`;

// Ô thông tin từng trạng thái
export const WrapperVendorBackgroundItem = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
    background-color: #f0f8ff;
  }
`;

// Số đơn
export const WrapperItemNumber = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: #2673dd;
  margin-bottom: 8px;
`;

// Mô tả
export const WrapperItemText = styled.div`
  font-size: 14px;
  color: #666;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
