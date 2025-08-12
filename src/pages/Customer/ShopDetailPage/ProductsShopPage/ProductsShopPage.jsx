import React, { useEffect, useState } from "react";
import ShopDetailPage from "../ShopDetailPage";
import * as ShopServices from "../../../../services/customer/ShopServices";
import { useParams, Link } from "react-router-dom";
import { Row, Col, Button, Spin } from "antd"; // Đã thêm Spin từ Ant Design
import { LoadingOutlined } from "@ant-design/icons";

const imageURL = `${process.env.REACT_APP_API_URL}/products-img/`;

const ProductsShopPage = () => {
  const { id } = useParams();
  const [visibleRows, setVisibleRows] = useState(4);
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(true);
  const itemsPerRow = 4;

  const fetchProducts = async (id) => {
    setLoading(true);
    try {
      const res = await ShopServices.getDetailShop(id);

      const productsWithKeys =
        res.data?.data?.products?.map((product) => ({
          ...product,
          key: product._id || product.id,
        })) || [];
      setAllData(productsWithKeys);
    } catch (error) {
      console.error("Lỗi khi lấy sản phẩm:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(id);
  }, [id]);

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleRows((prev) => prev + 2);
      setLoading(false);
    }, 500);
  };

  const visibleProducts = allData.slice(0, visibleRows * itemsPerRow);

  return (
    <ShopDetailPage>
      {loading ? (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Spin indicator={<LoadingOutlined spin />} size="large" />
        </div>
      ) : (
        <div>
          <Row gutter={[16, 16]}>
            {visibleProducts.map((product) => (
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
                      <div
                        style={{
                          marginBottom: "30px",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
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
                        <div style={{ color: "#ee4d2d" }}>
                          <span style={{ fontSize: "10px" }}>đ</span>
                          <span style={{ fontSize: "18px" }}>
                            {product.priceOptions?.[0]?.finalPrice || "0"}
                          </span>
                        </div>
                        <div style={{ fontSize: "13px" }}>
                          Đã bán: {product.soldCount || 0}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </Col>
            ))}
          </Row>

          {visibleProducts.length < allData.length && (
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <Button onClick={handleLoadMore} type="primary">
                Xem Thêm
              </Button>
            </div>
          )}
        </div>
      )}
    </ShopDetailPage>
  );
};

export default ProductsShopPage;
