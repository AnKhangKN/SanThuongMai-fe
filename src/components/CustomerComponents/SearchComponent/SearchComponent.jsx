import React, { useState } from "react";
import SearchInputComponent from "../SearchInputComponent/SearchInputComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

const SearchComponent = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleGetSearchProduct = async () => {
    if (keyword.trim()) {
      // Điều hướng tới trang tìm kiếm với tên sản phẩm
      navigate(`/search/${encodeURIComponent(keyword.trim())}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleGetSearchProduct();
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: "3px",
        borderRadius: "2px",
        justifyContent: "space-between",
      }}
    >
      <SearchInputComponent
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={handleKeyDown} // Lắng nghe sự kiện Enter
      />
      <ButtonComponent
        Icon={HiMiniMagnifyingGlass}
        onClick={handleGetSearchProduct}
      />
    </div>
  );
};

export default SearchComponent;
