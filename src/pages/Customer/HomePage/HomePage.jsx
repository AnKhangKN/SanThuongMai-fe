import React from "react";
import Banner from "../../../assets/images/Banner/Banner.jpg";
const HomePage = () => {
  return (
    <>
      <div style={{ backgroundColor: "#f5f5f5", height: "80px" }}></div>

      <div style={{ margin: "0px 40px 0px 40px" }}>
        <div>
          <img src={Banner} style={{ width: "100%" }} />
        </div>
      </div>
    </>
  );
};

export default HomePage;
