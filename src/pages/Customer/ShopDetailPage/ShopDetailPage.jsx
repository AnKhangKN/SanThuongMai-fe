import { Col, message, Row } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import * as ShopServices from "../../../services/customer/ShopServices";
import { isJsonString } from "../../../utils";
import { jwtDecode } from "jwt-decode";
import * as AuthServices from "../../../services/shared/AuthServices";
import * as UserServices from "../../../services/customer/UserServices";
import { useDispatch, useSelector } from "react-redux";
import { FiPlus } from "react-icons/fi";
import { updateUser } from "../../../redux/slices/userSlice";
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

  const decodeToken = () => {
    let storageToken = localStorage.getItem("access_token");
    if (storageToken && isJsonString(storageToken)) {
      const token = JSON.parse(storageToken);
      const decoded = jwtDecode(token);
      return { decoded, token };
    }
    return { decoded: null, token: null };
  };

  const handleAddWishList = async () => {
    try {
      let { decoded, token } = decodeToken();

      if (!token || (decoded && decoded.exp < Date.now() / 1000)) {
        const refreshed = await AuthServices.refreshToken();
        token = refreshed?.access_token;
        localStorage.setItem("access_token", JSON.stringify(token));
      }

      const owner_id = id;
      const shop_name = shopDetail?.shop?.name;

      const response = await UserServices.addWishlist(token, {
        owner_id,
        shop_name,
      });


      if (!response) {
        message.error("Lỗi thêm vào yêu thích");
      }
      message.success("Thêm vào danh sách yêu thích thành công!");

      // Đảm bảo response.data.wishlist là mảng
      const updatedWishlist = response?.data || [];

      // Cập nhật Redux với wishlist mới
      dispatch(updateUser({ wishlist: updatedWishlist }));
    } catch (err) {
      console.error("Lỗi khi lấy giỏ hàng:", err);
    }
  };

  const fetchDetailShop = async () => {
    try {
      const data = await ShopServices.getDetailShop(id);

      const shop = data?.data?.data?.owner;

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
    fetchDetailShop();
  }, [id]);

  return (
    <>
      <div style={{ marginTop: "120px" }}>
        <div
          style={{
            width: "1200px",
            maxWidth: "100%",
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
                  {shopDetail?.images ? (
                    <img
                      src={`${imageURL}${shopDetail.images}`}
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
                  <h3>{shopDetail?.shop?.name || "Tên shop"}</h3>
                  <div
                    style={{ display: "flex", gap: "10px", marginTop: "10px" }}
                  >
                    <button
                      style={{
                        padding: "5px 10px",
                        background: user.wishlist.some(
                          (wishlist) => wishlist.owner_id === id
                        )
                          ? "#aaa" // Màu xám nếu đã theo dõi
                          : "#194a7a",
                        border: "none",
                        color: "#fff",
                        cursor: user.wishlist.some(
                          (wishlist) => wishlist.owner_id === id
                        )
                          ? "not-allowed"
                          : "pointer",
                      }}
                      onClick={() => {
                        if (
                          !user.wishlist.some(
                            (wishlist) => wishlist.owner_id === id
                          )
                        ) {
                          handleAddWishList();
                        }
                      }}
                      disabled={user.wishlist.some(
                        (wishlist) => wishlist.owner_id === id
                      )}
                    >
                      {user.wishlist.some(
                        (wishlist) => wishlist.owner_id === id
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

                    <button
                      style={{
                        padding: "5px 10px",
                        background: "#194a7a",
                        border: "none",
                        color: "#fff",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        navigate(`/shop/${id}/chat`);
                      }}
                    >
                      Chat
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
                  <strong>Người theo dõi:</strong>{" "}
                  {shopDetail?.shop?.followers || 0}
                </div>
                <div>
                  <strong>Ngày tham gia:</strong>{" "}
                  {shopDetail?.shop?.created_at
                    ? new Date(shopDetail.shop.created_at).toLocaleString(
                        "vi-VN",
                        {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                        }
                      )
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
                cursor: "pointer",
                paddingBottom: "10px",
                position: "relative",
                fontWeight: isActive(`/${tab}`) ? "bold" : "normal",
              }}
              onClick={() => navigate(`/shop/${id}/${tab}`)}
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
        <div style={{ width: "1200px", margin: "auto", padding: "20px 0" }}>
          {children}
        </div>
      </div>
    </>
  );
};

export default ShopDetailPage;
