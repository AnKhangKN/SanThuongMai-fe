import React from "react";
import Test from "../Test/Test";

const VendorLayout = ({ children }) => {
  return (
    <div>
      <Test />
      {children}
    </div>
  );
};

export default VendorLayout;
