import { Col, Row, Tooltip, Pagination } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import logo from "../../../assets/images/Logo_Den.jpg";
import { FaMinus, FaPlus } from "react-icons/fa";
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

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]); // Track selected items
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const decodeToken = () => {
    let storageToken = localStorage.getItem("access_token");
    if (storageToken && isJsonString(storageToken)) {
      const token = JSON.parse(storageToken);
      const decoded = jwtDecode(token);
      return { decoded, token };
    }
    return { decoded: null, token: null };
  };

  const fetchCartItems = useCallback(async () => {
    try {
      let { decoded, token } = decodeToken();

      if (!token || (decoded && decoded.exp < Date.now() / 1000)) {
        const refreshed = await AuthServices.refreshToken();
        token = refreshed?.access_token;
        localStorage.setItem("access_token", JSON.stringify(token));
      }

      const response = await CartServices.getAllItem(token);
      const data = response?.data[0]?.items || [];

      const items = data.map((item) => ({
        ...item,
        key: item._id || item.id,
        quantity: item.quantity || 1,
      }));

      setCartItems(items);

      const cartData = {
        products: items.map((item) => ({
          product_id: item.product_id,
          product_name: item.product_name,
          product_img: item.product_img || "",
          price: item.price,
          quantity: item.quantity,
          size: item.size,
          color: item.color,
        })),
        total_item: items.length,
      };

      dispatch(updateCart(cartData));
    } catch (err) {
      console.error("Lỗi khi lấy giỏ hàng:", err);
    }
  }, []);

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  const handleMoreItem = async (itemKey) => {
    try {
      let { decoded, token } = decodeToken();

      if (!token || (decoded && decoded.exp < Date.now() / 1000)) {
        const refreshed = await AuthServices.refreshToken();
        token = refreshed?.access_token;
        localStorage.setItem("access_token", JSON.stringify(token));
      }

      const itemToUpdate = cartItems.find((item) => item.key === itemKey);
      if (!itemToUpdate) return;

      const newQuantity = itemToUpdate.quantity + 1;

      await CartServices.updateQuantity(token, {
        detailCartId: itemToUpdate._id,
        size: itemToUpdate.size,
        color: itemToUpdate.color,
        quantity: newQuantity,
      });

      const updatedItems = cartItems.map((item) =>
        item.key === itemKey ? { ...item, quantity: newQuantity } : item
      );

      setCartItems(updatedItems);
    } catch (err) {
      console.error("Lỗi khi tăng số lượng:", err);
    }
  };

  const handleReduceItem = async (itemKey) => {
    try {
      let { decoded, token } = decodeToken();

      if (!token || (decoded && decoded.exp < Date.now() / 1000)) {
        const refreshed = await AuthServices.refreshToken();
        token = refreshed?.access_token;
        localStorage.setItem("access_token", JSON.stringify(token));
      }

      const itemToUpdate = cartItems.find((item) => item.key === itemKey);
      if (!itemToUpdate || itemToUpdate.quantity <= 1) return;

      const newQuantity = itemToUpdate.quantity - 1;

      await CartServices.updateQuantity(token, {
        detailCartId: itemToUpdate._id,
        size: itemToUpdate.size,
        color: itemToUpdate.color,
        quantity: newQuantity,
      });

      const updatedItems = cartItems.map((item) =>
        item.key === itemKey ? { ...item, quantity: newQuantity } : item
      );

      setCartItems(updatedItems);
    } catch (err) {
      console.error("Lỗi khi giảm số lượng:", err);
    }
  };

  const handleDeleteItem = async (itemKey) => {
    try {
      let { decoded, token } = decodeToken();

      if (!token || (decoded && decoded.exp < Date.now() / 1000)) {
        const refreshed = await AuthServices.refreshToken();
        token = refreshed?.access_token;
        localStorage.setItem("access_token", JSON.stringify(token));
      }

      const itemToDelete = cartItems.find((item) => item.key === itemKey);
      if (!itemToDelete) return;

      await CartServices.deleteCartItem(token, {
        detailCartId: itemToDelete._id,
      });

      const updatedItems = cartItems.filter((item) => item.key !== itemKey);
      setCartItems(updatedItems);
    } catch (err) {
      console.error("Lỗi khi xóa sản phẩm khỏi giỏ hàng:", err);
    }
  };

  const handleItemSelection = (itemKey) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(itemKey)
        ? prevSelectedItems.filter((key) => key !== itemKey)
        : [...prevSelectedItems, itemKey]
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

  const totalItems = selectedItems.length;

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div style={{ marginTop: 120, backgroundColor: "#f5f5f5" }}>
      <div style={{ width: 1200, margin: "auto" }}>
        <div style={{ height: 20 }} />

        {/* Header row */}
        <div
          style={{ padding: "10px 30px", marginBottom: 10, background: "#fff" }}
        >
          <Row>
            <Col span={2}>
              <input
                type="checkbox"
                checked={selectedItems.length === cartItems.length}
                onChange={() => {
                  if (selectedItems.length === cartItems.length) {
                    setSelectedItems([]);
                  } else {
                    setSelectedItems(cartItems.map((item) => item.key));
                  }
                }}
              />
            </Col>
            <Col span={10}>Sản phẩm</Col>
            <Col span={4}>Đơn giá</Col>
            <Col span={3}>Số lượng</Col>
            <Col span={3}>Số tiền</Col>
            <Col span={2}>Thao tác</Col>
          </Row>
        </div>

        {/* Item list */}
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
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.key)}
                  onChange={() => handleItemSelection(item.key)}
                />
              </Col>
              <Col span={10}>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <div style={{ width: 80 }}>
                    <img
                      src={item.product_img}
                      alt="product"
                      style={{ width: "100%" }}
                    />
                  </div>
                  <div>
                    <Tooltip title={item.product_name}>
                      <div
                        style={{
                          maxWidth: 400,
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                        }}
                      ></div>
                    </Tooltip>
                    <div style={{ fontSize: 12, color: "gray" }}>
                      <div style={{ fontSize: "15px", color: "#333" }}>
                        {item.product_name}
                      </div>
                      <div style={{ display: "flex", gap: "20px" }}>
                        <div>{item.color} </div>
                        <div>{item.size}</div>
                      </div>

                      <div>{item.shop_name}</div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col span={4}>₫{item.price}</Col>
              <Col span={3}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <button
                    style={{ border: "1px solid #ddd", height: 30, width: 30 }}
                    onClick={() => handleReduceItem(item.key)}
                  >
                    <FaMinus />
                  </button>

                  <input
                    style={{
                      width: 30,
                      textAlign: "center",
                      border: "none",
                      height: 30,
                    }}
                    type="text"
                    value={item.quantity}
                    readOnly
                  />

                  <button
                    style={{ border: "1px solid #ddd", height: 30, width: 30 }}
                    onClick={() => handleMoreItem(item.key)}
                  >
                    <FaPlus />
                  </button>
                </div>
              </Col>
              <Col span={3}>
                ₫{(item.price * item.quantity).toLocaleString()}
              </Col>
              <Col span={2}>
                <div
                  onClick={() => handleDeleteItem(item.key)}
                  style={{ color: "red", cursor: "pointer" }}
                >
                  Xóa
                </div>
              </Col>
            </Row>
          </div>
        ))}

        {/* Pagination */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            paddingBottom: 20,
            paddingRight: 35,
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
            <span>Shopee Voucher</span>
          </div>
          <div style={{ fontSize: 14 }}>Chọn hoặc nhập mã</div>
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
              Tổng cộng ({totalItems} sản phẩm):
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

export default CartPage;
