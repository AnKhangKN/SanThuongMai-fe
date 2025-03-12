import styled from "styled-components";

export const Wrapper = styled.div`  
    background-color: rgb(255, 255, 255);
    overflow-y: auto; // có thể kéo
    transition: width 0.3s ease-in-out;
    height: 100vh; // sidebar full màn hình
    border-right: 0.5px solid rgb(242, 244, 247);
`

export const WrapperTitle = styled.div`
    display: flex;
    font-size: 20px;
    height: 70px;
`