import React, { useState } from "react";
import SearchInputComponent from "../SearchInputComponent/SearchInputComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { SearchResultItem } from "./style";
import useSearchLogger from "../../../hook/useSearchLogger";

const productDemoList = [
  "Áo thun nam",
  "Áo sơ mi nữ",
  "Giày thể thao",
  "Balo laptop",
  "Tai nghe Bluetooth",
  "Điện thoại iPhone",
  "Áo khoác hoodie",
  "Quần jeans nam",
  "Váy dạ hội",
  "Mũ lưỡi trai",
];

const SearchComponent = () => {
  const [keyword, setKeyword] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const { logSearch } = useSearchLogger();

  const handleSearch = async (searchText) => {
    const trimmed = searchText.trim();
    if (trimmed) {
      await logSearch(trimmed); // Gọi hook lưu keyword
      navigate(`/search/${encodeURIComponent(trimmed)}`);
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch(keyword);
    }
  };

  const handleChangeKeyword = (e) => {
    setKeyword(e.target.value);
    setShowSuggestions(true);
  };

  const filteredSuggestions =
    keyword.trim() === ""
      ? productDemoList
      : productDemoList.filter((item) =>
          item.toLowerCase().includes(keyword.toLowerCase())
        );

  return (
    <div style={{ position: "relative" }}>
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
          value={keyword}
          onChange={handleChangeKeyword}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        />
        <ButtonComponent
          Icon={HiMiniMagnifyingGlass}
          onClick={() => handleSearch(keyword)}
        />
      </div>

      {showSuggestions && filteredSuggestions.length > 0 && (
        <div
          style={{
            position: "absolute",
            backgroundColor: "#fff",
            width: "90%",
            marginTop: "10px",
            color: "#333",
            padding: "10px 0px",
            zIndex: 1000,
            border: "1px solid #ccc",
            borderRadius: "4px",
            maxHeight: "250px",
            overflowY: "auto",
          }}
        >
          {filteredSuggestions.map((item, index) => (
            <SearchResultItem
              key={index}
              onMouseDown={() => {
                setKeyword(item);
                handleSearch(item); // ✅ log khi chọn gợi ý
              }}
            >
              🔍 {item}
            </SearchResultItem>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
