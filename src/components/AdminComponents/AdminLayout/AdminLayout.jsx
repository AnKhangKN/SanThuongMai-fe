import React from "react";
import HeaderComponent from "../HeaderComponent/HeaderComponent";

const AdminLayout = ({ children }) => {
  return (
    <div>
      <HeaderComponent />
      {children}
    </div>
  );
};

export default AdminLayout;
