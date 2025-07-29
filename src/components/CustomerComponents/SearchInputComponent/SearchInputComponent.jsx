import React from "react";

const SearchInputComponent = ({
  value,
  onChange,
  onKeyDown,
  onFocus,
  onBlur,
}) => {
  return (
    <input
      style={{
        border: "none",
        outline: "none",
        height: "30px",
        padding: "0px 20px",
        width: "100%",
      }}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      onBlur={onBlur}
      type="text"
      placeholder="Tìm kiếm sản phẩm"
    />
  );
};

export default SearchInputComponent;
