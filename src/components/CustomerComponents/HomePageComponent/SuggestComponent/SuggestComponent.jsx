import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import ButtonComponent from "../../ButtonComponent/ButtonComponent";
import { Link } from "react-router-dom";
import * as ProductServices from "../../../../services/shared/ProductServices";

const imageURL = `${process.env.REACT_APP_API_URL}/products-img/`;

const SuggestComponent = () => {
  const [visibleRows, setVisibleRows] = useState(4); // 4 dòng mặc định
  const [allData, setAllData] = useState([]); // chứa tất cả sản phẩm
  const [itemsPerRow, setItemsPerRow] = useState(getItemsPerRow()); // số sản phẩm mỗi dòng theo màn hình

  // ✅ Hàm tính số item mỗi dòng theo chiều rộng màn hình
  function getItemsPerRow() {
    const width = window.innerWidth;
    if (width < 576) return 1; // xs: mobile
    if (width < 768) return 2; // sm: small tablet
    if (width < 992) return 3; // md: tablet
    return 4; // lg+: desktop
  }

  // ✅ Lắng nghe resize để cập nhật số sản phẩm mỗi dòng
  useEffect(() => {
    const handleResize = () => {
      setItemsPerRow(getItemsPerRow());
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Gọi API lấy sản phẩm
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
    setVisibleRows((prev) => prev + 2); // mỗi lần xem thêm 2 dòng
  };

  const visibleProducts = allData.slice(0, visibleRows * itemsPerRow);

  return (
    <div>
      <Row gutter={[16, 16]}>
        {visibleProducts.length > 0 ? (
          visibleProducts.map((product) => (
            <Col xs={24} sm={12} md={8} lg={6} key={product._id}>
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
                        height: "200px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div style={{ padding: "10px" }}>
                    <div
                      style={{
                        marginBottom: "20px",
                        fontSize: "18px",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        minHeight: "48px",
                      }}
                    >
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
                          gap: "4px",
                        }}
                      >
                        <span style={{ fontSize: "12px" }}>đ</span>
                        <span style={{ fontSize: "18px" }}>
                          {(
                            product.priceOptions[0].price +
                            (product.priceOptions[0].price *
                              product.categoryInfo.platformFee) /
                              100 +
                            (product.priceOptions[0].price *
                              product.categoryInfo.vat) /
                              100
                          ).toLocaleString()}
                        </span>
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
