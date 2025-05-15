import React from "react";
import AccountPage from "../AccountPage";
import { Wrapper } from "./style";
import { useSelector } from "react-redux";

const WalletPage = () => {
  const user = useSelector((state) => state.user);

  return (
    <AccountPage>
      <Wrapper>
        <div style={{ fontSize: "20px" }}>
          Tài khoản của bạn hiện có: {user.wallet} đ
        </div>
      </Wrapper>
    </AccountPage>
  );
};

export default WalletPage;
