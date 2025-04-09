import React from "react";
import SearchInputComponent from "../SearchInputComponent/SearchInputComponent";
import SearchButtonComponent from "../SearchButtonComponent/SearchButtonComponent";

const SearchComponent = () => {
  return (
    <>
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
        <SearchInputComponent />
        <SearchButtonComponent />
      </div>
    </>
  );
};

export default SearchComponent;
