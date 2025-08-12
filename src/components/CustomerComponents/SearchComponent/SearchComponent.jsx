import React, { useEffect, useState } from "react";
import SearchInputComponent from "../SearchInputComponent/SearchInputComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { SearchResultItem } from "./style";
import useSearchLogger from "../../../hook/useSearchLogger";
import * as ProductServices from "../../../services/shared/ProductServices";

const SearchComponent = () => {
  const [keyword, setKeyword] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const { logSearch } = useSearchLogger();
  const [keywordList, setKeywordList] = useState([]);

  const fetchSearchKeyWord = async () => {
    try {
      const res = await ProductServices.getSuggestSearchKeyWord();

      const keywordsFromAPI = res.keywords || [];

      if (keywordsFromAPI.length === 0) {
        // ✅ Gợi ý mặc định khi không có dữ liệu từ API
        setKeywordList([
          { keyword: "Áo" },
          { keyword: "Giày thể thao" },
          { keyword: "Điện thoại" },
          { keyword: "Giày" },
        ]);
      } else {
        setKeywordList(keywordsFromAPI);
      }
    } catch (error) {
      console.log(error);

      // ✅ Nếu API lỗi, vẫn hiển thị gợi ý mặc định
      setKeywordList([
        { keyword: "Áo" },
        { keyword: "Giày thể thao" },
        { keyword: "Điện thoại" },
        { keyword: "Giày" },
      ]);
    }
  };

  useEffect(() => {
    fetchSearchKeyWord();
  }, []);

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
      ? keywordList
      : keywordList.filter((item) =>
          item.keyword.toLowerCase().includes(keyword.toLowerCase())
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
                setKeyword(item.keyword);
                handleSearch(item.keyword);
              }}
              style={{
                margin: "0px 20px",
                fontWeight: index < 5 ? "bold" : "normal",
                color: "#333",
                fontSize: index < 5 ? "1.4rem" : "1.3rem",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                paddingLeft: index < 5 ? "0px" : "25px",
              }}
            >
              {index < 5 && <span>🔥</span>}
              {item.keyword}
            </SearchResultItem>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
