import React from "react";
import HeaderComponent from "../HeaderComponent/HeaderComponent";
import SidebarComponent from "../SidebarComponent/SidebarComponent";
import { Wrapper, WrapperMain, WrapperSidebar } from "./style";

const AdminLayout = ({ children }) => {
  return (
    <Wrapper>
      <WrapperSidebar>
        <SidebarComponent />
      </WrapperSidebar>

      <WrapperMain>
        <HeaderComponent />
        {children}
      </WrapperMain>
    </Wrapper>
  );
};

export default AdminLayout;
