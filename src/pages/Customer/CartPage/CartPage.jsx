import { Col, Row, Pagination, message, Checkbox } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import ButtonComponent from "../../../components/CustomerComponents/ButtonComponent/ButtonComponent";
import { BsTicketPerforated } from "react-icons/bs";
import SuggestComponent from "../../../components/CustomerComponents/CartPageComponent/SuggestComponent/SuggestComponent";
import { isJsonString } from "../../../utils";
import { jwtDecode } from "jwt-decode";
import * as AuthServices from "../../../services/shared/AuthServices";
import * as CartServices from "../../../services/customer/CartServices";
import { useDispatch } from "react-redux";
import { updateCart } from "../../../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { setCheckoutInfo } from "../../../redux/slices/checkoutSlice";
import { LuPlus } from "react-icons/lu";
import { LuMinus } from "react-icons/lu";
import * as ValidateToken from "../../../utils/tokenUtils";

const imageURL = `${process.env.REACT_APP_API_URL}/products-img/`;

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const fetchCartItems = useCallback(async () => {
    try {
      const token = await ValidateToken.getValidAccessToken();

      const response = await CartServices.getAllItem(token);
      const data = response?.data[0]?.productItems || [];

      const items = data.map((item) => {
        const attrKey =
          item.attributes
            ?.map((attr) => `${attr.name}-${attr.value}`)
            .join("_") || "no-attr";
        return {
          ...item,
          key: `${item.productId}-${attrKey}`,
          quantity: item.quantity || 1,
        };
      });

      setCartItems(items);

      const cartData = {
        products: items.map((item) => ({
          product_id: item.productId,
          product_name: item.productName,
          product_img: item.productImage || "",
          price: item.price,
          quantity: item.quantity,
          attributes: item.attributes || [],
        })),
        total_item: items.length,
      };

      dispatch(updateCart(cartData));
    } catch (err) {
      console.error("Lỗi khi lấy giỏ hàng:", err);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  const handleItemSelection = (itemKey) => {
    setSelectedItems((prev) =>
      prev.includes(itemKey)
        ? prev.filter((key) => key !== itemKey)
        : [...prev, itemKey]
    );
  };

  const startIndex = (currentPage - 1) * pageSize;
  const displayedItems = cartItems.slice(startIndex, startIndex + pageSize);

  const totalPrice = selectedItems.reduce((acc, itemKey) => {
    const selectedItem = cartItems.find((item) => item.key === itemKey);
    return selectedItem
      ? acc + selectedItem.price * selectedItem.quantity
      : acc;
  }, 0);

  const handleCheckout = () => {
    const selectedProducts = cartItems.filter((item) =>
      selectedItems.includes(item.key)
    );

    if (selectedProducts.length === 0) {
      message.info("Vui lòng chọn sản phẩm để thanh toán!");
      return;
    }

    const checkoutData = {
      products: selectedProducts.map((item) => ({
        product_id: item.productId,
        product_name: item.productName,
        product_img: item.productImage || "",
        price: item.price,
        finalPrice: item.finalPrice || item.price,
        quantity: item.quantity,
        attributes: item.attributes || [],
        owner_id: item.shopId,
        cartItem_id: item._id,
      })),
    };

    dispatch(setCheckoutInfo(checkoutData));
    navigate("/checkout");
  };

  return (
    <div style={{ marginTop: 120, backgroundColor: "#f5f5f5" }}>
      <div style={{ width: 1200, margin: "auto" }}>
        <div style={{ height: 20 }} />

        {/* Header */}
        <div
          style={{ padding: "10px 30px", marginBottom: 10, background: "#fff" }}
        >
          <Row>
            <Col span={2}>
              <Checkbox
                checked={selectedItems.length === cartItems.length}
                onChange={() =>
                  setSelectedItems(
                    selectedItems.length === cartItems.length
                      ? []
                      : cartItems.map((item) => item.key)
                  )
                }
              />
            </Col>
            <Col span={10}>Sản phẩm</Col>
            <Col span={4}>Đơn giá</Col>
            <Col span={3}>Số lượng</Col>
            <Col span={3}>Số tiền</Col>
            <Col span={2}>Thao tác</Col>
          </Row>
        </div>

        {/* Danh sách sản phẩm */}
        {displayedItems.map((item) => (
          <div
            key={item.key}
            style={{
              padding: "10px 30px",
              margin: "2px 0",
              backgroundColor: "#fff",
            }}
          >
            <Row align="middle">
              <Col span={2}>
                <Checkbox
                  checked={selectedItems.includes(item.key)}
                  onChange={() => handleItemSelection(item.key)}
                />
              </Col>
              <Col span={10}>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <div style={{ width: 80 }}>
                    <img
                      src={`${imageURL}${item.productImage}`}
                      alt=""
                      style={{ width: "100%" }}
                    />
                  </div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 500 }}>
                      {item.productName}
                    </div>
                    <div style={{ fontSize: 12, color: "gray" }}>
                      {(item.attributes || []).map((attr) => (
                        <span key={attr.name} style={{ marginRight: 10 }}>
                          {attr.name}: {attr.value}
                        </span>
                      ))}
                    </div>
                    <div style={{ fontSize: 12 }}>{item.shopName}</div>
                  </div>
                </div>
              </Col>
              <Col span={4}>
                <div>
                  <div style={{ textDecoration: "line-through", gap: 5 }}>
                    ₫ {item.price.toLocaleString()}
                  </div>
                  <div
                    style={{
                      gap: 5,
                    }}
                  >
                    đ {item.finalPrice.toLocaleString()}
                  </div>
                </div>
              </Col>
              <Col span={3}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <button style={buttonStyle}>
                    <LuMinus />
                  </button>
                  <input style={inputStyle} value={item.quantity} readOnly />
                  <button style={buttonStyle}>
                    <LuPlus />
                  </button>
                </div>
              </Col>
              <Col span={3}>
                ₫{(item.finalPrice * item.quantity).toLocaleString()}
              </Col>
              <Col span={2}>
                <div style={{ color: "red", cursor: "pointer" }}>Xóa</div>
              </Col>
            </Row>
          </div>
        ))}

        {/* Pagination */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "20px 55px 20px 0px",
            backgroundColor: "#fff",
          }}
        >
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={cartItems.length}
            onChange={(page) => setCurrentPage(page)}
          />
        </div>

        {/* Voucher */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: 20,
            backgroundColor: "#fff",
            padding: 20,
            gap: 180,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontSize: 18,
            }}
          >
            <BsTicketPerforated />
            <span>Voucher</span>
          </div>
          <div
            onClick={() => message.warning("Bạn chưa có mã giảm giá nào!")}
            style={{ fontSize: 14, cursor: "pointer" }}
          >
            Chọn hoặc nhập mã
          </div>
        </div>

        {/* Tổng cộng */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 2,
            padding: 20,
            backgroundColor: "#fff",
          }}
        >
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ fontSize: 20 }}>
              Tổng cộng ({selectedItems.length} sản phẩm):
            </div>
            <div style={{ fontSize: 18, color: "red" }}>
              ₫{totalPrice.toLocaleString()}
            </div>
          </div>
          <div style={{ width: 160 }}>
            <ButtonComponent name="Mua hàng" onClick={handleCheckout} />
          </div>
        </div>

        {/* Gợi ý sản phẩm */}
        <div
          style={{
            margin: "50px 0px 20px 0px",
            fontSize: 18,
            textTransform: "uppercase",
            color: "#7a7a7a",
          }}
        >
          Có thể bạn cũng thích
        </div>
        <SuggestComponent />
      </div>
    </div>
  );
};

// Style riêng
const buttonStyle = {
  border: "1px solid #ddd",
  height: 30,
  width: 30,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const inputStyle = {
  width: 30,
  textAlign: "center",
  outline: "none",
  border: "none",
  height: 30,
};

export default CartPage;
