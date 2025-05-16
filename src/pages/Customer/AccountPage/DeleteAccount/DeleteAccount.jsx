import React from "react";
import AccountPage from "../AccountPage";
import { Wrapper } from "./style";
import ButtonComponent from "../../../../components/CustomerComponents/ButtonComponent/ButtonComponent";

const DeleteAccount = () => {
  return (
    <AccountPage>
      <Wrapper>
        <div style={{ fontSize: "20px" }}>
          Bạn có thật sự muốn vô hiệu hóa tài khoản này?
        </div>
        <div style={{ height: "400px" }}></div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <ButtonComponent name="Xóa tài khoản" />
        </div>
      </Wrapper>
    </AccountPage>
  );
};

export default DeleteAccount;
