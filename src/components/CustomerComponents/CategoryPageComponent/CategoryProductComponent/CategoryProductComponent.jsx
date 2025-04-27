import React, { useState } from "react";
import dongHoDemo from "../../../../assets/images/products/dong-ho-demo.webp";
import dongHoDemo2 from "../../../../assets/images/products/dong-ho-demo-2.webp";
import { ChoosePrice, ContainerPrice, WrapperPrice } from "./style";
import { Link } from "react-router-dom";

const mockProducts = [...Array(60)].map((_, i) => ({
  id: i + 1,
  name: `Đồng hồ ${i + 1}`,
  image: i % 2 === 0 ? dongHoDemo : dongHoDemo2,
  price: 1000000 + i * 50000,
}));

const CategoryProductComponent = () => {
  const itemsPerPage = 25;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(mockProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = mockProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          backgroundColor: "#ededed",
          justifyContent: "space-between",
          padding: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            backgroundColor: "#ededed",
          }}
        >
          <div>Sắp xếp theo</div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <button
              style={{
                padding: "10px 15px",
                border: "none",
                outline: "none",
                backgroundColor: "#fff",
                borderRadius: "2px",
              }}
            >
              Liên quan
            </button>
            <button
              style={{
                padding: "10px 15px",
                border: "none",
                outline: "none",
                backgroundColor: "#fff",
                borderRadius: "2px",
              }}
            >
              Mới nhất
            </button>
            <button
              style={{
                padding: "10px 15px",
                border: "none",
                outline: "none",
                backgroundColor: "#fff",
                borderRadius: "2px",
              }}
            >
              Bán chạy
            </button>
          </div>

          <ContainerPrice>
            <WrapperPrice>Giá</WrapperPrice>
            <ChoosePrice>
              <div style={{ marginBottom: "15px" }}>Từ thấp đến cao</div>
              <div>Từ cao đến thấp</div>
            </ChoosePrice>
          </ContainerPrice>
        </div>

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              style={{
                margin: "0 5px",
                padding: "6px 12px",
                border: "none",
                backgroundColor: currentPage === i + 1 ? "#000" : "#ccc",
                color: currentPage === i + 1 ? "#fff" : "#000",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Sản phẩm */}
      <div style={{ display: "flex", flexWrap: "wrap", marginTop: "10px" }}>
        {currentProducts.map((product) => (
          <div key={product.id} style={{ flex: "0 0 calc(100%/5)" }}>
            <Link
              to={`/product/${product.id}`}
              style={{ textDecoration: "none", color: "#333" }}
            >
              <div style={{ margin: "5px", border: "0.5px solid #cdcdcd" }}>
                <div>
                  <img
                    style={{ width: "100%" }}
                    src={product.image}
                    alt={product.name}
                  />
                </div>
                <div
                  style={{
                    textAlign: "center",
                    marginTop: "5px",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                  }}
                >
                  {product.name}
                </div>
                <div
                  style={{
                    textAlign: "center",
                    color: "red",
                    fontWeight: "bold",
                  }}
                >
                  {product.price.toLocaleString()}đ
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default CategoryProductComponent;
