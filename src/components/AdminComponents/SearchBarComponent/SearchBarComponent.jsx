import React from "react";
import SearchBarInput from "../SearchBarInput/SearchBarInput";
import SearchBarButton from "../SearchBarButton/SearchBarButton";
import { WrapperSearchBar } from "./style";

const SearchBarComponent = () => {
  return (
    <>
      <WrapperSearchBar>
        <SearchBarInput />
        <SearchBarButton />
      </WrapperSearchBar>
    </>
  );
};

export default SearchBarComponent;
