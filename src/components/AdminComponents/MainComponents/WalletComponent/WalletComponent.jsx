import React from "react";
import { IoMdMore } from "react-icons/io";
import { Wrapper } from "./style";

const WalletComponent = () => {
  return (
    <>
      <Wrapper>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h5>Ví tiền</h5>
          <div
            style={{ fontSize: "18px", display: "flex", alignItems: "center" }}
          >
            <IoMdMore />
          </div>
        </div>
        <div>
          <div style={{ fontSize: "30px" }}>200.000.000đ</div>
        </div>
      </Wrapper>
    </>
  );
};

export default WalletComponent;
