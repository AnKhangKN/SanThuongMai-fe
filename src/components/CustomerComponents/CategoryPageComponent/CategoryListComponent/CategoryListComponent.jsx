import React, { useState } from "react";
import { AiOutlineBars } from "react-icons/ai";
import ButtonComponent from "../../ButtonComponent/ButtonComponent";

// Giả lập dữ liệu danh mục
const ListCategory = [
  { id: 1, name: "Tất Cả Danh Mục" },
  { id: 2, name: "Thời trang" },
  { id: 3, name: "Giày" },
  { id: 4, name: "Đồng hồ" },
  { id: 5, name: "Điện thoại" },
  { id: 6, name: "Máy tính bảng" },
  { id: 7, name: "Laptop" },
  { id: 8, name: "Phụ kiện" },
  { id: 9, name: "Nhà cửa & Đời sống" },
  { id: 10, name: "Thể thao & Dã ngoại" },
  { id: 11, name: "Sách" },
  { id: 12, name: "Mẹ & Bé" },
  { id: 13, name: "Thiết bị điện tử" },
];

const CategoryListComponent = () => {
  const [visibleCount, setVisibleCount] = useState(5);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  return (
    <div>
      {/* danh mục */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          fontSize: "16px",
          marginBottom: "10px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <AiOutlineBars />
        </div>
        <div>Tất Cả Danh Mục</div>
      </div>

      {ListCategory.slice(0, visibleCount).map((category) => (
        <div key={category.id}>{category.name}</div>
      ))}

      {visibleCount < ListCategory.length && (
        <ButtonComponent onClick={handleShowMore} name="Xem Thêm" />
      )}

      {/* Khoảng giá */}

      {/* xóa lọc */}
      <div style={{ marginTop: "20px" }}>
        <ButtonComponent name="Xóa tất cả" />
      </div>
    </div>
  );
};

export default CategoryListComponent;
