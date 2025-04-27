import React from "react";
import { ContainerSearchInput, ModalSearch } from "./style";

const SearchInputComponent = () => {
  return (
    <>
      <ContainerSearchInput>
        <div style={{ width: "98%", padding: "0px 10px" }}>
          <input
            style={{
              border: "none",
              outline: "none",
              height: "30px",
              width: "100%",
            }}
            type="text"
            placeholder="Tìm kiếm sản phẩm"
          />
        </div>

        <ModalSearch>
          <div>sản phẩm 1</div>
          <div>sản phẩm 1</div>
          <div>sản phẩm 1</div>
          <div>sản phẩm 1</div>
        </ModalSearch>

        {/* module option */}
      </ContainerSearchInput>
    </>
  );
};

export default SearchInputComponent;
