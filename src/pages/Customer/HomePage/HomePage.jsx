import { Col, Row } from "antd";
import React from "react";
import voucher1 from "../../../assets/images/voucher-test/1-voucher.png";
import voucher2 from "../../../assets/images/voucher-test/voucher-2.jpg";
import CategoryComponent from "../../../components/CustomerComponents/HomePageComponent/CategoryComponent/CategoryComponent";
import TopSearchComponent from "../../../components/CustomerComponents/HomePageComponent/TopSearchComponent/TopSearchComponent";
import SuggestComponent from "../../../components/CustomerComponents/HomePageComponent/SuggestComponent/SuggestComponent";
import { LineSuggest } from "./style";
import SliderComponent from "../../../components/CustomerComponents/SliderComponent/SliderComponent";
import slide_1 from "../../../assets/images/slides/slide_1.jpg";
import slide_2 from "../../../assets/images/slides/slide_2.jpg";
import slide_3 from "../../../assets/images/slides/slide_3.jpg";
import slide_4 from "../../../assets/images/slides/slide_4.jpg";
import slide_5 from "../../../assets/images/slides/slide_5.jpg";
import slide_6 from "../../../assets/images/slides/slide_6.jpg";

const HomePage = () => {
  const images = [slide_1, slide_2, slide_3, slide_4, slide_5, slide_6];

  return (
    <>
      <div
        style={{
          backgroundColor: "#f5f5f5",
          marginTop: "150px",
          paddingBottom: "100px",
        }}
      >
        {/* slide voucher */}
        <div
          style={{
            backgroundColor: "#fff",
            paddingBottom: "10px",
          }}
        >
          <div
            style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 0px" }}
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} md={16}>
                <SliderComponent arrImages={images} height="245px" />
              </Col>
              <Col xs={24} md={8}>
                <div style={{ width: "100%" }}>
                  <img
                    style={{ width: "100%" }}
                    src={voucher1}
                    alt="Voucher 1"
                  />
                </div>
                <div style={{ width: "100%", marginTop: "10px" }}>
                  <img
                    style={{ width: "100%" }}
                    src={voucher2}
                    alt="Voucher 2"
                  />
                </div>
              </Col>
            </Row>
          </div>
        </div>

        {/* category */}
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            backgroundColor: "#fff",
          }}
        >
          <h3 style={{ padding: "20px" }}>Danh mục</h3>

          <div>
            <CategoryComponent />
          </div>
        </div>

        {/* top search */}
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            backgroundColor: "#fff",
          }}
        >
          <h3 style={{ padding: "20px" }}>Tìm kiếm hàng đầu</h3>

          <div>
            <TopSearchComponent />
          </div>
        </div>

        {/* today suggest */}
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            backgroundColor: "#fff",
          }}
        >
          <LineSuggest>
            <p style={{ margin: 0 }}>Gợi ý hôm nay</p>
          </LineSuggest>

          <div>
            <SuggestComponent />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
