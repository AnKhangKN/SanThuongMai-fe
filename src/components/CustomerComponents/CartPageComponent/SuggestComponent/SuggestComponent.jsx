import React from "react";
import logo from "../../../../assets/images/Logo_Den.jpg"; // có thể thay bằng từng ảnh nếu muốn

const sampleProducts = [...Array(12)].map((_, i) => ({
  id: i + 1,
  name: `Sản phẩm ${i + 1}`,
  image: logo, // Hoặc dùng nhiều ảnh khác nhau
  price: 100000 + i * 10000,
}));

const SuggestComponent = () => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: "100%",
          paddingBottom: "100px",
        }}
      >
        {sampleProducts.map((item) => (
          <div key={item.id} style={{ flex: "0 0 calc(100% / 6)" }}>
            <div style={{ padding: "5px" }}>
              <div style={{ width: "100%" }}>
                <img
                  style={{ width: "100%" }}
                  src={item.image}
                  alt={item.name}
                />
              </div>
              <div
                style={{
                  textAlign: "center",
                  marginTop: "5px",
                  textTransform: "uppercase",
                }}
              >
                {item.name}
              </div>
              <div
                style={{
                  textAlign: "center",
                  color: "red",
                  fontWeight: "bold",
                }}
              >
                {item.price.toLocaleString()}đ
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestComponent;
