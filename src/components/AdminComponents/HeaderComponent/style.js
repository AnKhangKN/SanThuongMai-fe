import { Row } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled(Row)`
    height: 70px;
    display: flex;
    align-items: center;
    border-bottom: 0.5px solid #f2f4f7;
    
`

export const IconContainer = styled.div`
    transition: all 0.3s ease;
    font-size: 26px;
    cursor: pointer;
    &:hover {
        color:  #878ff5;
    }
`