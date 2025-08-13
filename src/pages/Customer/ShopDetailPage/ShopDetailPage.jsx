import { Col, message, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import * as ShopServices from "../../../services/customer/ShopServices";
import { isJsonString } from "../../../utils";
import { jwtDecode } from "jwt-decode";
import * as UserServices from "../../../services/customer/UserServices";
import { useDispatch, useSelector } from "react-redux";
import { FiPlus } from "react-icons/fi";
import { updateUser } from "../../../redux/slices/userSlice";
import * as ValidateToken from "../../../utils/tokenUtils";
import { MdCheck } from "react-icons/md";

const imageURL = `${process.env.REACT_APP_API_URL}/avatar/`;

const ShopDetailPage = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [shopDetail, setShopDetail] = useState(null);
  const [products, setProducts] = useState(null);

  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  // Hàm kiểm tra tab đang chọn
  const isActive = (path) => location.pathname.includes(path);
  console.log(shopDetail);

  const handleAddWishList = async () => {
    try {
      const accessToken = await ValidateToken.getValidAccessToken();

      const shopId = shopDetail?._id;
      const shopName = shopDetail?.shopName;
      const images = shopDetail?.shopAvatar;

      const response = await UserServices.addWishlist(accessToken, {
        shopId,
        shopName,
        images,
      });

      if (!response) {
        message.error("Lỗi thêm vào yêu thích");
      }
      message.success("Thêm vào danh sách yêu thích thành công!");

      // Đảm bảo response.data.wishlist là mảng
      const updatedWishlist = response?.data || [];

      // Cập nhật Redux với wishlist mới
      dispatch(updateUser({ wishShops: updatedWishlist }));
    } catch (err) {
      console.error("Lỗi khi lấy giỏ hàng:", err);
    }
  };

  const fetchDetailShop = async (id) => {
    try {
      const data = await ShopServices.getDetailShop(id);

      const shop = data?.data?.data?.shop;

      const products = data?.data?.data?.products;

      setProducts(products);

      if (shop) {
        setShopDetail(shop);
      }
    } catch (err) {
      console.error("Error fetching shop details:", err);
      message.error(
        err?.response?.data?.message || "Failed to fetch shop details."
      );
    }
  };

  useEffect(() => {
    fetchDetailShop(id);
  }, [id]);

  return (
    <>
      <div style={{ marginTop: "120px", fontSize: "14px" }}>
        <div
          style={{
            maxWidth: "1200px",
            margin: "auto",
            padding: "20px 0px",
          }}
        >
          <Row gutter={20}>
            <Col span={12}>
              <div
                style={{
                  padding: "20px",
                  backgroundColor: "#333",
                  height: "135px",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div style={{ marginRight: "15px" }}>
                  {shopDetail?.shopAvatar ? (
                    <img
                      src={`${imageURL}${shopDetail.shopAvatar}`}
                      alt="Ảnh shop"
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "cover",
                        borderRadius: "50%",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "80px",
                        height: "80px",
                        background: "#666",
                        borderRadius: "50%",
                      }}
                    ></div>
                  )}
                </div>
                <div>
                  <h3>{shopDetail?.shopName || "Tên shop"}</h3>
                  <div
                    style={{ display: "flex", gap: "10px", marginTop: "10px" }}
                  >
                    <button
                      style={{
                        padding: "5px 10px",
                        background: user.wishShops.some(
                          (wishShop) => wishShop.shopId === id
                        )
                          ? "#aaa" // Màu xám nếu đã theo dõi
                          : "#194a7a",
                        border: "none",
                        color: "#fff",
                        cursor: user.wishShops.some(
                          (wishShop) => wishShop.shopId === id
                        )
                          ? "not-allowed"
                          : "pointer",
                      }}
                      onClick={() => {
                        if (
                          !user.wishShops.some(
                            (wishShop) => wishShop.shopId === id
                          )
                        ) {
                          handleAddWishList();
                        }
                      }}
                      disabled={user.wishShops.some(
                        (wishShop) => wishShop.shopId === id
                      )}
                    >
                      {user.wishShops.some(
                        (wishShop) => wishShop.shopId === id
                      ) ? (
                        <>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "5px",
                            }}
                          >
                            <MdCheck />
                            <div>Đã theo dỗi</div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "5px",
                            }}
                          >
                            <FiPlus />
                            <div>Theo dõi</div>
                          </div>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </Col>
            <Col span={12}>
              <div style={{ padding: "20px" }}>
                <div>
                  <strong>Sản phẩm:</strong> {products?.length || 0}
                </div>
                <div>
                  <strong>Người theo dõi:</strong> {shopDetail?.followers || 0}
                </div>
                <div>
                  <strong>Ngày tham gia:</strong>{" "}
                  {shopDetail?.createdAt
                    ? new Date(shopDetail?.createdAt).toLocaleString("vi-VN", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })
                    : "N/A"}
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>

      <div style={{ backgroundColor: "#fff", padding: "10px 0" }}>
        <div
          style={{
            width: "1200px",
            margin: "auto",
            display: "flex",
            justifyContent: "space-between",
            borderBottom: "2px solid #f3f3f3",
          }}
        >
          {["dashboard", "products", "chat"].map((tab) => (
            <div
              key={tab}
              style={{
                fontSize: "14px",
                cursor: "pointer",
                paddingBottom: "10px",
                position: "relative",
                fontWeight: isActive(`/${tab}`) ? "bold" : "normal",
              }}
              onClick={() =>
                navigate(`/shop/${shopDetail.shopName}/${tab}/${id}`)
              }
            >
              {tab === "dashboard"
                ? "Tổng quan"
                : tab === "products"
                ? "Tất cả sản phẩm"
                : "Chat với shop"}
              {isActive(`/${tab}`) && (
                <div
                  style={{
                    position: "absolute",
                    bottom: "0",
                    left: "0",
                    right: "0",
                    height: "3px",
                    backgroundColor: "#194a7a",
                    transition: "width 0.3s",
                  }}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div style={{ backgroundColor: "#f3f3f3" }}>
        <div style={{ maxWidth: "1200px", margin: "auto", padding: "20px 0" }}>
          {/* {children} */}
          {children}
        </div>
      </div>
    </>
  );
};

export default ShopDetailPage;
