import React from "react";
import AccountPage from "../AccountPage";
import { Wrapper } from "./style";

const WalletPage = () => {
  return (
    <AccountPage>
      <Wrapper>
        <div style={{ fontSize: "20px" }}>
          Tài khoản của bạn hiện có: 200000đ
        </div>
      </Wrapper>
    </AccountPage>
  );
};

export default WalletPage;
