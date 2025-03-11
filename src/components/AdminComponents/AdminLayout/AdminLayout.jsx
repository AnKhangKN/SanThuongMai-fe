import React from "react";
import HeaderComponent from "../HeaderComponent/HeaderComponent";
import SidebarComponent from "../SidebarComponent/SidebarComponent";
import { Wrapper } from "./style";

const AdminLayout = ({ children }) => {
  return (
    <Wrapper>
      <div>
        <SidebarComponent />
      </div>
      <div>
        <HeaderComponent />
        {children}
      </div>
    </Wrapper>
  );
};

export default AdminLayout;
