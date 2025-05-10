import React, { useEffect, useState } from "react";
import { Col, Row } from "antd";
import { AiOutlineBars } from "react-icons/ai";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as ProductServices from "../../../services/shared/ProductServices";
import ButtonComponent from "../../../components/CustomerComponents/ButtonComponent/ButtonComponent";
import { ChoosePrice, ContainerPrice, WrapperPrice } from "./style";
import slide_1 from "../../../assets/images/slides/slide_1.jpg";
import slide_2 from "../../../assets/images/slides/slide_2.jpg";
import slide_3 from "../../../assets/images/slides/slide_3.jpg";
import slide_4 from "../../../assets/images/slides/slide_4.jpg";
import slide_5 from "../../../assets/images/slides/slide_5.jpg";
import slide_6 from "../../../assets/images/slides/slide_6.jpg";
import SliderComponent from "../../../components/CustomerComponents/SliderComponent/SliderComponent";

const imageURL = `${process.env.REACT_APP_API_URL}/products-img/`;

const CategoryPage = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [visibleCount, setVisibleCount] = useState(6);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" = Từ thấp đến cao
  const [sortBy, setSortBy] = useState("price");
  const [selectedButton, setSelectedButton] = useState(null);
  const itemsPerPage = 10;
  const { "name-category": keyword } = useParams(); // Dùng để lấy danh mục từ URL
  const navigate = useNavigate();

  const images = [slide_1, slide_2, slide_3, slide_4, slide_5, slide_6];

  // Tính toán chỉ mục bắt đầu và sản phẩm hiện tại
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = sortedProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Lấy sản phẩm theo danh mục từ API
  const fetchProductsByCategory = async () => {
    try {
      const res = await ProductServices.getSearchCategory(keyword);

      setProducts(res.data); // Cập nhật danh sách sản phẩm
      setSortedProducts(res.data);
    } catch (error) {
      console.error("Lỗi khi gọi sản phẩm theo danh mục:", error);
    }
  };

  const fetchAllCategory = async () => {
    const res = await ProductServices.getAllCategoryHome();
    setCategory(res.data);
  };

  // Lấy sản phẩm khi thay đổi danh mục (hoặc khi trang được load lần đầu)
  useEffect(() => {
    fetchProductsByCategory(); // Fetch sản phẩm theo từ khóa danh mục trong URL
    fetchAllCategory();
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

  // Hàm hiển thị thêm danh mục
  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  const handleCategoryClick = (categoryName) => {
    navigate(`/category/${categoryName}`); // Cập nhật URL với tên danh mục
    fetchProductsByCategory(categoryName); // Gọi lại API để lấy sản phẩm theo danh mục
  };

  return (
    <div
      style={{
        marginTop: "120px",
        backgroundColor: "#f5f5f5",
        height: "100%",
      }}
    >
      <div style={{ width: "1200px", margin: "auto" }}>
        <div style={{ height: "15px" }}></div>
        <div>
          <SliderComponent arrImages={images} height="450px" />
        </div>
        <div style={{ height: "15px" }}></div>

        <div style={{ marginTop: "30px" }}>
          <Row gutter={[16, 16]}>
            <Col span={4}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  fontSize: "16px",
                  marginBottom: "10px",
                  fontWeight: "bold",
                }}
              >
                <AiOutlineBars />
                <span>Tất Cả Danh Mục</span>
              </div>

              {/* Hiển thị danh mục */}
              {category.slice(0, visibleCount).map((categoryItem) => (
                <div
                  key={categoryItem.id}
                  style={{ padding: "5px 0", cursor: "pointer" }}
                  onClick={() => handleCategoryClick(categoryItem.name)} // Truyền categoryItem.name để tìm sản phẩm
                >
                  {categoryItem.name}
                </div>
              ))}

              {visibleCount < category.length && (
                <ButtonComponent onClick={handleShowMore} name="Xem Thêm" />
              )}

              <div style={{ marginTop: "20px" }}>
                <ButtonComponent
                  onClick={() => fetchProductsByCategory()} // Đặt lại sản phẩm khi nhấn "Xóa tất cả"
                  name="Xóa tất cả"
                />
              </div>
            </Col>

            <Col span={20}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: "#ededed",
                  padding: "20px",
                  flexWrap: "wrap",
                  gap: "10px",
                }}
              >
                <div
                  style={{ display: "flex", gap: "20px", alignItems: "center" }}
                >
                  <span>Sắp xếp theo:</span>
                  <div style={{ display: "flex", gap: "10px" }}>
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

                <div style={{ textAlign: "center", marginTop: "20px" }}>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      style={{
                        margin: "0 5px",
                        padding: "6px 12px",
                        border: "none",
                        backgroundColor:
                          currentPage === i + 1 ? "#000" : "#ccc",
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

              <div
                style={{ display: "flex", flexWrap: "wrap", marginTop: "10px" }}
              >
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
                    <div
                      style={{ margin: "5px", border: "0.5px solid #cdcdcd" }}
                    >
                      <div>
                        <img
                          style={{
                            width: "100%",
                            height: "160px",
                            objectFit: "contain",
                          }}
                          src={`${imageURL}${product.images[0]}`}
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
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
