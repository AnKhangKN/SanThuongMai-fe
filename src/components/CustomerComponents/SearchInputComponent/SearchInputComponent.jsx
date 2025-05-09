import React from "react";

const SearchInputComponent = ({ onChange, onKeyDown }) => {
  return (
    <>
      <input
        style={{
          border: "none",
          outline: "none",
          height: "30px",
          padding: "0px 20px",
          width: "100%",
        }}
        onChange={onChange}
        onKeyDown={onKeyDown}
        type="text"
        placeholder="Tìm kiếm sản phẩm"
      />
    </>
  );
};

export default SearchInputComponent;
