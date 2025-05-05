import React, { useEffect, useState } from "react";
import { GoLightBulb } from "react-icons/go";
import { ChoosePrice, ContainerPrice, WrapperPrice } from "./style";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as ProductServices from "../../../services/shared/ProductServices";

const SearchPage = () => {
  const itemsPerPage = 30;
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" = Từ thấp đến cao
  const [sortBy, setSortBy] = useState("price"); // Sorting based on price or creation date
  const [selectedButton, setSelectedButton] = useState(null); // Trạng thái của nút đã chọn

  const navigate = useNavigate();

  const { "name-product": keyword } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ProductServices.getSearchProducts(keyword);
        setProducts(response.data);
        setSortedProducts(response.data); // Lưu dữ liệu ban đầu
      } catch (error) {
        console.error("Lỗi khi tìm kiếm sản phẩm:", error);
      }
    };

    fetchData();
  }, [keyword]);

  // Hàm sắp xếp theo giá
  const sortProductsByPrice = (order) => {
    const sorted = [...products].sort((a, b) => {
      const priceA = a.details[0]?.price || 0; // Kiểm tra giá sản phẩm
      const priceB = b.details[0]?.price || 0;

      return order === "asc" ? priceA - priceB : priceB - priceA;
    });
    setSortedProducts(sorted);
  };

  // Hàm sắp xếp theo ngày tạo (newest)
  const sortProductsByNewest = () => {
    const sorted = [...products].sort((a, b) => {
      const dateA = new Date(a.createAt); // Ngày tạo sản phẩm A
      const dateB = new Date(b.createAt); // Ngày tạo sản phẩm B

      return dateB - dateA; // Sắp xếp từ mới đến cũ
    });
    setSortedProducts(sorted);
  };

  // Hàm sắp xếp theo bán chạy (best)
  const sortProductsByBest = () => {
    const sorted = [...products].sort((a, b) => {
      const salesA = a.sales || 0; // Giả sử mỗi sản phẩm có thuộc tính sales
      const salesB = b.sales || 0;

      return salesB - salesA; // Sắp xếp từ bán chạy nhất
    });
    setSortedProducts(sorted);
  };

  // Khi người dùng chọn sắp xếp theo giá hoặc mới nhất
  const handleSortChange = (type, order = "asc") => {
    if (type === "price") {
      setSortBy("price");
      sortProductsByPrice(order);
      setSelectedButton("price"); // Cập nhật trạng thái khi chọn "Giá"
    } else if (type === "newest") {
      setSortBy("newest");
      sortProductsByNewest();
      setSelectedButton("newest"); // Cập nhật trạng thái khi chọn "Mới nhất"
    } else if (type === "best") {
      // Hàm sắp xếp theo bán chạy
      setSortBy("best");
      sortProductsByBest();
      setSelectedButton("best"); // Cập nhật trạng thái khi chọn "Bán chạy"
    }
  };

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = sortedProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div style={{ marginTop: "120px" }}>
      <div style={{ backgroundColor: "#f5f5f5" }}>
        <div style={{ width: "1200px", margin: "0 auto" }}>
          <div style={{ height: "25px" }}></div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              paddingBottom: "30px",
              gap: "10px",
            }}
          >
            <div
              style={{
                fontSize: "20px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <GoLightBulb />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                fontSize: "16px",
              }}
            >
              <div>Kết quả tìm kiếm cho từ khoá</div>
              <div>'{keyword}'</div>
            </div>
          </div>

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
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <button
                  style={{
                    padding: "10px 15px",
                    border: "none",
                    outline: "none",
                    backgroundColor:
                      selectedButton === "price" ? "orange" : "#fff", // Đổi màu khi được chọn
                    borderRadius: "2px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleSortChange("price", "asc")}
                >
                  Liên quan
                </button>
                <button
                  style={{
                    padding: "10px 15px",
                    border: "none",
                    outline: "none",
                    backgroundColor:
                      selectedButton === "newest" ? "orange" : "#fff", // Đổi màu khi được chọn
                    borderRadius: "2px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleSortChange("newest")}
                >
                  Mới nhất
                </button>
                <button
                  style={{
                    padding: "10px 15px",
                    border: "none",
                    outline: "none",
                    backgroundColor:
                      selectedButton === "best" ? "orange" : "#fff", // Đổi màu khi được chọn
                    borderRadius: "2px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleSortChange("best")}
                >
                  Bán chạy
                </button>
              </div>

              <ContainerPrice>
                <WrapperPrice>Giá</WrapperPrice>

                {/* modal giá nếu cần */}
                <ChoosePrice>
                  <div
                    onClick={() => handleSortChange("price", "asc")}
                    style={{ marginBottom: "15px" }}
                  >
                    Từ thấp đến cao
                  </div>
                  <div onClick={() => handleSortChange("price", "desc")}>
                    Từ cao đến thấp
                  </div>
                </ChoosePrice>
              </ContainerPrice>
            </div>

            {/* Phân trang */}
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
              <Link
                style={{
                  color: "#333",
                  textDecoration: "none",
                  flex: "0 0 calc(100%/6)",
                }}
                to={`/product/${product._id}`}
                key={product.id}
              >
                <div style={{ margin: "5px", border: "0.5px solid #cdcdcd" }}>
                  <div>
                    <img
                      style={{ width: "100%" }}
                      src={product.images[0]}
                      alt={product.product_name}
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
                    {product.product_name}
                  </div>
                  <div
                    style={{
                      textAlign: "center",
                      color: "red",
                      fontWeight: "bold",
                    }}
                  >
                    {product?.details[0]?.price}đ
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ height: "40px" }}></div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
