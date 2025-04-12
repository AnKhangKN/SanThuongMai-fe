import React from "react";

const SearchInputComponent = () => {
  return (
    <>
      <div style={{ width: "100%", padding: "0px 10px" }}>
        <input
          style={{ border: "none", outline: "none", height: "30px" }}
          type="text"
          placeholder="Tìm kiếm sản phẩm"
        />
      </div>
    </>
  );
};

export default SearchInputComponent;
