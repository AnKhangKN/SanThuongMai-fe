import React from "react";
import { Link } from "react-router-dom";
import ao from "../../../../assets/images/products/ao-demo-2.webp";

const products = [
  { id: 1, name: "Áo sơ mi nam", price: "150.000", image: ao },
  { id: 2, name: "Áo thun tay lỡ", price: "120.000", image: ao },
  { id: 3, name: "Áo polo trắng", price: "180.000", image: ao },
  { id: 4, name: "Áo hoodie unisex", price: "250.000", image: ao },
  { id: 5, name: "Áo khoác bomber", price: "320.000", image: ao },
  { id: 6, name: "Áo len cổ lọ", price: "210.000", image: ao },
];

const TrendComponent = () => {
  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {products.map((item) => (
          <div style={{ flex: "0 0 16.666%", boxSizing: "border-box" }}>
            <div style={{ margin: "5px", border: "0.5px solid #d5d5d5" }}>
              <Link
                key={item.id}
                to={`/product/${item.id}`}
                style={{ textDecoration: "none", color: "#333" }}
              >
                <div>
                  <img
                    style={{ width: "100%" }}
                    src={item.image}
                    alt={item.name}
                  />
                </div>
                <div style={{ padding: "5px" }}>
                  <div style={{ fontWeight: "bold", fontSize: "14px" }}>
                    {item.name}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      color: "#e60000",
                    }}
                  >
                    <div>đ</div>
                    <div style={{ marginLeft: "2px" }}>{item.price}</div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendComponent;
