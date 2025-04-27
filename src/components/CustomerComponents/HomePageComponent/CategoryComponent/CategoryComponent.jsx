import React, { useState } from "react";
import { Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import img from "../../../../assets/images/products/ao-demo.webp";
import { Link } from "react-router-dom";

const products = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `Danh mục ${i + 1}`,
  img: img,
}));

const itemsPerRow = 10;
const rowsPerPage = 2;
const itemsPerPage = itemsPerRow * rowsPerPage;

const CategoryComponent = () => {
  const [startIndex, setStartIndex] = useState(0);

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
            key={product.id}
            style={{
              width: `${100 / itemsPerRow}%`,
              boxSizing: "border-box",
              border: "1px solid #f5f5f5",
            }}
          >
            <Link
              to={`/category/${product.name}`}
              style={{ textDecoration: "none", color: "#333" }}
            >
              <div
                style={{
                  width: "80%",
                  margin: "auto ",
                }}
              >
                <img
                  style={{ width: "100%", objectFit: "cover" }}
                  src={product.img}
                  alt={product.name}
                />
              </div>
              <div style={{ textAlign: "center" }}>{product.name}</div>
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
