import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import ButtonComponent from "../../ButtonComponent/ButtonComponent";
import { Link } from "react-router-dom";
import * as ProductServices from "../../../../services/shared/ProductServices";

const imageURL = `${process.env.REACT_APP_API_URL}/products-img/`;

const SuggestComponent = () => {
  const [visibleRows, setVisibleRows] = useState(4); // 4 dòng mặc định
  const [allData, setAllData] = useState([]); // chứa sản phẩm thực tế
  const itemsPerRow = 4;

  const fetchProducts = async () => {
    try {
      const res = await ProductServices.getAllProducts();

      const productsWithKeys = res.data.map((product) => ({
        ...product,
        key: product._id || product.id,
      }));
      setAllData(productsWithKeys);
    } catch (error) {
      console.error("Lỗi khi lấy sản phẩm:", error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const handleLoadMore = () => {
    setVisibleRows((prev) => prev + 2);
  };

  const visibleProducts = allData.slice(0, visibleRows * itemsPerRow);

  return (
    <div>
      <Row gutter={[16, 16]}>
        {visibleProducts.length > 0 ? (
          visibleProducts.map((product) => (
            <Col span={6} key={product.key}>
              <Link
                to={`/product/${product._id}`}
                style={{ textDecoration: "none", color: "#333" }}
              >
                <div style={{ border: "1px solid #ccc" }}>
                  <div style={{ width: "100%" }}>
                    <img
                      src={
                        Array.isArray(product.images) &&
                        product.images.length > 0
                          ? `${imageURL}${product.images[0]}`
                          : "https://www.nhathuocduochanoi.com.vn/images/default.jpg"
                      }
                      alt={product.productName}
                      style={{
                        width: "100%",
                        height: "300px",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                  <div style={{ padding: "10px" }}>
                    <div style={{ marginBottom: "30px", fontSize: "20px" }}>
                      {product.productName}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          color: "#ee4d2d",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "2px",
                        }}
                      >
                        <div style={{ fontSize: "10px" }}>đ</div>
                        <div style={{ fontSize: "18px" }}>
                          {product.priceOptions[0].price}
                        </div>
                      </div>
                      <div style={{ fontSize: "13px" }}>
                        Đã bán: {product.soldCount}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </Col>
          ))
        ) : (
          <div style={{ margin: "auto", lineHeight: "50px" }}>
            Chưa có sản phẩm hiển thị
          </div>
        )}
      </Row>

      <div style={{ backgroundColor: "#f5f5f5", paddingTop: "20px" }}>
        {visibleProducts.length < allData.length && (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <ButtonComponent onClick={handleLoadMore} name="Xem Thêm" />
          </div>
        )}
      </div>
    </div>
  );
};

export default SuggestComponent;
