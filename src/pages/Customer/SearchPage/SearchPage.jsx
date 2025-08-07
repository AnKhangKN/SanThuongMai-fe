import React, { useEffect, useState } from "react";
import { GoLightBulb } from "react-icons/go";
import { Link, useParams } from "react-router-dom";
import * as ProductServices from "../../../services/shared/ProductServices";
import slide_1 from "../../../assets/images/slides/slide_1.jpg";
import slide_2 from "../../../assets/images/slides/slide_2.jpg";
import slide_3 from "../../../assets/images/slides/slide_3.jpg";
import slide_4 from "../../../assets/images/slides/slide_4.jpg";
import slide_5 from "../../../assets/images/slides/slide_5.jpg";
import slide_6 from "../../../assets/images/slides/slide_6.jpg";
import SliderComponent from "../../../components/CustomerComponents/SliderComponent/SliderComponent";

const imageURL = `${process.env.REACT_APP_API_URL}/products-img/`;

const SearchPage = () => {
  const itemsPerPage = 30;
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [selectedButton, setSelectedButton] = useState(null);
  const images = [slide_1, slide_2, slide_3, slide_4, slide_5, slide_6];
  const { "name-product": keyword } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ProductServices.getSearchProducts(keyword);
        setProducts(response.data);
        setSortedProducts(response.data);
      } catch (error) {
        console.error("Lỗi khi tìm kiếm sản phẩm:", error);
      }
    };
    fetchData();
  }, [keyword]);

  const sortProductsByPrice = (order) => {
    const sorted = [...products].sort((a, b) => {
      const priceA = a.priceOptions[0]?.finalPrice || 0;
      const priceB = b.priceOptions[0]?.finalPrice || 0;
      return order === "asc" ? priceA - priceB : priceB - priceA;
    });
    setSortedProducts(sorted);
  };

  const sortProductsByNewest = () => {
    const sorted = [...products].sort(
      (a, b) => new Date(b.createAt) - new Date(a.createAt)
    );
    setSortedProducts(sorted);
  };

  const sortProductsByBest = () => {
    const sorted = [...products].sort(
      (a, b) => (b.soldCount || 0) - (a.soldCount || 0)
    );
    setSortedProducts(sorted);
  };

  const handleSortChange = (type, order = "asc") => {
    if (type === "price") sortProductsByPrice(order);
    else if (type === "newest") sortProductsByNewest();
    else if (type === "best") sortProductsByBest();
    setSelectedButton(type);
  };

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = sortedProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Responsive columns per row
  const getColWidth = () => {
    const width = window.innerWidth;
    if (width >= 1200) return "calc(100% / 6)";
    if (width >= 992) return "calc(100% / 4)";
    if (width >= 768) return "calc(100% / 3)";
    if (width >= 576) return "calc(100% / 2)";
    return "100%";
  };

  const [colWidth, setColWidth] = useState(getColWidth());

  useEffect(() => {
    const handleResize = () => setColWidth(getColWidth());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={{ marginTop: "120px" }}>
      <div style={{ backgroundColor: "#f5f5f5" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <SliderComponent arrImages={images} height="450px" />
          <div style={{ height: "30px" }}></div>

          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <GoLightBulb />
            <div>Kết quả tìm kiếm cho từ khoá '{keyword}'</div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "20px 5px",
              flexWrap: "wrap",
            }}
          >
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <button
                style={{
                  backgroundColor:
                    selectedButton === "price" ? "#194a7a" : "#fff",
                  color: selectedButton === "price" ? "#fff" : "#194a7a",
                  border: "0.5px solid #b1b1b1",
                  padding: "10px 20px",
                }}
                onClick={() => handleSortChange("price", "asc")}
              >
                Liên quan
              </button>
              <button
                style={{
                  backgroundColor:
                    selectedButton === "newest" ? "#194a7a" : "#fff",
                  color: selectedButton === "newest" ? "#fff" : "#194a7a",
                  border: "0.5px solid #b1b1b1",
                  padding: "10px 20px",
                }}
                onClick={() => handleSortChange("newest")}
              >
                Mới nhất
              </button>
              <button
                style={{
                  backgroundColor:
                    selectedButton === "best" ? "#194a7a" : "#fff",
                  color: selectedButton === "best" ? "#fff" : "#194a7a",
                  border: "0.5px solid #b1b1b1",
                  padding: "10px 20px",
                }}
                onClick={() => handleSortChange("best")}
              >
                Bán chạy
              </button>
            </div>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {currentProducts.map((product) => (
              <Link
                key={product._id}
                to={`/product/${product._id}`}
                style={{
                  textDecoration: "none",
                  color: "#333",
                  flex: `0 0 ${colWidth}`,
                }}
              >
                <div style={{ border: "0.5px solid #cdcdcd", margin: "3px" }}>
                  <img
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "contain",
                    }}
                    src={`${imageURL}${product.images[0]}`}
                    alt={product.productName}
                  />
                  <div
                    style={{
                      padding: "10px",
                      textTransform: "uppercase",
                      maxWidth: "100%",
                    }}
                  >
                    {product.productName}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "10px",
                      marginTop: "30px",
                    }}
                  >
                    <div style={{ color: "red" }}>
                      {product?.priceOptions[0]?.finalPrice?.toLocaleString(
                        "vi-VN"
                      )}
                      đ
                    </div>

                    <div
                      style={{
                        fontSize: "14px",
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <div>Đã bán:</div>
                      <div>{product?.soldCount}</div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "20px" }}>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                style={{
                  margin: "0 5px",
                  padding: "6px 12px",
                  backgroundColor: currentPage === i + 1 ? "#000" : "#ccc",
                  color: currentPage === i + 1 ? "#fff" : "#000",
                }}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
