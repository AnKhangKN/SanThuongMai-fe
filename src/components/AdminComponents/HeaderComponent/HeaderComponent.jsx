import React from "react";
import { IoMenu } from "react-icons/io5";

const HeaderComponent = ({ toggleSidebar }) => {
  return (
    <div style={{ display: "flex", alignItems: "center", padding: "10px" }}>
      <IoMenu size={24} style={{ cursor: "pointer" }} onClick={toggleSidebar} />
      <h2 style={{ marginLeft: "10px" }}>Admin Dashboard</h2>
    </div>
  );
};

export default HeaderComponent;
