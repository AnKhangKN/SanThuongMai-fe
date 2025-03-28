import React from "react";
import { IconContainer } from "./style";
import { HiBars3BottomLeft } from "react-icons/hi2";

const HeaderComponent = ({ toggleSidebar }) => {
  return (
    <div style={{ display: "flex", alignItems: "center", padding: "10px" }}>
      <IconContainer onClick={toggleSidebar}>
        <HiBars3BottomLeft />
      </IconContainer>

      <h2 style={{ marginLeft: "10px" }}>Admin Dashboard</h2>
    </div>
  );
};

export default HeaderComponent;
