import { Col, Row } from "antd";
import React from "react";
import voucher1 from "../../../assets/images/voucher-test/1-voucher.png";
import voucher2 from "../../../assets/images/voucher-test/voucher-2.jpg";
import CategoryComponent from "../../../components/CustomerComponents/HomePageComponent/CategoryComponent/CategoryComponent";
import TopSearchComponent from "../../../components/CustomerComponents/HomePageComponent/TopSearchComponent/TopSearchComponent";
import SuggestComponent from "../../../components/CustomerComponents/HomePageComponent/SuggestComponent/SuggestComponent";
import { LineSuggest } from "./style";
import { useQuery } from "@tanstack/react-query";
import * as ProductServices from "../../../services/customer/ProductServices";

const HomePage = () => {
  // const fetchProductAll = async () => {
  //   const res = await ProductServices.getAllProducts();
  //   return res;
  // };

  // const { isLoading, data } = useQuery({
  //   queryKey: ["product"],
  //   queryFn: fetchProductAll,
  // });

  // console.log(data);

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
        <div style={{ backgroundColor: "#fff" }}>
          <div style={{ width: "1200px", margin: "0 auto" }}>
            <Row>
              <Col span={16}>
                <div></div>
              </Col>
              <Col span={8}>
                <div>
                  <div style={{ width: "100%" }}>
                    <img
                      style={{ width: "100%" }}
                      src={voucher1}
                      alt=""
                      srcset=""
                    />
                  </div>
                  <div style={{ width: "100%" }}>
                    <img
                      style={{ width: "100%" }}
                      src={voucher2}
                      alt=""
                      srcset=""
                    />
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>

        {/* category */}
        <div
          style={{
            width: "1200px",
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
            width: "1200px",
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
          style={{ width: "1200px", margin: "0 auto", backgroundColor: "#fff" }}
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
