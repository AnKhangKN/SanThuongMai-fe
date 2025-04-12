import { Col, Row } from "antd";
import React from "react";

const SuggestComponent = () => {
  return (
    <>
      <div style={{}}>
        <div
          style={{
            lineHeight: "60px",
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#fff",
          }}
        >
          <h1 style={{ margin: "0px" }}>Gợi ý hôm nay</h1>
        </div>
        <Row style={{ padding: "5px" }}>
          <Col xl={4}>
            <div style={{ padding: "5px" }}>
              <div style={{ border: "0.5px solid #333" }}> col-4 </div>
            </div>
          </Col>
          <Col xl={4}>
            <div style={{ padding: "5px" }}>
              <div style={{ border: "0.5px solid #333" }}> col-4 </div>
            </div>
          </Col>
          <Col xl={4}>
            <div style={{ padding: "5px" }}>
              <div style={{ border: "0.5px solid #333" }}> col-4 </div>
            </div>
          </Col>
          <Col xl={4}>
            <div style={{ padding: "5px" }}>
              <div style={{ border: "0.5px solid #333" }}> col-4 </div>
            </div>
          </Col>
          <Col xl={4}>
            <div style={{ padding: "5px" }}>
              <div style={{ border: "0.5px solid #333" }}> col-4 </div>
            </div>
          </Col>
          <Col xl={4}>
            <div style={{ padding: "5px" }}>
              <div style={{ border: "0.5px solid #333" }}> col-4 </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default SuggestComponent;
