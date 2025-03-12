import React from "react";
import { IconContainer, WrapperSearchBarInput } from "./style";
import { HiMagnifyingGlass } from "react-icons/hi2";

const SearchBarInput = () => {
  return (
    <>
      <WrapperSearchBarInput>
        <IconContainer>
          <HiMagnifyingGlass />
        </IconContainer>

        <input
          type="text"
          style={{
            padding: "11px",
            border: "none",
            outline: "none",
            backgroundColor: "#f0f3f8",
          }}
          placeholder="Search"
        />
      </WrapperSearchBarInput>
    </>
  );
};

export default SearchBarInput;
