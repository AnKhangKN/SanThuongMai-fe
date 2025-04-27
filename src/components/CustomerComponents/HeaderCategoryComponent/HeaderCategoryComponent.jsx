import React from "react";
import { CategoryItem } from "./style";
import { Link } from "react-router-dom";

const HeaderCategoryComponent = () => {
  const categories = [
    "Xe Đẩy Cho Bé",
    "Quần Áo Ngủ ",
    "Máy Sấy Tóc",
    "Áo Thun Local Brand",
    "Áo Khoác",
    "Chân Váy ",
    "Giày Thể Thao",
    "Túi Xách",
    "Kính Mắt Thời Trang",
    "Mũ Nón",
    "Đồng Hồ Đeo Tay",
  ];

  return (
    <div style={{ display: "flex", alignItems: "center", fontSize: "12px" }}>
      {categories.slice(0, 6).map((category, index) => (
        <Link
          key={index}
          to={`/category/${category}`}
          style={{ textDecoration: "none", color: "#fff" }}
        >
          <CategoryItem>{category}</CategoryItem>
        </Link>
      ))}
    </div>
  );
};

export default HeaderCategoryComponent;
