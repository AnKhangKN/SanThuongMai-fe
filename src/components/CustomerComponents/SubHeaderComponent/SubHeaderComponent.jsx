import React from "react";
import { Wrapper } from "./style";


const SubHeaderComponent = () => {
  return (
    <Wrapper>
      <div style={{marginLeft:"40px"}}>Kênh bán hàng</div>
      <div style={{ display: "flex", gap: "20px"}}>
        <div>Theo dõi đơn hàng</div>
        <div>Hỗ trợ</div>
        <div>Đăng kí</div>
        <div style={{marginRight:"40px"}}>Đăng nhập</div>
      </div>
      </Wrapper>
  );
};

export default SubHeaderComponent;
