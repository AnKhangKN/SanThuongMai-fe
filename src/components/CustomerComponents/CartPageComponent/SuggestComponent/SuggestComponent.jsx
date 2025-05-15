import React, { useEffect, useState } from "react";
import * as ProductServices from "../../../../services/shared/ProductServices";

const imageURL = `${process.env.REACT_APP_API_URL}/products-img/`;

const SuggestComponent = () => {
  const [product, setProduct] = useState([]);

  const fetchAllProduct = async () => {
    try {
      const res = await ProductServices.getTopCartProducts();
      setProduct(res.data || []);
    } catch (error) {
      console.error("Lỗi khi lấy sản phẩm:", error);
    }
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);


  return (
    <div style={{ display: "flex", flexWrap: "wrap", paddingBottom: "100px" }}>
      {product.length > 0 ? (
        product.map((item) => (
          <div key={item._id} style={{ flex: "0 0 calc(100% / 6)" }}>
            <div
              style={{
                margin: "3px",
                border: "0.5px solid #b6b6b6",
              }}
            >
              <img
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
                src={
                  item.images?.[0]
                    ? `${imageURL}${item.images[0]}`
                    : "/default-image.jpg"
                }
                alt={item.product_name}
              />
              <div style={{ padding: "5px" }}>
                <div
                  style={{
                    marginTop: "5px",
                    textTransform: "uppercase",
                  }}
                >
                  {item.product_name || "Tên sản phẩm"}
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "30px",
                  }}
                >
                  <div
                    style={{
                      color: "red",
                      fontWeight: "bold",
                    }}
                  >
                    {item.details?.[0]?.price
                      ? `${item.details[0].price.toLocaleString()}đ`
                      : "Giá không có sẵn"}
                  </div>

                  <div>{item.sold_count}</div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p style={{ textAlign: "center", width: "100%" }}>
          Đang tải sản phẩm...
        </p>
      )}
    </div>
  );
};

export default SuggestComponent;
