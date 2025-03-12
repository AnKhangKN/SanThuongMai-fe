import React from "react";
import { IoMdMore } from "react-icons/io";
import { Wrapper } from "./style";

const CommentBoxComponent = () => {
  return (
    <>
      <Wrapper>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>Bình luận</div>
          <div style={{ fontSize: "18px" }}>
            <IoMdMore />
          </div>
        </div>
        <div>
          <div>Khang</div>
          <div>Ngọc </div>
          <div>Hiếu</div>
        </div>
      </Wrapper>
    </>
  );
};

export default CommentBoxComponent;
