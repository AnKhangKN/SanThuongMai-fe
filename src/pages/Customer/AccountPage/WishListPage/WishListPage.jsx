import React from "react";
import AccountPage from "../AccountPage";
import { Wrapper } from "./style";
import { useSelector } from "react-redux";
import default_img from "../../../../assets/images/default-img.avif";
import { Link } from "react-router-dom";

const imageURL = `${process.env.REACT_APP_API_URL}/avatar/`;

const WishListPage = () => {
  const user = useSelector((state) => state.user);

  return (
    <AccountPage>
      <Wrapper>
        {user?.wishlist?.length > 0 ? (
          user.wishlist.map((wishlist) => (
            <div
              key={wishlist._id}
              style={{ display: "flex", gap: "10px", marginBottom: "15px" }}
            >
              <Link to={`/shop/${wishlist.owner_id}/dashboard`}>
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
            </div>
          ))
        ) : (
          <div>Không có shop nào trong wishlist.</div>
        )}
      </Wrapper>
    </AccountPage>
  );
};

export default WishListPage;
