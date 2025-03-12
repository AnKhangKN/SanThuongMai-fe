import React from "react";
import { IoMdMore } from "react-icons/io";
import LineChartComponent from "../LineChartComponent/LineChartComponent";
import { Wrapper } from "./style";

const LineChartBoxComponent = () => {
  return (
    <>
      <Wrapper>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          <div style={{ fontSize: "18px", fontWeight: "400" }}>Doanh thu</div>
          <div style={{ fontSize: "18px" }}>
            <IoMdMore />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            backgroundColor: "#f6f7fb",
            marginBottom: "30px",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <p>Tuần này</p>
            <p style={{ fontSize: "30px" }}>230,000</p>
          </div>
          <div style={{ textAlign: "center" }}>
            <p>Tuần trước</p>
            <p style={{ fontSize: "30px" }}>34,000</p>
          </div>
        </div>

        <div>
          <LineChartComponent />
        </div>
      </Wrapper>
    </>
  );
};

export default LineChartBoxComponent;
