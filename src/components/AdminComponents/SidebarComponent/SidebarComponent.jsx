import React from "react";
import { Wrapper, WrapperTitle } from "./style";

import Logo_Trang from "../../../assets/images/Logo_Trang.jpg";

const SidebarComponent = () => {
  return (
    <Wrapper>
      <WrapperTitle>
        <div>
          <div style={{ width: "50px" }}>
            <img
              style={{ width: "100%", height: "100%" }}
              src={Logo_Trang}
              alt=""
              srcset=""
            />
          </div>
        </div>

        <div>
          <p style={{ padding: 0, margin: 0 }}>HKN</p>
        </div>
      </WrapperTitle>
    </Wrapper>
  );
};

export default SidebarComponent;
