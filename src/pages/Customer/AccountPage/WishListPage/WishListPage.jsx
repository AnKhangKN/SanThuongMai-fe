import { useState } from "react";
import AccountPage from "../AccountPage";
import { Wrapper } from "./style";
import default_img from "../../../../assets/images/default-img.avif";
import { Link } from "react-router-dom";
import { IoIosClose } from "react-icons/io";
import * as UserServices from "../../../../services/customer/UserServices";
import { message, Modal } from "antd";
import * as ValidateToken from "../../../../utils/tokenUtils";
import { useDispatch, useSelector } from "react-redux";
import { removeWishShop } from "../../../../redux/slices/userSlice";

const imageURL = `${process.env.REACT_APP_API_URL}/avatar/`;

const WishListPage = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleRemoveWishList = async (shopId) => {
    Modal.confirm({
      title: "Bạn có chắc muốn xóa shop khỏi wishlist?",
      onOk: async () => {
        try {
          const accessToken = await ValidateToken.getValidAccessToken();

          await UserServices.removeWishList(accessToken, { shopId });
          dispatch(removeWishShop(shopId));

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
          <div>{user.wishShops.length} shop</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {user.wishShops.length > 0 ? (
            user.wishShops.map((shop) => (
              <div
                key={shop._id}
                style={{
                  display: "flex",
                  gap: "10px",
                  marginBottom: "15px",
                }}
              >
                <Link
                  to={`/shop/${shop.shopId}/dashboard`}
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
                        shop.images ? `${imageURL}${shop.images}` : default_img
                      }
                      alt="Shop Avatar"
                      width={60}
                      height={60}
                      style={{ borderRadius: "50%", objectFit: "cover" }}
                    />
                  </div>

                  <div>
                    <strong>{shop.shopName}</strong>
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
                  onClick={() => handleRemoveWishList(shop.shopId)}
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
