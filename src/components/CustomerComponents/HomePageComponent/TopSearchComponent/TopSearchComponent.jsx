import React, { useState, useEffect, useRef } from "react";
import { GrNext, GrPrevious } from "react-icons/gr";
import { Link } from "react-router-dom";
import * as ProductServices from "../../../../services/shared/ProductServices";
import { ImageCart } from "./style";
import * as ValidateToken from "../../../../utils/tokenUtils";

const imageURL = `${process.env.REACT_APP_API_URL}/products-img/`;

const TopSearchComponent = () => {
  const [index, setIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(6);
  const [itemWidth, setItemWidth] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);
  const [products, setProducts] = useState([]); // Khởi tạo state products để lưu dữ liệu sản phẩm
  const productRef = useRef();

  // Hàm fetch dữ liệu sản phẩm
  const fetchAllProduct = async () => {
    try {
      const accessToken = await ValidateToken.getValidAccessToken();
      const res = await ProductServices.getAllTopSearch(accessToken);

      // Chuyển ProductViewLog => chỉ lấy productId + thêm count
      const formatted = (res || []).map((item) => ({
        ...item.productId,
        count: item.count,
      }));

      setProducts(formatted);
    } catch (error) {
      console.error("Lỗi khi gọi API sản phẩm:", error);
      setProducts([]);
    }
  };

  // Lấy dữ liệu sản phẩm khi component được mount
  useEffect(() => {
    fetchAllProduct();
  }, []);

  // Cập nhật các giá trị phụ thuộc vào kích thước cửa sổ
  useEffect(() => {
    const updateValues = () => {
      const windowWidth = window.innerWidth;

      if (windowWidth < 576) {
        setVisibleItems(1);
      } else if (windowWidth < 768) {
        setVisibleItems(2);
      } else if (windowWidth < 1024) {
        setVisibleItems(4);
      } else {
        setVisibleItems(6);
      }

      if (productRef.current) {
        const width = productRef.current.offsetWidth;
        setItemWidth(width);
        setMaxIndex(Math.max(0, products.length - visibleItems));
      }
    };

    updateValues();
    window.addEventListener("resize", updateValues);
    return () => window.removeEventListener("resize", updateValues);
  }, [visibleItems, products.length]); // Sử dụng products.length trong dependency array

  const handlePrev = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const handleNext = () => {
    if (index < maxIndex) {
      setIndex(index + 1);
    }
  };

  const translateX = -(index * itemWidth);

  return (
    <div style={{ position: "relative", width: "100%" }}>
      {/* Products */}
      <div style={{ overflow: "hidden" }}>
        <div
          style={{
            display: "flex",
            transition: "transform 0.5s ease-in-out",
            transform: `translateX(${translateX}px)`,
          }}
        >
          {products.length > 0 ? (
            products.map((product, idx) => (
              <div
                key={product._id}
                ref={idx === 0 ? productRef : null} // Chỉ gán ref cho sản phẩm đầu tiên
                style={{
                  flex: `0 0 calc(100% / ${visibleItems})`,
                  padding: "10px",
                  boxSizing: "border-box",
                  textAlign: "center",
                  // border: "0.5px solid #333",
                }}
              >
                <Link
                  to={`/product/${product._id}`}
                  style={{ textDecoration: "none" }}
                >
                  <ImageCart>
                    <img
                      src={
                        product.images?.length > 0
                          ? `${imageURL}${product.images[0]}`
                          : "https://www.nhathuocduochanoi.com.vn/images/default.jpg"
                      }
                      alt={product.productName}
                      style={{
                        width: "100%",
                        height: "180px",
                        objectFit: "contain",
                      }}
                    />
                  </ImageCart>
                  <h5
                    style={{
                      marginTop: "15px",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {product.productName}
                  </h5>
                </Link>
              </div>
            ))
          ) : (
            <div style={{ margin: "50px auto" }}>
              Không có sản phẩm để hiển thị.
            </div>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div
        style={{ position: "absolute", top: "50%", left: "10px", zIndex: 1 }}
      >
        <button
          onClick={handlePrev}
          style={{
            backgroundColor: "#000",
            color: "#fff",
            padding: "10px",
            border: "none",
            cursor: index === 0 ? "not-allowed" : "pointer",
            opacity: index === 0 ? 0.5 : 1,
          }}
        >
          <GrPrevious />
        </button>
      </div>

      <div
        style={{ position: "absolute", top: "50%", right: "10px", zIndex: 1 }}
      >
        <button
          onClick={handleNext}
          style={{
            backgroundColor: "#000",
            color: "#fff",
            padding: "10px",
            border: "none",
            cursor: index === maxIndex ? "not-allowed" : "pointer",
            opacity: index === maxIndex ? 0.5 : 1,
          }}
        >
          <GrNext />
        </button>
      </div>
    </div>
  );
};

export default TopSearchComponent;
