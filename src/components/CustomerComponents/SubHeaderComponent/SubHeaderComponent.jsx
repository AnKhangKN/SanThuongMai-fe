import React from "react";
import { Wrapper } from "./style";


const SubHeaderComponent = () => {
  return (
    <Wrapper>
      <div>kênh bán hàng</div>
      <div style={{ display: "flex"}}>
        <div>Theo dõi đơn hàng</div>
        <div>Hỗ trợ</div>
        <div>Đăng kí</div>
        <div>Đăng nhập</div>
      </div>
      </Wrapper>
  );
};

export default SubHeaderComponent;
