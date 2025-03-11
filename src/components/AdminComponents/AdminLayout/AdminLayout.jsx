import React from "react";
import HeaderComponent from "../HeaderComponent/HeaderComponent";
import SidebarComponent from "../SidebarComponent/SidebarComponent";
import { Wrapper, WrapperSidebar } from "./style";

const AdminLayout = ({ children }) => {
  return (
    <Wrapper>
      <WrapperSidebar>
        <SidebarComponent />
      </WrapperSidebar>

      {/* Phần bên phải (Header + Nội dung) */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        {/* Header */}
        <div
          style={{
            height: "60px",
            backgroundColor: "white",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            display: "flex",
            alignItems: "center",
            padding: "0 20px",
          }}
        >
          <HeaderComponent />
        </div>

        {/* Nội dung chính (children) */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "20px",
            backgroundColor: "#f8f9fa",
          }}
        >
          {children}
        </div>
      </div>
    </Wrapper>
  );
};

export default AdminLayout;
