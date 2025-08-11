import React, { useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import {
  BarModal,
  BarNav,
  CartModal,
  CartWrapper,
  IconWrapper,
  ModalContent,
  SumCart,
} from "./style";
import Logo_Xoa_Phong from "../../../assets/images/Logo_Den-removebg-preview.png";
import SearchComponent from "../SearchComponent/SearchComponent";
import { Link, useNavigate } from "react-router-dom";
import anh from "../../../assets/images/Logo_Den.jpg";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { useSelector } from "react-redux";
import { FaBars } from "react-icons/fa";

const imageURL = `${process.env.REACT_APP_API_URL}/products-img/`;

const HeaderInfoComponent = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);

  const cartItems = cart.products;
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigateView = () => {
    if (user.isAdmin) {
      navigate("/admin");
      setIsOpen(false);
    } else if (user.isVendor) {
      navigate("/vendor");
      setIsOpen(false);
    } else {
      navigate("/user/account/profile");
      setIsOpen(false);
    }
  };

  const handleNavigateVendor = () => {
    if (user.isVendor) {
      navigate("/vendor");
      setIsOpen(false);
    } else {
      navigate("/vendor/register");
      setIsOpen(false);
    }
  };
  return (
    <div
      style={{
        height: "85px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* Logo */}
      <Link
        to="/"
        style={{ display: "flex", color: "#fff", textDecoration: "none" }}
      >
        <div style={{ width: "65px" }}>
          <img
            src={Logo_Xoa_Phong}
            alt="logo"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </div>
        <div style={{ fontSize: "30px", padding: "20px 0px 0px 10px" }}>
          HKN
        </div>
      </Link>

      {/* Search + Category */}
      <div
        className="d-none d-md-block"
        style={{ width: "100%", margin: "0px 30px 0px 60px" }}
      >
        <div>
          <SearchComponent />
        </div>
      </div>
      <div className="d-md-none d-block">Tìm kiếm</div>

      {/* Cart */}
      <CartWrapper>
        <IconWrapper onClick={() => navigate("/cart")}>
          <AiOutlineShoppingCart />
          <SumCart>{cart.total_item > 99 ? "99+" : cart.total_item}</SumCart>
        </IconWrapper>

        {/* Modal Cart */}
        <CartModal>
          <div>Sản phẩm trong giỏ hàng</div>

          {/* Hiển thị tối đa 5 sản phẩm */}
          {cartItems.slice(0, 5).map((item) => (
            <div
              key={item.productId}
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "20px",
              }}
            >
              <div style={{ flex: "0 0 15%" }}>
                <div style={{ width: "40px", height: "40px" }}>
                  <img
                    style={{ width: "100%", objectFit: "cover" }}
                    src={`${imageURL}${item.productImage}` || anh}
                    alt=""
                  />
                </div>
              </div>

              <div style={{ flex: "0 0 60%" }}>
                {item.productName || "Tên sản phẩm"}
              </div>
              <div style={{ flex: "0 0 25%", textAlign: "end" }}>
                {item.finalPrice.toLocaleString()} đ
              </div>
            </div>
          ))}

          {/* Hiển thị nếu có hơn 5 sản phẩm */}
          {cartItems.length > 5 ? (
            <div style={{ marginTop: "10px", textAlign: "center" }}>
              <Link to="/cart" style={{ fontSize: "14px", color: "#007bff" }}>
                <ButtonComponent
                  name={`Xem thêm ${cartItems.length - 5} sản phẩm`}
                />
              </Link>
            </div>
          ) : (
            <div style={{ marginTop: "10px", textAlign: "center" }}>
              <Link to="/cart">
                <ButtonComponent name="Xem giỏ hàng" />
              </Link>
            </div>
          )}
        </CartModal>
      </CartWrapper>

      {/* Chi tiết */}
      <BarNav className="d-md-none d-block">
        <div
          style={{ fontSize: 26, cursor: "pointer" }}
          onClick={() => setIsOpen(true)}
        >
          <FaBars />
        </div>

        <BarModal $isOpen={isOpen}>
          <ModalContent>
            <button onClick={() => setIsOpen(false)}>X</button>

            <div style={{ color: "#333" }}>
              <div onClick={handleNavigateVendor}>Kênh bán hàng</div>
              <div onClick={() => navigate("/vendor/register")}>
                Trở thành người bán hàng
              </div>
              <div>Thông báo</div>
              <div>Hỗ trợ</div>
              {user.fullName ? (
                <>
                  <div className="d-flex align-items-center gap-2">
                    <div
                      className="d-flex align-items-center justify-content-center"
                      style={{
                        height: "24px",
                        width: "24px",
                        borderRadius: "50%",
                        overflow: "hidden", // đảm bảo ảnh không tràn ra ngoài
                      }}
                    >
                      <img
                        src={user?.img}
                        alt={user.img}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>

                    <div
                      onClick={handleNavigateView}
                      style={{ marginLeft: "5px" }}
                    >
                      {user.fullName}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <div onClick={() => navigate("/login")}>Đăng nhập</div>
                    <div onClick={() => navigate("/sign-up")}>Đăng kí</div>
                  </div>
                </>
              )}
            </div>
          </ModalContent>
        </BarModal>
      </BarNav>
    </div>
  );
};

export default HeaderInfoComponent;
