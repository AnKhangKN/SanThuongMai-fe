import { Link, useParams } from "react-router-dom";
import ShopDetailPage from "../ShopDetailPage";
import { useEffect, useState, useRef } from "react";
import * as ShopServices from "../../../../services/customer/ShopServices";
import { message, Spin, Button } from "antd";
import { ImageCart } from "./style";
import { GrNext, GrPrevious } from "react-icons/gr";
import { LoadingOutlined } from "@ant-design/icons";
import banner from "../../../../assets/images/Banner/hellosagano-cach-tao-bo-banner-trang-tri-shopee-sieu-dep-01.jpg";

const imageURL = `${process.env.REACT_APP_API_URL}/products-img/`;

const DashboardShopPage = () => {
  const { id } = useParams();
  const [index, setIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(6);
  const [itemWidth, setItemWidth] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const productRef = useRef();

  const fetchAllProduct = async () => {
    setLoading(true);
    try {
      const res = await ShopServices.getDetailShop(id);
      setProducts(res?.data?.data?.product_top || []);
    } catch (error) {
      message.error("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProduct();
  }, [id]);

  useEffect(() => {
    const updateValues = () => {
      const windowWidth = window.innerWidth;

      setVisibleItems(
        windowWidth < 576
          ? 1
          : windowWidth < 768
          ? 2
          : windowWidth < 1024
          ? 4
          : 6
      );

      if (productRef.current) {
        const width = productRef.current.clientWidth;
        setItemWidth(width);
        setMaxIndex(Math.max(0, products.length - visibleItems));
      }
    };

    updateValues();
    window.addEventListener("resize", updateValues);
    return () => window.removeEventListener("resize", updateValues);
  }, [products.length, visibleItems]);

  const handlePrev = () => {
    if (index > 0) setIndex(index - 1);
  };

  const handleNext = () => {
    if (index < maxIndex) setIndex(index + 1);
  };

  const translateX = -(index * itemWidth);

  return (
    <ShopDetailPage>
      <div style={{ position: "relative", width: "100%" }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: "20px" }}>
            <Spin indicator={<LoadingOutlined spin />} size="large" />
          </div>
        ) : (
          <div style={{ overflow: "hidden" }}>
            <div
              style={{
                display: "flex",
                transition: "transform 0.5s ease-in-out",
                transform: `translateX(${translateX}px)`,
                boxSizing: "border-box",
              }}
            >
              {products.length > 0 ? (
                products.map((product, idx) => (
                  <div
                    key={product.id}
                    ref={idx === 0 ? productRef : null}
                    style={{
                      flex: `0 0 calc(100% / ${visibleItems})`,
                      padding: "10px",
                      textAlign: "center",
                      boxSizing: "border-box",
                    }}
                  >
                    <Link
                      to={`/product/${product._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <ImageCart>
                        <img
                          src={
                            product.images?.[0]
                              ? `${imageURL}${product.images[0]}`
                              : "https://www.nhathuocduochanoi.com.vn/images/default.jpg"
                          }
                          alt={product.product_name}
                          style={{
                            width: "100%",
                            height: "180px",
                            objectFit: "cover",
                            borderRadius: "8px",
                          }}
                        />
                      </ImageCart>
                      <h5 style={{ fontSize: "16px", fontWeight: "bold" }}>
                        {product.product_name}
                      </h5>
                    </Link>
                  </div>
                ))
              ) : (
                <p>Không có sản phẩm để hiển thị.</p>
              )}
            </div>
          </div>
        )}

        <Button
          style={{ position: "absolute", top: "50%", left: "10px", zIndex: 1 }}
          onClick={handlePrev}
          disabled={index === 0}
        >
          <GrPrevious />
        </Button>

        <Button
          style={{ position: "absolute", top: "50%", right: "10px", zIndex: 1 }}
          onClick={handleNext}
          disabled={index === maxIndex}
        >
          <GrNext />
        </Button>
      </div>

      <div>
        <img src={banner} style={{ width: "100%" }} alt="" srcset="" />
      </div>
    </ShopDetailPage>
  );
};

export default DashboardShopPage;
