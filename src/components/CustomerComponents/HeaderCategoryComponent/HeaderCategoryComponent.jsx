import React from "react";
import { CategoryItem } from "./style";

const HeaderCategoryComponent = () => {
  return (
    <>
      <div style={{ display: "flex", alignItems: "center", fontSize: "12px" }}>
        <CategoryItem>Xe Đẩy Cho Bé</CategoryItem>
        <CategoryItem>Quần Áo Ngủ Sexy</CategoryItem>
        <CategoryItem>Máy Sấy Tóc</CategoryItem>
        <CategoryItem>Áo Thun Local Brand</CategoryItem>
        <CategoryItem>Đồ Lót Lọt Khe Xuyên Thấu</CategoryItem>
        <CategoryItem>Chân Váy Không Quần</CategoryItem>
      </div>
    </>
  );
};

export default HeaderCategoryComponent;
