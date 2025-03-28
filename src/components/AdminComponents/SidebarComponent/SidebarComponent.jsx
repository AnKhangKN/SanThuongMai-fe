import React from "react";
import { Wrapper, WrapperTitle } from "./style";
import Logo_Trang from "../../../assets/images/Logo_Trang.jpg";
import SidebarActionListComponent from "../SidebarActionListComponent/SidebarActionListComponent";

const SidebarComponent = ({ isCollapsed }) => {
  return (
    <Wrapper style={{ width: isCollapsed ? "80px" : "250px" }}>
      {/* Logo */}
      <WrapperTitle>
        <div style={{ width: "50px", height: "30px" }}>
          <img
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            src={Logo_Trang}
            alt="logo"
          />
        </div>
        {!isCollapsed && <p style={{ padding: 0, margin: 0 }}>HKN</p>}
      </WrapperTitle>

      {/* Danh sách menu */}
      <SidebarActionListComponent isCollapsed={isCollapsed} />
    </Wrapper>
  );
};

export default SidebarComponent;
