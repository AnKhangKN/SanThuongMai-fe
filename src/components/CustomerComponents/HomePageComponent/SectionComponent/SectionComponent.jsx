import React from "react";
import { Wrapper } from "./style";
import { Col, Row } from "antd";

const SectionComponent = () => {
  return (
    <>
      <div>
        <Wrapper>
          <Row>
            <Col span={16}>Slide</Col>
            <Col span={8}>
              <div>Code 1</div>
              <div>Code 2</div>
            </Col>
          </Row>
        </Wrapper>
      </div>
    </>
  );
};

export default SectionComponent;
