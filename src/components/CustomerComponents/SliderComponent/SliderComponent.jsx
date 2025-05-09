import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { EachSlideEffect } from "./style";

const SliderComponent = ({ arrImages, height }) => {
  if (!arrImages || arrImages.length === 0) {
    return <div>No images to display</div>;
  }

  return (
    <Slide>
      {arrImages.map((image, index) => (
        <EachSlideEffect className="each-slide-effect" key={index}>
          <div
            style={{
              backgroundImage: `url(${image})`,
              height: height ? height : "400px",
            }}
          ></div>
        </EachSlideEffect>
      ))}
    </Slide>
  );
};

export default SliderComponent;
