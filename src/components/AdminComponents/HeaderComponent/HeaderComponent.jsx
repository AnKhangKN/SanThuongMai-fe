import React from "react";
import { AccountText, IconContainer } from "./style";
import { HiBars3BottomLeft } from "react-icons/hi2";
import {
  IoChatboxEllipsesOutline,
  IoNotificationsOutline,
} from "react-icons/io5";
import logo_test from "../../../assets/images/Logo_Trang.jpg";

const HeaderComponent = ({ toggleSidebar }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "10px",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "10px",
        }}
      >
        <IconContainer onClick={toggleSidebar}>
          <HiBars3BottomLeft />
        </IconContainer>

        <h3 style={{ margin: "0px 0px 0px 20px" }}>HKN store</h3>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <IconContainer>
          <IoNotificationsOutline />
        </IconContainer>
        <IconContainer style={{ margin: "0px 20px" }}>
          <IoChatboxEllipsesOutline />
        </IconContainer>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              border: "0.5px solid rgb(155, 155, 155)",
              marginRight: "5px",
            }}
          >
            <img
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                borderRadius: "50%",
              }}
              src={logo_test}
              alt=""
              srcset=""
            />
          </div>
          <AccountText>Khang</AccountText>
        </div>
      </div>
    </div>
  );
};

export default HeaderComponent;
