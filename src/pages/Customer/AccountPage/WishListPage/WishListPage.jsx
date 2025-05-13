import React, { useCallback, useEffect, useState } from "react";
import AccountPage from "../AccountPage";
import { Wrapper } from "./style";
import { useSelector } from "react-redux";
import default_img from "../../../../assets/images/default-img.avif";
import { Link } from "react-router-dom";
import { isJsonString } from "../../../../utils";
import { jwtDecode } from "jwt-decode";
import * as AuthServices from "../../../../services/shared/AuthServices";
import { IoIosClose } from "react-icons/io";

const imageURL = `${process.env.REACT_APP_API_URL}/avatar/`;

const WishListPage = () => {
  const [wishlist, setWishlist] = useState({});
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
      console.log(res.data?.wishlist);
      const wl = res.data?.wishlist || [];
      setCountFollowing(res.data?.following);
      setWishlist({ wishlist: wl });
    } catch (error) {
      console.error("Lỗi khi lấy wishlist:", error);
      setWishlist({ wishlist: [] });
    }
  }, []);

  useEffect(() => {
    const { storageData, decoded } = handleDecoded();
    if (decoded?.id) {
      handleGetDetailUser(decoded?.id, storageData);
    }
  }, [handleGetDetailUser]);

  return (
    <AccountPage>
      <Wrapper>
        <div style={{ display: "flex", gap: "10px" }}>
          <div>Bạn đang theo dỗi:</div>
          <div>{following} shop</div>
        </div>

        <div style={{ display: "flex", flexFlow: "column" }}>
          {wishlist?.wishlist?.length > 0 ? (
            wishlist.wishlist.map((wishlist) => (
              <div
                key={wishlist._id}
                style={{
                  display: "flex",
                  gap: "10px",
                  marginBottom: "15px",
                }}
              >
                <Link
                  to={`/shop/${wishlist.owner_id}/dashboard`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    textDecoration: "none",
                    color: "#333",
                    gap: "30px",
                    width: "500px",
                  }}
                >
                  <div>
                    <img
                      src={
                        wishlist.owner_img
                          ? `${imageURL}${wishlist.owner_img}`
                          : default_img
                      }
                      alt="Shop Avatar"
                      width={60}
                      height={60}
                      style={{ borderRadius: "50%", objectFit: "cover" }}
                    />
                  </div>

                  <div>
                    <strong>{wishlist.shop_name}</strong>
                  </div>
                </Link>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "25px",
                  }}
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
