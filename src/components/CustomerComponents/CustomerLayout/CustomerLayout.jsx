import React from "react";
import HeaderComponent from "../HeaderComponent/HeaderComponent";

const CustomerLayout = ({ children }) => {
  return (
    <div>
      <HeaderComponent />
      {children}
    </div>
  );
};

export default CustomerLayout;
