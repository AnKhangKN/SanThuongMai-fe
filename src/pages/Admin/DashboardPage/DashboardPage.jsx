import React, { useCallback, useEffect, useState } from "react";
import {
  BoxContainer,
  BoxName,
  BoxQuantity,
  IconContainer,
  Wrapper,
} from "./style";
import { Col, Row } from "antd";
import { BsFillPeopleFill } from "react-icons/bs";
import { HiMiniBuildingStorefront } from "react-icons/hi2";
import { BiSolidDollarCircle } from "react-icons/bi";
import { MdShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import * as HomeServices from "../../../services/admin/HomeServices";
import { useSelector } from "react-redux";
import * as ValidateToken from "../../../utils/tokenUtils";

const DashboardPage = () => {
  const [allData, setAllData] = useState({});
  const user = useSelector((state) => state.user);

  const fetchAllHome = useCallback(async () => {
    try {
      const token = await ValidateToken.getValidAccessToken();
      const res = await HomeServices.getAllHome(token);

      if (res?.data) {
        setAllData(res.data);
      } else {
        console.error("Không nhận được phản hồi hợp lệ từ API.");
      }
    } catch (error) {
      console.error("Lỗi khi lấy sản phẩm:", error);
    }
  }, []); // Thêm dependency [] để đảm bảo chỉ gọi khi component mount

  useEffect(() => {
    fetchAllHome();
  }, [fetchAllHome]);

  return (
    <>
      <Wrapper>
        <Row style={{ marginBottom: "30px" }}>
          <Col span={12}>
            <h3>Tổng quan</h3>
          </Col>
          <Col span={12}></Col>
        </Row>

        <Row gutter={16}>
          <Col className="gutter-row" span={6}>
            <Link to="/admin/vendors">
              <BoxContainer>
                <div>
                  <BoxQuantity>{allData.countShop || 0}</BoxQuantity>
                  <BoxName>Shop</BoxName>
                </div>
                <IconContainer>
                  <BsFillPeopleFill />
                </IconContainer>
              </BoxContainer>
            </Link>
          </Col>
          <Col className="gutter-row" span={6}>
            <Link to="/admin/products">
              <BoxContainer>
                <div>
                  <BoxQuantity>{allData.countProduct || 0}</BoxQuantity>
                  <BoxName>Sản phẩm</BoxName>
                </div>
                <IconContainer>
                  <HiMiniBuildingStorefront />
                </IconContainer>
              </BoxContainer>
            </Link>
          </Col>
          <Col className="gutter-row" span={6}>
            <BoxContainer>
              <div>
                <BoxQuantity>
                  {user?.wallet?.toLocaleString("vi-VN")} VNĐ
                </BoxQuantity>
                <BoxName>Thu nhập</BoxName>
              </div>
              <IconContainer>
                <BiSolidDollarCircle />
              </IconContainer>
            </BoxContainer>
          </Col>
          <Col className="gutter-row" span={6}>
            <Link to="/admin/shipping">
              <BoxContainer>
                <div>
                  <BoxQuantity>{allData.countOrder || 0}</BoxQuantity>
                  <BoxName>Đơn Hàng</BoxName>
                </div>
                <IconContainer>
                  <MdShoppingCart />
                </IconContainer>
              </BoxContainer>
            </Link>
          </Col>
        </Row>

        {/* <Row gutter={16} style={{ marginTop: "20px" }}>
          <Col className="gutter-row" span={15}>
            <LineChartBoxComponent />
          </Col>
          <Col className="gutter-row" span={9}>
            <WalletComponent />
          </Col>
        </Row> */}
      </Wrapper>
    </>
  );
};

export default DashboardPage;
