import { useEffect, useState } from "react";
import { DetailBox } from "./style";
import { Avatar, Col, message, Row, Space } from "antd";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { BsCartPlus } from "react-icons/bs";
import { FiMinus, FiPlus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import * as ProductServices from "../../../services/shared/ProductServices";
import * as CartServices from "../../../services/customer/CartServices";
import * as AuthServices from "../../../services/shared/AuthServices";
import { isJsonString } from "../../../utils";
import { jwtDecode } from "jwt-decode";
import { updateCart } from "../../../redux/slices/cartSlice";
import { AiOutlineShop } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import { IoIosChatboxes } from "react-icons/io";

const imageURL = `${process.env.REACT_APP_API_URL}/products-img/`;

const ProductDetailPage = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const id = useParams();
  const location = useLocation();

  const dispatch = useDispatch();

  const currentCart = useSelector((state) => state.cart);

  const [startIndex, setStartIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [productDetail, setProductDetail] = useState({});
  const [quantity, setQuantity] = useState(0);
  const [detailColor, setDetailColor] = useState(null);
  const [detailSize, setDetailSize] = useState(null);
  const [selectedProductDetail, setSelectedProductDetail] = useState(null);
  const [listImages, setListImages] = useState([]);
  const [detailShop, setDetailShop] = useState();
  const [countProductShop, setCountProductShop] = useState("");

  const maxVisible = 5;

  useEffect(() => {
    const fetchDetailProduct = async () => {
      try {
        const res = await ProductServices.getDetailProduct(id);

        const newData = res?.data?.data?.product;
        const shopData = res?.data?.data?.shop;
        const countProductsOwner = res?.data?.data?.countProductsOwner;

        setCountProductShop(countProductsOwner);
        setDetailShop(shopData);
        setProductDetail(newData);
        setListImages(newData.images);
        setCurrentImage(newData.images[0]); // Đảm bảo ảnh đầu tiên được chọn
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error);
      }
    };

    fetchDetailProduct();
  }, [id]);

  const handleChooseColor = (color) => {
    setDetailColor(color);
    const selected = productDetail.details?.find(
      (detail) => detail.color === color && detail.size === detailSize
    );
    setSelectedProductDetail(selected);
  };

  const handleChooseSize = (size) => {
    setDetailSize(size);
    const selected = productDetail.details?.find(
      (detail) => detail.size === size && detail.color === detailColor
    );
    setSelectedProductDetail(selected);
  };

  const handleNext = () => {
    if (startIndex + maxVisible < listImages.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const handleImageClick = (image) => {
    setCurrentImage(image);
    setSelectedImage(image);
  };

  const handleDecoded = () => {
    let storageData = localStorage.getItem("access_token");
    let decoded = {};
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData);
      decoded = jwtDecode(storageData);
    }
    return { decoded, storageData };
  };

  const handleAddToCart = async () => {
    if (!user?.id) {
      message.info("Hãy đăng nhập trước!");
      navigate("/login", { state: location?.pathname });
      return;
    }

    if (
      quantity > selectedProductDetail?.quantity ||
      !selectedProductDetail?.quantity
    ) {
      message.error("Số lượng sản phẩm trong kho không đủ!");
      setQuantity(0);
      return;
    }

    try {
      let { storageData, decoded } = handleDecoded();
      let accessToken = storageData;

      // Làm mới token nếu hết hạn
      if (decoded?.exp * 1000 < Date.now()) {
        const res = await AuthServices.refreshToken();
        if (!res?.access_token) {
          message.error("Không thể làm mới phiên đăng nhập!");
          return;
        }
        accessToken = res.access_token;
        localStorage.setItem("access_token", JSON.stringify(accessToken));
      }

      const payload = {
        itemData: {
          size: selectedProductDetail.size,
          color: selectedProductDetail.color,
          price: selectedProductDetail.price,
        },
        quantity,
        owner_id: productDetail.user_id, // Chủ sản phẩm
        product_id_module: id.id, // id của sản phẩm
      };

      if (payload.quantity <= 0) {
        message.warning("Hãy thêm số lượng bạn cần!");
        return;
      }

      const res = await CartServices.addToCart(
        accessToken,
        payload,
        payload.product_id_module // product_id đúng
      );

      if (!res || res.status !== "OK") {
        message.error(res?.message || "Không thể thêm vào giỏ hàng!");
        return;
      }

      const newItem = {
        product_id: payload.product_id_module,
        product_name: productDetail.product_name,
        product_img: currentImage,
        price: selectedProductDetail.price,
        quantity,
        size: selectedProductDetail.size,
        color: selectedProductDetail.color,
      };

      dispatch(
        updateCart({
          products: [...currentCart.products, newItem],
          total_item: currentCart.total_item + 1,
        })
      );

      message.success("Đã thêm vào giỏ hàng!");
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
      message.error(error?.message || "Không thể thêm sản phẩm vào giỏ hàng!");
    }
  };

  const handleReduce = () => {
    setQuantity((prev) => Math.max(0, prev - 1));
  };

  const handleIncrease = () => {
    if (
      !selectedProductDetail?.quantity ||
      selectedProductDetail?.quantity <= 0
    ) {
      message.error("Sản phẩm này đã hết hàng!");
      return;
    }

    setQuantity((prev) => {
      if (prev >= selectedProductDetail?.quantity) {
        return prev;
      }
      return prev + 1;
    });
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);

    if (isNaN(value) || value <= 0) {
      setQuantity(1); // hoặc có thể cho về rỗng, tùy yêu cầu UX
      return;
    }

    if (value > selectedProductDetail?.quantity) {
      message.error("Vượt quá số lượng sản phẩm trong kho!");
      setQuantity(selectedProductDetail.quantity);
      return;
    }

    setQuantity(value);
  };

  return (
    <div style={{ backgroundColor: "#f5f5f5" }}>
      <div style={{ width: "1200px", margin: "auto", marginTop: "120px" }}>
        <DetailBox>
          <Row>
            <Col span={10}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  paddingRight: 20,
                }}
              >
                <img
                  style={{
                    width: "100%",
                    height: "450px",
                    objectFit: "contain",
                  }}
                  src={`${imageURL}${currentImage}`}
                  alt="Sản phẩm"
                />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingRight: 20,
                  marginTop: 10,
                }}
              >
                <button onClick={handlePrev} disabled={startIndex === 0}>
                  <GrFormPrevious />
                </button>
                {listImages
                  .slice(startIndex, startIndex + maxVisible)
                  .map((item, index) => (
                    <div
                      key={index}
                      style={{
                        width: 82,
                        margin: "0 5px",
                        border:
                          selectedImage === item ? "2px solid #d0011b" : "none",
                      }}
                    >
                      <img
                        src={`${imageURL}${item}`}
                        alt=""
                        style={{
                          width: "100%",
                          height: "82px",
                          objectFit: "contain",
                        }}
                        onClick={() => handleImageClick(item)}
                      />
                    </div>
                  ))}
                <button
                  onClick={handleNext}
                  disabled={startIndex + maxVisible >= listImages.length}
                >
                  <GrFormNext />
                </button>
              </div>
            </Col>
            <Col span={14}>
              <h4>{productDetail?.product_name}</h4>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>{productDetail?.sold_count} Lượt mua</div>
                <div>Tố cáo</div>
              </div>
              <div style={{ backgroundColor: "#f5f5f5", padding: 20 }}>
                <div style={{ display: "flex" }}>
                  <div>đ</div>
                  <p style={{ fontSize: 30, margin: 0 }}>
                    {selectedProductDetail ? selectedProductDetail.price : "0"}
                  </p>
                </div>
              </div>
              <div style={{ marginTop: 20 }}>Giá vận chuyển</div>

              {/* Lọc */}
              {productDetail?.details?.some((d) => d.color) ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginTop: 20,
                  }}
                >
                  <div style={{ width: 100 }}>Màu sắc</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                    {[
                      ...new Set(productDetail?.details?.map((d) => d.color)),
                    ].map((color) => (
                      <button
                        key={color}
                        onClick={() => handleChooseColor(color)}
                        style={{
                          padding: 10,
                          border:
                            detailColor === color
                              ? "2px solid #d0011b"
                              : "1px solid #ccc",
                          cursor: "pointer",
                        }}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div></div>
              )}

              {productDetail?.details?.some((d) => d.size) ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginTop: 20,
                  }}
                >
                  <div style={{ width: 100 }}>Kích thước</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                    {[
                      ...new Set(productDetail?.details?.map((d) => d.size)),
                    ].map((size) => (
                      <button
                        key={size}
                        onClick={() => handleChooseSize(size)}
                        style={{
                          padding: 10,
                          border:
                            detailSize === size
                              ? "2px solid #d0011b"
                              : "1px solid #ccc",
                          cursor: "pointer",
                        }}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div></div>
              )}

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                  marginTop: 20,
                }}
              >
                <div>
                  {selectedProductDetail
                    ? `Số lượng còn lại: ${selectedProductDetail?.quantity}`
                    : "Số lượng còn lại: 0"}
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <button onClick={handleReduce}>
                    <FiMinus />
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={handleQuantityChange}
                    style={{ width: 50, textAlign: "center" }}
                  />
                  <button onClick={handleIncrease}>
                    <FiPlus />
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  style={{
                    background: "#d0011b",
                    color: "white",
                    padding: 10,
                    border: "none",
                  }}
                >
                  <BsCartPlus /> Thêm vào giỏ hàng
                </button>
              </div>
            </Col>
          </Row>
        </DetailBox>

        <DetailBox>
          <Row>
            <Col span={8} style={{ display: "flex", alignItems: "center" }}>
              <div>
                <Space direction="vertical" size={16}>
                  <Space wrap size={16}>
                    <Avatar size={64} icon={<FaUserAlt />} />
                  </Space>
                </Space>
              </div>
              <div>
                <div style={{ margin: "0px 0px 5px 10px" }}>
                  {detailShop?.name}
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <button
                    style={{
                      height: "32px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "3px",
                      padding: "0px 15px",
                      margin: "0px 10px 17px 10px",
                      fontSize: "14px",
                      border: "1px solid rgb(248, 74, 47)",
                      color: "#d0011b",
                      background: "rgba(208, 1, 27, .08)",
                      outline: "none",
                    }}
                  >
                    <div>
                      <IoIosChatboxes />
                    </div>
                    <div>Chat ngay</div>
                  </button>
                  <button
                    style={{
                      height: "32px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "3px",
                      padding: "0px 15px",
                      margin: "0px 10px 17px 0px",
                      fontSize: "14px",
                      border: "1px solid #555555",
                      color: "#555555",
                      background: "#FFFFFF",
                      outline: "none",
                    }}
                  >
                    <div>
                      <AiOutlineShop />
                    </div>
                    <div onClick={() => navigate("/shop/:id_owner")}>
                      Xem shop
                    </div>
                  </button>
                </div>
              </div>
            </Col>
            <Col
              span={16}
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <div style={{ margin: "0px 12px 0px 0px" }}>
                <div style={{ display: "flex", gap: "40px" }}>
                  <div style={{ color: "#00000066" }}>Đánh giá</div>
                  <div style={{ color: "#d0011b", margin: "0px 0px 0px 20px" }}>
                    573
                  </div>
                </div>
                <div style={{ display: "flex", gap: "40px" }}>
                  <div style={{ color: "#00000066" }}>Sản phẩm</div>
                  <div style={{ color: "#d0011b", margin: "0px 0px 0px 20px" }}>
                    {countProductShop}
                  </div>
                </div>
              </div>
              <div
                style={{
                  margin: "0px 0px 0px 10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "52px",
                    margin: "0px 0px 0px 60px",
                  }}
                >
                  <div style={{ color: "#00000066" }}>Tham gia </div>
                  <div style={{ color: "#d0011b", margin: "0px 0px 0px 20px" }}>
                    12 tháng
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "40px",
                    margin: "0px 0px 0px 60px",
                  }}
                >
                  <div style={{ color: "#00000066" }}>Người theo dõi</div>
                  <div style={{ color: "#d0011b", margin: "0px 0px 0px 20px" }}>
                    3432
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </DetailBox>
      </div>
    </div>
  );
};

export default ProductDetailPage;
