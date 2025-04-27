import React, { useState } from "react";
import HeaderComponent from "../HeaderComponent/HeaderComponent";
import SidebarComponent from "../SidebarComponent/SidebarComponent";
import { Wrapper, WrapperMain, WrapperSidebar } from "./style";

const AdminLayout = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <Wrapper>
      {/* Sidebar */}
      <WrapperSidebar style={{ width: isCollapsed ? "80px" : "260px" }}>
        <SidebarComponent isCollapsed={isCollapsed} />
      </WrapperSidebar>

      {/* Main Content */}
      <WrapperMain>
        <HeaderComponent toggleSidebar={toggleSidebar} />
        {children}
      </WrapperMain>
    </Wrapper>
  );
};

export default AdminLayout;
