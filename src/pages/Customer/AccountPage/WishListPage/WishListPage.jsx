import { useCallback, useEffect, useState } from "react";
import AccountPage from "../AccountPage";
import { Wrapper } from "./style";
import default_img from "../../../../assets/images/default-img.avif";
import { Link } from "react-router-dom";
import { isJsonString } from "../../../../utils";
import { jwtDecode } from "jwt-decode";
import * as AuthServices from "../../../../services/shared/AuthServices";
import { IoIosClose } from "react-icons/io";
import * as UserServices from "../../../../services/customer/UserServices";
import { message, Modal } from "antd";

const imageURL = `${process.env.REACT_APP_API_URL}/avatar/`;

const WishListPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const [following, setCountFollowing] = useState("");

  const handleDecoded = () => {
    let storageData = localStorage.getItem("access_token");
    let decoded = {};
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData);
      decoded = jwtDecode(storageData);
    }
    return { decoded, storageData };
  };

  const handleGetDetailUser = useCallback(async (id, accessToken) => {
    try {
      const res = await AuthServices.getDetailUser(id, accessToken);
      const wl = res.data?.wishlist || [];
      setCountFollowing(res.data?.following);
      setWishlist(wl);
    } catch (error) {
      console.error("Lỗi khi lấy wishlist:", error);
      setWishlist([]);
    }
  }, []);

  useEffect(() => {
    const { storageData, decoded } = handleDecoded();
    if (decoded?.id) {
      handleGetDetailUser(decoded?.id, storageData);
    }
  }, [handleGetDetailUser]);

  const handleRemoveWishList = async (wishlistId) => {
    Modal.confirm({
      title: "Bạn có chắc muốn xóa shop khỏi wishlist?",
      onOk: async () => {
        try {
          let { decoded, storageData } = handleDecoded();
          let token = storageData;
          if (!token || !decoded || decoded.exp < Date.now() / 1000) {
            const refreshed = await AuthServices.refreshToken();
            token = refreshed?.access_token;
            if (token) {
              localStorage.setItem("access_token", JSON.stringify(token));
            } else {
              return message.warning("Không thể làm mới token!");
            }
          }

          await UserServices.removeWishList(token, { wishlistId });

          // Cập nhật UI sau khi xóa thành công
          setWishlist((prevWishlist) =>
            prevWishlist.filter((item) => item._id !== wishlistId)
          );

          setCountFollowing((prev) => (prev > 0 ? prev - 1 : 0));

          message.success("Shop đã xóa khỏi wishlist!");
        } catch (err) {
          console.error("Error removing wishlist:", err);
          message.warning("Xóa shop không thành công!");
        }
      },
      okText: "Xóa",
      cancelText: "Hủy",
    });
  };

  return (
    <AccountPage>
      <Wrapper>
        <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
          <div>Bạn đang theo dõi:</div>
          <div>{following} shop</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {wishlist.length > 0 ? (
            wishlist.map((shop) => (
              <div
                key={shop._id}
                style={{
                  display: "flex",
                  gap: "10px",
                  marginBottom: "15px",
                }}
              >
                <Link
                  to={`/shop/${shop.owner_id}/dashboard`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    textDecoration: "none",
                    color: "#333",
                    gap: "20px",
                    width: "400px",
                  }}
                >
                  <div>
                    <img
                      src={
                        shop.owner_img
                          ? `${imageURL}${shop.owner_img}`
                          : default_img
                      }
                      alt="Shop Avatar"
                      width={60}
                      height={60}
                      style={{ borderRadius: "50%", objectFit: "cover" }}
                    />
                  </div>

                  <div>
                    <strong>{shop.shop_name}</strong>
                  </div>
                </Link>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "25px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleRemoveWishList(shop._id)}
                >
                  <IoIosClose />
                </div>
              </div>
            ))
          ) : (
            <div>Không có shop nào trong wishlist.</div>
          )}
        </div>
      </Wrapper>
    </AccountPage>
  );
};

export default WishListPage;
