import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import * as ProductServices from "../../../../services/shared/ProductServices";

const itemsPerRow = 10;
const rowsPerPage = 2;
const itemsPerPage = itemsPerRow * rowsPerPage;

const imageURL = `${process.env.REACT_APP_API_URL}/products-img/`;

const CategoryComponent = () => {
  const [products, setProducts] = useState([]);
  const [startIndex, setStartIndex] = useState(0);

  const fetchCategory = async () => {
    try {
      const res = await ProductServices.getAllCategoryHome();

      setProducts(res);
    } catch (err) {
      console.error("Lỗi khi lấy danh mục:", err);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const handleNext = () => {
    if (startIndex + itemsPerPage < products.length) {
      setStartIndex(startIndex + itemsPerPage);
    }
  };

  const handlePrev = () => {
    if (startIndex - itemsPerPage >= 0) {
      setStartIndex(startIndex - itemsPerPage);
    }
  };

  const currentItems = products.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          transition: "transform 0.5s ease",
        }}
      >
        {currentItems.map((product) => (
          <div
            key={product._id}
            style={{
              width: `${100 / itemsPerRow}%`,
              boxSizing: "border-box",
              border: "1px solid #f5f5f5",
            }}
          >
            <Link
              to={`/category/${product.categoryName}/${product._id}`}
              style={{ textDecoration: "none", color: "#333" }}
            >
              <div style={{ width: "80%", margin: "auto" }}>
                <img
                  style={{
                    width: "100%",
                    height: "94px",
                    objectFit: "contain",
                  }}
                  src={
                    product.image
                      ? `${imageURL}${product.image}`
                      : "https://www.nhathuocduochanoi.com.vn/images/default.jpg"
                  }
                  alt={product.name || "Product Image"}
                />
              </div>
              <div style={{ textAlign: "center" }}>{product.categoryName}</div>
            </Link>
          </div>
        ))}
      </div>

      {/* Nút điều hướng */}
      <div>
        <Button
          icon={<LeftOutlined />}
          onClick={handlePrev}
          disabled={startIndex === 0}
          style={{
            left: "10px",
            position: "absolute",
            top: "40%",
            zIndex: 1,
          }}
        />
        <Button
          icon={<RightOutlined />}
          onClick={handleNext}
          disabled={startIndex + itemsPerPage >= products.length}
          style={{
            right: "10px",
            position: "absolute",
            top: "40%",
            zIndex: 1,
          }}
        />
      </div>
    </div>
  );
};

export default CategoryComponent;
