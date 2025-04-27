import styled from "styled-components";
import { Form } from "antd";

export const LoginContainer = styled.div`
  height: 100vh;
  background: linear-gradient(to right, #4facfe, #00f2fe);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoginBox = styled.div`
  background: white;
  padding: 40px 30px;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

export const Title = styled.h2`
  text-align: center;
  margin-bottom: 24px;
  color: #333;
`;

export const StyledFormItem = styled(Form.Item)`
  .ant-form-item-label > label {
    font-weight: 500;
    color: #555;
  }
`;

export const ExtraLinks = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  a {
    color: #1890ff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  span {
    display: block;
    margin-top: 8px;
    color: #555;
  }
`;
