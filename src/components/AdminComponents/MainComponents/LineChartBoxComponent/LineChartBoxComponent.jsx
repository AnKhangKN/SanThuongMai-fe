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
          <h5>Danh thu</h5>
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
            <h6>Tuần này</h6>
            <p style={{ fontSize: "30px" }}>230,000</p>
          </div>
          <div style={{ textAlign: "center" }}>
            <h6>Tuần trước</h6>
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
