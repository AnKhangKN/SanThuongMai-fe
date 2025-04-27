import React from "react";
import SearchInputComponent from "../SearchInputComponent/SearchInputComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";

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
        <ButtonComponent Icon={HiMiniMagnifyingGlass} />
      </div>
    </>
  );
};

export default SearchComponent;
