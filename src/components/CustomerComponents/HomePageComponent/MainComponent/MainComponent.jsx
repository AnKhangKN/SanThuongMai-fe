import React from "react";
import { Wrapper } from "./style";
import CategoryComponent from "../CategoryComponent/CategoryComponent";
import TopSearchComponent from "../TopSearchComponent/TopSearchComponent";
import SuggestComponent from "../SuggestComponent/SuggestComponent";

const MainComponent = () => {
  return (
    <>
      <div style={{ backgroundColor: "#f5f5f5" }}>
        <Wrapper>
          <div style={{ paddingTop: "20px" }}>
            <CategoryComponent />
          </div>
          <div style={{ paddingTop: "20px" }}>
            <TopSearchComponent />
          </div>
          <div style={{ paddingTop: "20px" }}>
            <SuggestComponent />
          </div>
        </Wrapper>
      </div>
    </>
  );
};

export default MainComponent;
