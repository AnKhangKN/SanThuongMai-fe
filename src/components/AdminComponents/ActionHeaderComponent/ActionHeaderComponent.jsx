import React from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { PiBellSimpleLight } from "react-icons/pi";
import { RxEnterFullScreen, RxExitFullScreen } from "react-icons/rx";
import { IconContainer, WrapperActionList } from "./style";

const ActionHeaderComponent = () => {
  return (
    <>
      {/* action list */}
      <WrapperActionList>
        {/* notification */}
        <IconContainer>
          <PiBellSimpleLight />
        </IconContainer>

        {/* setting */}
        <IconContainer>
          <IoSettingsOutline />
        </IconContainer>

        {/* full screen */}
        <IconContainer>
          <RxEnterFullScreen />
        </IconContainer>
        <IconContainer style={{ display: "none" }}>
          <RxExitFullScreen />
        </IconContainer>
      </WrapperActionList>

      {/* Account */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          gap: "12px",
          borderLeft: "0.5px solid #ccc",
          padding: "0px 25px",
          height: "70px",
          backgroundColor: "#fafafd",
        }}
      >
        {/* Avatar */}
        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: "50%",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "40px",
            height: "40px",
          }}
        >
          <img
            src=""
            alt="Avatar"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        {/* Tên và Vai trò */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p
            style={{
              margin: 0,
              padding: 0,
              fontSize: "15px",
              fontWeight: "500",
            }}
          >
            Phan An Khang
          </p>
          <p style={{ margin: 0, padding: 0, fontSize: "12px", color: "gray" }}>
            Admin
          </p>
        </div>
      </div>
    </>
  );
};

export default ActionHeaderComponent;
