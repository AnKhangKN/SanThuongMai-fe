import { useEffect, useState, useMemo } from "react";
import { DetailBox } from "./style";
import { Col, message, Row } from "antd";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { BsCartPlus, BsShopWindow } from "react-icons/bs";
import { FiMinus, FiPlus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import * as ProductServices from "../../../services/shared/ProductServices";
import * as CartServices from "../../../services/customer/CartServices";
import { updateCart } from "../../../redux/slices/cartSlice";
import * as ValidToken from "../../../utils/tokenUtils";
import useSendViewAfterDelay from "../../../hook/useSendViewAfterDelay";
import { IoMdChatbubbles } from "react-icons/io";

const imageURL = `${process.env.REACT_APP_API_URL}/products-img/`;
const avatarUrl = `${process.env.REACT_APP_API_URL}/avatar/`;

const ProductDetailPage = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(0);
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [selectedProductDetail, setSelectedProductDetail] = useState(null);
  const [category, setCategory] = useState([]);
  const [productDetail, setProductDetail] = useState(null);
  const [productImages, setProductImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [startIndex, setStartIndex] = useState(0);
  const [shopDetail, setShopDetail] = useState({});

  const maxVisible = 5;

  useSendViewAfterDelay(id); // Lấy thông tin sản phẩm người dùng đã xem.

  useEffect(() => {
    const fetchDetailProduct = async () => {
      try {
        const res = await ProductServices.getDetailProduct({ id });

        const images = res.product.images || [];
        setCategory(res.category);
        setProductDetail(res.product);
        setShopDetail(res.shop);
        setProductImages(images);
        setSelectedImage(images[0] || null);
        setStartIndex(0);
        setQuantity(0);
        setSelectedAttributes({});
        setSelectedProductDetail(null);
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error);
        message.error("Không thể tải sản phẩm.");
      }
    };

    fetchDetailProduct();
  }, [id]);

  const allAttributeNames = useMemo(() => {
    return [
      ...new Set(
        productDetail?.priceOptions?.flatMap((opt) =>
          opt.attributes.map((a) => a.name)
        ) || []
      ),
    ];
  }, [productDetail]);

  const getValidOptions = (attributes, exceptAttrName = null) => {
    if (!productDetail?.priceOptions) return [];
    return productDetail.priceOptions.filter((option) => {
      return Object.entries(attributes).every(([name, value]) => {
        if (name === exceptAttrName) return true;
        return (
          option.attributes.find((attr) => attr.name === name)?.value === value
        );
      });
    });
  };

  const handleSelectAttribute = (attrName, attrValue) => {
    const updated = { ...selectedAttributes, [attrName]: attrValue };
    const attrIndex = allAttributeNames.indexOf(attrName);
    // Reset các thuộc tính sau attrName
    allAttributeNames.slice(attrIndex + 1).forEach((name) => {
      delete updated[name];
    });
    setSelectedAttributes(updated);
    const matched = productDetail?.priceOptions?.find((option) =>
      option.attributes.every((attr) => updated[attr.name] === attr.value)
    );
    setSelectedProductDetail(matched || null);
  };

  const getValuesForAttribute = (attrName) => {
    const validOptions = getValidOptions(selectedAttributes, attrName);
    const values = new Set();
    validOptions.forEach((opt) => {
      opt.attributes.forEach((attr) => {
        if (attr.name === attrName) values.add(attr.value);
      });
    });
    return Array.from(values);
  };

  const handleAddToCart = async () => {
    if (!user?.id) {
      message.info("Hãy đăng nhập trước!");
      navigate("/login", { state: location?.pathname });
      return;
    }

    if (!selectedProductDetail) {
      message.warning("Hãy chọn đầy đủ thuộc tính sản phẩm!");
      return;
    }

    if (
      isNaN(quantity) ||
      quantity <= 0 ||
      !Number.isInteger(Number(quantity))
    ) {
      message.warning("Vui lòng chọn số lượng hợp lệ!");
      return;
    }

    if (quantity > selectedProductDetail?.stock) {
      message.error("Số lượng sản phẩm trong kho không đủ!");
      return;
    }

    try {
      const accessToken = await ValidToken.getValidAccessToken();

      const payload = {
        productId: id,
        productName: productDetail.productName,
        productImage: productImages?.[0],
        attributes: Object.entries(selectedAttributes).map(([name, value]) => ({
          name,
          value,
        })),
        price: selectedProductDetail.price,
        salePrice: selectedProductDetail.salePrice,
        finalPrice: selectedProductDetail.finalPrice,
        categoryId: productDetail.categoryId,
        quantity,
        shopId: productDetail.shopId,
        shopName: shopDetail?.shopName,
      };

      const res = await CartServices.addToCart(accessToken, payload);

      if (!res || res.status !== "OK") {
        message.error(res?.message || "Không thể thêm vào giỏ hàng!");
        return;
      }

      const cartRes = await CartServices.getAllItem(accessToken);
      const userCart = cartRes.data?.[0];

      if (userCart) {
        dispatch(
          updateCart({
            products: userCart.productItems || [],
            total_item: userCart.productItems?.length || 0,
          })
        );
      }

      message.success("Đã thêm vào giỏ hàng");
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error.message);
      message.error(error.message);
    }
  };

  return (
    <div style={{ backgroundColor: "#f5f5f5" }}>
      <div style={{ maxWidth: "1200px", margin: "auto", marginTop: "120px" }}>
        <DetailBox>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <img
                style={{ width: "100%", height: "450px", objectFit: "contain" }}
                src={selectedImage ? `${imageURL}${selectedImage}` : ""}
                alt="Ảnh sản phẩm"
              />
              {productImages.length > 1 && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: 10,
                  }}
                >
                  <button
                    onClick={() =>
                      setStartIndex((prev) => Math.max(0, prev - 1))
                    }
                    disabled={startIndex === 0}
                    style={{
                      border: "none",
                      background: "transparent",
                      cursor: "pointer",
                    }}
                  >
                    <GrFormPrevious size={24} />
                  </button>
                  <div style={{ display: "flex", gap: 10 }}>
                    {productImages
                      .slice(startIndex, startIndex + maxVisible)
                      .map((img, idx) => (
                        <img
                          key={idx}
                          src={`${imageURL}${img}`}
                          alt="Ảnh phụ"
                          onClick={() => setSelectedImage(img)}
                          style={{
                            width: 60,
                            height: 60,
                            border:
                              selectedImage === img
                                ? "2px solid #194a7a"
                                : "1px solid #ccc",
                            cursor: "pointer",
                            objectFit: "cover",
                          }}
                        />
                      ))}
                  </div>
                  <button
                    onClick={() =>
                      setStartIndex((prev) =>
                        Math.min(
                          Math.max(0, productImages.length - maxVisible),
                          prev + 1
                        )
                      )
                    }
                    disabled={startIndex >= productImages.length - maxVisible}
                    style={{
                      border: "none",
                      background: "transparent",
                      cursor: "pointer",
                    }}
                  >
                    <GrFormNext size={24} />
                  </button>
                </div>
              )}
            </Col>

            <Col xs={24} md={12}>
              <p style={{ fontSize: "25px" }}>{productDetail?.productName}</p>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <div>{productDetail?.soldCount || 0} Lượt mua</div>
              </div>

              <div style={{ backgroundColor: "#f5f5f5", padding: "10px 20px" }}>
                <div>
                  {/* Tính giá gốc (gồm VAT và phí nền tảng) */}
                  {selectedProductDetail ? (
                    <>
                      {(() => {
                        const { price, finalPrice } = selectedProductDetail;
                        const priceOrigin =
                          price +
                          (price * category.vat) / 100 +
                          (price * category.platformFee) / 100;

                        return (
                          <>
                            {/* Hiển thị giá gốc nếu khác finalPrice */}
                            {finalPrice !== priceOrigin && (
                              <p
                                style={{
                                  margin: 0,
                                  textDecoration: "line-through",
                                  color: "#999",
                                }}
                              >
                                {priceOrigin.toLocaleString()} đ
                              </p>
                            )}

                            {/* Hiển thị finalPrice hoặc 0 */}
                            <p style={{ fontSize: 30, margin: 0 }}>
                              {(finalPrice || 0).toLocaleString()} đ
                            </p>
                          </>
                        );
                      })()}
                    </>
                  ) : (
                    <p style={{ fontSize: 30, margin: 0 }}>0 đ</p>
                  )}
                </div>
              </div>

              {allAttributeNames.map((attrName, index) => {
                const allValues = Array.from(
                  new Set(
                    productDetail?.priceOptions?.flatMap((opt) =>
                      opt.attributes
                        .filter((a) => a.name === attrName)
                        .map((a) => a.value)
                    )
                  )
                );
                const validValues = getValuesForAttribute(attrName);
                return (
                  <div key={attrName} style={{ marginTop: 20 }}>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 10 }}
                    >
                      <div style={{ width: 100 }}>{attrName}</div>
                      <div
                        style={{ display: "flex", flexWrap: "wrap", gap: 10 }}
                      >
                        {allValues.map((val) => {
                          const isActive = selectedAttributes[attrName] === val;
                          const isAvailable =
                            index === 0 || validValues.includes(val);
                          return (
                            <button
                              key={val}
                              onClick={() =>
                                handleSelectAttribute(attrName, val)
                              }
                              disabled={!isAvailable}
                              style={{
                                padding: "8px 10px",
                                border: isActive
                                  ? "2px solid #194a7a"
                                  : "1px solid #ccc",
                                cursor: isAvailable ? "pointer" : "not-allowed",
                                opacity: isAvailable ? 1 : 0.4,
                              }}
                            >
                              {val}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}

              <div style={{ marginTop: 20 }}>
                <div
                  className="d-flex align-items-center"
                  style={{ marginBottom: 10 }}
                >
                  <div style={{ width: 108 }}>Còn lại: </div>
                  <div>{selectedProductDetail?.stock || 0}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <button
                    onClick={() => setQuantity((q) => Math.max(0, q - 1))}
                  >
                    <FiMinus />
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
                    style={{ width: 60, textAlign: "center" }}
                  />
                  <button onClick={() => setQuantity((q) => q + 1)}>
                    <FiPlus />
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                style={{
                  background: "#194a7a",
                  color: "white",
                  padding: "15px 10px",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  gap: "20px",
                  marginTop: 20,
                }}
              >
                <BsCartPlus /> <div>Thêm vào giỏ hàng</div>
              </button>
            </Col>
          </Row>
        </DetailBox>

        <DetailBox>
          {shopDetail ? (
            <>
              <Row gutter={[16, 16]}>
                <Col xs={16} md={8}>
                  <div className="d-flex align-items-center justify-content-between">
                    <div
                      className="d-flex align-items-center justify-content-center"
                      style={{
                        width: "80px",
                        height: "80px",
                        overflow: "hidden",
                        borderRadius: "50%",
                      }}
                    >
                      <img
                        className="w-100 object-fit-cover"
                        src={`${avatarUrl}${shopDetail.shopAvatar}`}
                        alt={shopDetail.shopName}
                      />
                    </div>
                    <div className="d-flex flex-column gap-4">
                      <div>{shopDetail.shopName}</div>
                      <div className="d-flex align-items-center justify-content-between gap-4">
                        <div
                          className="d-flex align-items-center gap-3"
                          style={{
                            border: "0.5px solid #333",
                            lineHeight: "34px",
                            padding: "0px 15px",
                          }}
                        >
                          <div className="d-flex align-items-center">
                            <IoMdChatbubbles />
                          </div>
                          <div>Chat ngay</div>
                        </div>
                        <div
                          className="d-flex align-items-center gap-3"
                          style={{
                            border: "0.5px solid #333",
                            lineHeight: "34px",
                            padding: "0px 15px",
                          }}
                        >
                          <div className="d-flex align-items-center">
                            <BsShopWindow />
                          </div>
                          <div
                            onClick={() =>
                              navigate(
                                `/shop/${shopDetail.shopName}/dashboard/${shopDetail._id}`
                              )
                            }
                          >
                            Xem shop
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col xs={8} md={16}>
                  col-12
                </Col>
              </Row>
            </>
          ) : (
            <>
              <div>Đang tải ...</div>
            </>
          )}
        </DetailBox>
      </div>
    </div>
  );
};

export default ProductDetailPage;
