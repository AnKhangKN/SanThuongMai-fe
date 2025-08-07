import React, { useEffect, useState } from "react";
import * as ProductServices from "../../../services/shared/ProductServices";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const imageURL = `${process.env.REACT_APP_API_URL}/products-img/`;

// Responsive columns based on screen width
const getVisibleItems = (width) => {
  if (width >= 1200) return 6;
  if (width >= 992) return 4;
  if (width >= 768) return 3;
  if (width >= 576) return 2;
  return 1;
};

// Styled Components
const SuggestContainer = styled.div`
  padding: 16px;
  position: relative;
`;

const SliderWrapper = styled.div`
  overflow: hidden;
  position: relative;
`;

const SliderTrack = styled.div`
  display: flex;
  transition: transform 0.5s ease;
`;

const ProductCard = styled.div`
  flex: 0 0 auto;
  width: ${({ visibleItems }) => `calc((100% / ${visibleItems}) - 12px)`};
  /* margin-right: 12px; */
  padding: 10px 5px;

  border: 1px solid #ddd;
  border-radius: 8px;
  text-align: center;
  height: 100%;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  img {
    max-height: 150px;
    object-fit: cover;
    margin-bottom: 8px;
    border-radius: 6px;
  }

  h4 {
    font-size: 1rem;
    margin-bottom: 8px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  p {
    color: #e53935;
    font-weight: bold;
  }
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: white;
  border: none;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  z-index: 2;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 50%;

  &:hover {
    background-color: #eee;
  }

  ${({ direction }) => (direction === "left" ? `left: 0` : `right: 0`)};
`;

const SuggestProduct = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(
    getVisibleItems(window.innerWidth)
  );

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await ProductServices.getSuggestProduct(id);
        setProducts(res.data);
        setStartIndex(0);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [id]);

  // Handle screen resize for responsive layout
  useEffect(() => {
    const handleResize = () => {
      setVisibleItems(getVisibleItems(window.innerWidth));
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNext = () => {
    if (startIndex < products.length - visibleItems) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  return (
    <SuggestContainer className="container">
      <h3 className="mb-4">Gợi ý sản phẩm liên quan</h3>

      <SliderWrapper>
        {startIndex > 0 && (
          <NavButton direction="left" onClick={handlePrev}>
            ‹
          </NavButton>
        )}
        {startIndex + visibleItems < products.length && (
          <NavButton direction="right" onClick={handleNext}>
            ›
          </NavButton>
        )}

        <SliderTrack
          style={{
            transform: `translateX(-${startIndex * (100 / visibleItems)}%)`,
          }}
        >
          {products.map((product, index) => (
            <ProductCard
              key={product._id}
              visibleItems={visibleItems}
              style={{
                marginRight:
                  index === startIndex + visibleItems - 1 ||
                  index === products.length - 1
                    ? "0px"
                    : "12px",
              }}
            >
              <img
                src={`${imageURL}${product.image}`}
                alt={product.productName}
                className="img-fluid"
              />
              <h4>{product.productName}</h4>
              <p>{product.finalPrice.toLocaleString()}₫</p>
            </ProductCard>
          ))}
        </SliderTrack>
      </SliderWrapper>
    </SuggestContainer>
  );
};

export default SuggestProduct;
