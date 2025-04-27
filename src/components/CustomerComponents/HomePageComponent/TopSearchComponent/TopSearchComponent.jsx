import React, { useState, useEffect, useRef } from "react";
import { GrNext, GrPrevious } from "react-icons/gr";
import img from "../../../../assets/images/products/ao-demo-2.webp";
import { ImageCart } from "./style";
import { Link } from "react-router-dom";

const TopSearchComponent = () => {
  const products = [
    { id: 1, name: "Sản phẩm 1", image: img },
    { id: 2, name: "Sản phẩm 2", image: img },
    { id: 3, name: "Sản phẩm 3", image: img },
    { id: 4, name: "Sản phẩm 4", image: img },
    { id: 5, name: "Sản phẩm 5", image: img },
    { id: 6, name: "Sản phẩm 6", image: img },
    { id: 7, name: "Sản phẩm 7", image: img },
    { id: 8, name: "Sản phẩm 8", image: img },
    { id: 9, name: "Sản phẩm 9", image: img },
    { id: 10, name: "Sản phẩm 10", image: img },
  ];

  const [index, setIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(6);
  const [itemWidth, setItemWidth] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);
  const productRef = useRef();

  useEffect(() => {
    const updateValues = () => {
      const windowWidth = window.innerWidth;

      if (windowWidth < 576) {
        setVisibleItems(1);
      } else if (windowWidth < 768) {
        setVisibleItems(2);
      } else if (windowWidth < 1024) {
        setVisibleItems(4);
      } else {
        setVisibleItems(6);
      }

      if (productRef.current) {
        const width = productRef.current.offsetWidth;
        setItemWidth(width);
        setMaxIndex(Math.max(0, products.length - visibleItems));
      }
    };

    updateValues();
    window.addEventListener("resize", updateValues);
    return () => window.removeEventListener("resize", updateValues);
  }, [visibleItems, products.length]); // Added products.length to the dependency array

  const handlePrev = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const handleNext = () => {
    if (index < maxIndex) {
      setIndex(index + 1);
    }
  };

  const translateX = -(index * itemWidth);

  return (
    <div style={{ position: "relative", width: "100%" }}>
      {/* Products */}
      <div style={{ overflow: "hidden" }}>
        <div
          style={{
            display: "flex",
            transition: "transform 0.5s ease-in-out",
            transform: `translateX(${translateX}px)`,
          }}
        >
          {products.length > 0 ? (
            products.map((product, idx) => (
              <div
                key={product.id}
                ref={idx === 0 ? productRef : null} // Only assign ref to the first item
                style={{
                  flex: `0 0 calc(100% / ${visibleItems})`,
                  padding: "10px",
                  boxSizing: "border-box",
                  textAlign: "center",
                }}
              >
                <Link
                  to={`/product/${product.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <ImageCart>
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{ width: "100%" }}
                    />
                  </ImageCart>

                  <h5>{product.name}</h5>
                </Link>
              </div>
            ))
          ) : (
            <p>Không có sản phẩm để hiển thị.</p>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div
        style={{ position: "absolute", top: "50%", left: "10px", zIndex: 1 }}
      >
        <button
          onClick={handlePrev}
          style={{
            backgroundColor: "#000",
            color: "#fff",
            padding: "10px",
            border: "none",
            cursor: index === 0 ? "not-allowed" : "pointer",
            opacity: index === 0 ? 0.5 : 1,
          }}
        >
          <GrPrevious />
        </button>
      </div>

      <div
        style={{ position: "absolute", top: "50%", right: "10px", zIndex: 1 }}
      >
        <button
          onClick={handleNext}
          style={{
            backgroundColor: "#000",
            color: "#fff",
            padding: "10px",
            border: "none",
            cursor: index === maxIndex ? "not-allowed" : "pointer",
            opacity: index === maxIndex ? 0.5 : 1,
          }}
        >
          <GrNext />
        </button>
      </div>
    </div>
  );
};

export default TopSearchComponent;
