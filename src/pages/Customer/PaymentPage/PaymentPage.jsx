import React, { useEffect, useState } from "react";
import { Container, Wrapper } from "./style";
import ButtonComponent from "../../../components/CustomerComponents/ButtonComponent/ButtonComponent";
import { FaMapMarkerAlt, FaPlus } from "react-icons/fa";
import { Button, Col, Flex, Input, message, Modal, Row } from "antd";
import imgTest from "../../../assets/images/Logo_Trang.jpg";
import { isJsonString } from "../../../utils";
import { jwtDecode } from "jwt-decode";
import * as AuthServices from "../../../services/shared/AuthServices";
import * as OrderServices from "../../../services/customer/OrderServices";
import { useDispatch, useSelector } from "react-redux";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { resetCheckout } from "../../../redux/slices/checkoutSlice";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import TextArea from "antd/es/input/TextArea";

const imageURL = `${process.env.REACT_APP_API_URL}/products-img/`;

const PaymentPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState();
  const [orderNote, setOrderNote] = useState("");
  const [newAddress, setNewAddress] = useState({
    phone: "",
    address: "",
    city: "",
  });

  const navigate = useNavigate();
  const products = useSelector((state) => state.checkout.products);

  console.log(products);
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const decodeToken = () => {
    const storageToken = localStorage.getItem("access_token");
    if (storageToken && isJsonString(storageToken)) {
      const token = JSON.parse(storageToken);
      const decoded = jwtDecode(token);
      return { decoded, token };
    }
    return { decoded: null, token: null };
  };

  const handleConfirmOrder = async () => {
    if (!selectedAddressId) {
      message.warning("Hãy thêm địa chỉ!.");
      return;
    }

    const selectedAddress = addresses.find(
      (addr) => addr._id === selectedAddressId
    );

    if (!selectedAddress) {
      message.error("Selected address not found!");
      return;
    }

    const shippingInfo = {
      phone: selectedAddress.phone,
      address: selectedAddress.address,
      city: selectedAddress.city,
    };

    const paymentMethod = selectedMethod;

    if (!paymentMethod) {
      message.info("Hãy chọn phương thức thanh toán!");
      return;
    }

    if (!products) {
      message.warning("Hãy thêm sản phẩm để thanh toán!");
      navigate("/cart");
      return;
    }

    try {
      let { decoded, token } = decodeToken();
      if (!token || (decoded && decoded.exp < Date.now() / 1000)) {
        const refreshed = await AuthServices.refreshToken();
        token = refreshed?.access_token;
        localStorage.setItem("access_token", JSON.stringify(token));
      }

      const totalBill = totalAmount + 30000;

      await OrderServices.addPayment(
        token,
        shippingInfo,
        products,
        totalBill,
        paymentMethod,
        orderNote,
        user.email
      );

      dispatch(resetCheckout());

      message.success("Đặt hàng thành công!");

      setOrderNote("");
    } catch (err) {
      console.error("Error confirming order:", err);
      message.warning("Hãy thêm sản phẩm để tạo đơn hàng!");
    }
  };

  const fetchAllAddress = async () => {
    try {
      let { decoded, token } = decodeToken();
      if (!token || (decoded && decoded.exp < Date.now() / 1000)) {
        const refreshed = await AuthServices.refreshToken();
        token = refreshed?.access_token;
        localStorage.setItem("access_token", JSON.stringify(token));
      }

      const response = await OrderServices.getAllAddress(token);
      const data = response?.data || [];

      const items = data.map((item) => ({
        ...item,
        key: item._id || item.id,
        quantity: item.quantity || 1,
      }));

      setAddresses(items);
      setSelectedAddressId(items[0]?._id || null); // chọn địa chỉ đầu tiên
    } catch (err) {
      console.error("Error fetching addresses:", err);
    }
  };

  useEffect(() => {
    fetchAllAddress();
  }, []);

  const showModal = async () => {
    setIsModalOpen(true);
    setIsAddingAddress(false);
    // Gọi lại danh sách từ server
    await fetchAllAddress();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setNewAddress({ phone: "", address: "", city: "" });
    setIsAddingAddress(false);
  };

  const handleAddNewAddressClick = () => {
    setIsAddingAddress(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      // Kiểm tra số điện thoại ngay khi người dùng nhập
      const phoneRegex = /^[0-9]*$/;
      if (!phoneRegex.test(value)) {
        message.warning("Số điện thoại chỉ được chứa số!");
        return;
      }
    }

    setNewAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveAddress = async () => {
    if (!newAddress.phone || !newAddress.address || !newAddress.city) {
      message.error("Hãy chọn đủ thông tin!.");
      return;
    }

    // Kiểm tra định dạng số điện thoại (10-11 chữ số)
    const phoneRegex = /^[0-9]{10,11}$/;
    if (!phoneRegex.test(newAddress.phone)) {
      message.warning("Hãy kiểm tra lại số điện thoại của bạn!");
      return;
    }

    try {
      let { decoded, token } = decodeToken();
      let accessToken = token;

      if (!accessToken || decoded?.exp * 1000 < Date.now()) {
        const res = await AuthServices.refreshToken();
        if (!res?.access_token) {
          message.error("Unable to refresh session!");
          return;
        }
        accessToken = res.access_token;
        localStorage.setItem("access_token", JSON.stringify(accessToken));
      }

      const payload = {
        shipping_address: {
          phone: newAddress.phone,
          address: newAddress.address,
          city: newAddress.city,
        },
      };

      const res = await OrderServices.addAddress(accessToken, payload);
      if (!res || res.status !== "SUCCESS") {
        message.error(res?.message || "Failed to add address!");
        return;
      }

      message.success("Thêm địa chỉ giao hàng thành công!");

      await fetchAllAddress();

      handleCancel();
    } catch (error) {
      console.error("Error saving address:", error);
      message.error("Something went wrong while saving the address.");
    }
  };

  const handleChooseMethod = (method) => {
    setSelectedMethod(method);
  };

  const totalAmount = products.reduce(
    (sum, product) => sum + product.finalPrice * product.quantity,
    0
  );

  const totalQuantity = products.reduce(
    (sum, product) => sum + product.quantity,
    0
  );

  const handleRemoveAddress = async () => {
    const selectedAddress = addresses.find(
      (addr) => addr._id === selectedAddressId
    );

    if (!selectedAddress) {
      return message.warning("Địa chỉ không tồn tại!");
    }

    const shippingInfo = {
      phone: selectedAddress.phone,
      address: selectedAddress.address,
      city: selectedAddress.city,
    };

    try {
      let { decoded, token } = decodeToken();
      if (!token || !decoded || decoded.exp < Date.now() / 1000) {
        const refreshed = await AuthServices.refreshToken();
        token = refreshed?.access_token;
        if (token) {
          localStorage.setItem("access_token", token); // Lưu lại token mới
        } else {
          return message.warning("Không thể làm mới token!");
        }
      }

      await OrderServices.removeShippingAddress(token, shippingInfo);
      message.success("Địa chỉ đã xóa!");

      handleCancel();
    } catch (err) {
      console.error("Error removing address:", err);
      message.warning("Xóa địa chỉ không thành công!");
    }
  };

  console.log(products);

  return (
    <Wrapper>
      <Container>
        {/* Address Section */}
        <div
          style={{
            backgroundColor: "#fff",
            color: "#ee4d2d",
            marginTop: "10px",
            padding: "30px 20px",
          }}
        >
          <div>
            <FaMapMarkerAlt /> Địa chỉ giao hàng
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                color: "#000",
              }}
            >
              {addresses
                .filter((addr) => addr._id === selectedAddressId)
                .map((addr) => (
                  <div key={addr._id}>
                    <div>{addr.phone}</div>
                    <div>
                      {addr.address}, {addr.city}
                    </div>
                  </div>
                ))}
            </div>
            <div
              onClick={showModal}
              style={{ color: "#3377ff", cursor: "pointer" }}
            >
              Thay đổi
            </div>
          </div>

          {/* Address Modal */}
          <Modal
            open={isModalOpen}
            onCancel={handleCancel}
            footer={null}
            centered
            zIndex={3000}
          >
            <div
              style={{ lineHeight: "60px", borderBottom: "2px solid #f5f5f5" }}
            >
              My Address
            </div>

            {!isAddingAddress ? (
              <>
                {addresses.length > 0 ? (
                  addresses.map((addr) => (
                    <div
                      key={addr._id}
                      style={{
                        padding: "20px 0px",
                        gap: "10px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <input
                        type="radio"
                        name="address"
                        checked={addr._id === selectedAddressId}
                        onChange={() => setSelectedAddressId(addr._id)}
                      />
                      <div style={{ width: "100px" }}>{addr.phone}</div>
                      <div
                        style={{
                          maxWidth: "200px",
                          width: "200px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {addr.address}, {addr.city}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          alignItems: "center",
                          width: "110px",
                        }}
                      >
                        <div
                          style={{
                            width: "20px",
                            height: "20px",
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "center",
                          }}
                          onClick={handleRemoveAddress}
                        >
                          <IoMdClose />
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{ padding: "20px 0", color: "#888" }}>
                    No addresses available
                  </div>
                )}
                <div
                  onClick={handleAddNewAddressClick}
                  style={{
                    padding: "10px 20px",
                    border: "1px solid #333",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "20px 0px",
                    gap: "20px",
                    cursor: "pointer",
                  }}
                >
                  <FaPlus /> Add New Address
                </div>
              </>
            ) : (
              <>
                <div style={{ padding: "20px 0px" }}>
                  <Input
                    placeholder="Phone"
                    name="phone"
                    value={newAddress.phone}
                    onChange={handleInputChange}
                    style={{ marginBottom: "10px" }}
                  />
                  <Input
                    placeholder="Address"
                    name="address"
                    value={newAddress.address}
                    onChange={handleInputChange}
                    style={{ marginBottom: "10px" }}
                  />
                  <Input
                    placeholder="City"
                    name="city"
                    value={newAddress.city}
                    onChange={handleInputChange}
                    style={{ marginBottom: "10px" }}
                  />
                </div>
                <div style={{ textAlign: "right", marginTop: "20px" }}>
                  <Button
                    onClick={handleCancel}
                    style={{ marginRight: "10px" }}
                  >
                    Cancel
                  </Button>
                  <Button type="primary" onClick={handleSaveAddress}>
                    Save
                  </Button>
                </div>
              </>
            )}
          </Modal>
        </div>

        {/* Product Section */}
        <div
          style={{
            backgroundColor: "#fff",
            marginTop: "10px",
            padding: "30px 20px",
          }}
        >
          <Row>
            <Col span={12}>Sản phẩm</Col>
            <Col span={4} style={{ textAlign: "end" }}>
              Giá
            </Col>
            <Col span={3} style={{ textAlign: "end" }}>
              Số lượng
            </Col>
            <Col span={5} style={{ textAlign: "end" }}>
              Tổng tiền
            </Col>
          </Row>
          {products.map((product, index) => (
            <Row
              key={index}
              style={{ padding: "30px 0px", borderBottom: "2px solid #f5f5f5" }}
            >
              <Col
                span={12}
                style={{ display: "flex", gap: "10px", alignItems: "center" }}
              >
                <div style={{ width: "40px", height: "40px" }}>
                  <img
                    style={{ width: "100%", objectFit: "cover" }}
                    src={`${imageURL}${product.productImage}` || imgTest} // dùng product.image nếu có
                    alt={product.productName}
                  />
                </div>

                <div>
                  <div>{product.productName}</div>
                  <div style={{ display: "flex", gap: "20px" }}>
                    {(product.attributes || []).map((attribute, idx) => (
                      <div key={idx}>
                        {attribute.name}: {attribute.value}
                      </div>
                    ))}
                  </div>
                </div>
              </Col>
              <Col span={4} style={{ textAlign: "end" }}>
                <del>{product.price.toLocaleString()}</del>
                <div>{product.finalPrice.toLocaleString()}</div>
              </Col>
              <Col span={3} style={{ textAlign: "end" }}>
                <div>{product.quantity}</div>
              </Col>
              <Col span={5} style={{ textAlign: "end" }}>
                <div>
                  {(product.finalPrice * product.quantity).toLocaleString()}
                </div>
              </Col>
            </Row>
          ))}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "50px",
              backgroundColor: "#fafdff",
              padding: "30px",
              borderTop: "0.5px dashed #c6e8ff",
              borderBottom: "0.5px dashed #c6e8ff",
            }}
          >
            <div style={{ width: "60%" }}>
              <TextArea
                rows={4}
                value={orderNote}
                onChange={(e) => setOrderNote(e.target.value)}
                placeholder="Lời nhắn cho người bán (giới hạn 500 kí tự)"
                maxLength={500}
              />
            </div>

            <div
              style={{
                fontWeight: "bold",
              }}
            >
              Tổng số tiền ({totalQuantity} sản phẩm): ₫
              {totalAmount.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Payment Section */}
        <div
          style={{
            backgroundColor: "#fff",
            marginTop: "10px",
            padding: "30px 20px",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "20px",
              alignItems: "center",
              paddingBottom: "20px",
            }}
          >
            <div>Phương thức thanh toán</div>
            <div
              onClick={() => handleChooseMethod("cod")}
              style={{
                padding: "10px",
                border:
                  selectedMethod === "cod"
                    ? "1px solid #194a7a"
                    : "1px solid #ddd",
                color: selectedMethod === "cod" ? "#194a7a" : "#333",
                cursor: "pointer",
              }}
            >
              Thanh toán khi nhận hàng
            </div>
            <div
              onClick={() => handleChooseMethod("credit_card")}
              style={{
                padding: "10px",
                border:
                  selectedMethod === "credit_card"
                    ? "1px solid #194a7a"
                    : "1px solid #ddd",
                color: selectedMethod === "credit_card" ? "#194a7a" : "#333",
                cursor: "pointer",
              }}
            >
              PayPal
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div></div>
            <div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ width: "150px", textAlign: "start" }}>
                  Tổng tiền hàng:
                </div>
                <div style={{ width: "200px", textAlign: "end" }}>
                  {totalAmount.toLocaleString()}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ width: "150px", textAlign: "start" }}>
                  Phí vận chuyển:
                </div>
                <div style={{ width: "200px", textAlign: "end" }}>đ30,000</div>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ width: "150px", textAlign: "start" }}>
                  Tổng thanh toán:
                </div>
                <div style={{ width: "200px", textAlign: "end" }}>
                  {(totalAmount + 30000).toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <div
              style={{
                width: "350px",
                margin: "20px 0px",
              }}
            >
              {selectedMethod === "credit_card" ? (
                <PayPalScriptProvider
                  options={{
                    "client-id": process.env.REACT_APP_CLIENT_ID,
                  }}
                >
                  <PayPalButtons
                    createOrder={(data, actions) => {
                      if (!selectedAddressId) {
                        message.warning("Hãy thêm địa chỉ!");
                        return;
                      }

                      // Giả lập số dư trong PayPal Sandbox (5,000 USD)
                      const simulatedBalance = 100000000000;
                      const totalPayment = totalAmount + 30000;

                      // Kiểm tra nếu số dư giả lập nhỏ hơn số tiền cần thanh toán
                      if (totalPayment > simulatedBalance) {
                        message.error("Số dư PayPal không đủ để thanh toán!");
                        return;
                      }

                      if (totalAmount === 0) {
                        message.warning("Hãy thêm sản phẩm để tạo đơn hàng!");
                        return;
                      }

                      return actions.order.create({
                        purchase_units: [
                          {
                            amount: {
                              value: (totalAmount + 30000).toString(),
                            },
                          },
                        ],
                      });
                    }}
                    onApprove={async (data, actions) => {
                      const details = await actions.order.capture();

                      const selectedAddress = addresses.find(
                        (addr) => addr._id === selectedAddressId
                      );

                      const shippingInfo = {
                        phone: selectedAddress.phone,
                        address: selectedAddress.address,
                        city: selectedAddress.city,
                      };

                      const paymentMethod = selectedMethod;

                      try {
                        let { decoded, token } = decodeToken();

                        if (
                          !token ||
                          (decoded && decoded.exp < Date.now() / 1000)
                        ) {
                          const refreshed = await AuthServices.refreshToken();
                          token = refreshed?.access_token;
                          localStorage.setItem(
                            "access_token",
                            JSON.stringify(token)
                          );
                        }

                        const totalBill = totalAmount + 30000;

                        await OrderServices.addPayment(
                          token,
                          shippingInfo,
                          products,
                          totalBill,
                          paymentMethod
                        );

                        message.success("Đặt hàng thành công!");
                      } catch (err) {
                        console.error("Lỗi xác nhận đơn hàng:", err);
                        message.error("Xác nhận đơn hàng thất bại!");
                        return;
                      }

                      message.success("Thanh toán thành công qua PayPal!");
                    }}
                    onError={(err) => {
                      console.error("PayPal Error:", err);
                      if (err?.details?.[0]?.issue === "PAYER_CANNOT_PAY") {
                        console.log("Số dư PayPal không đủ để thanh toán!");
                      } else {
                        console.log(
                          "Lỗi trong quá trình thanh toán bằng PayPal!"
                        );
                      }
                    }}
                  />
                </PayPalScriptProvider>
              ) : (
                <ButtonComponent
                  width="100%"
                  height="45px"
                  fontSize="18px"
                  name="Đặt hàng"
                  type="primary"
                  disabled={!selectedMethod}
                  onClick={handleConfirmOrder}
                />
              )}
            </div>
          </div>
        </div>
      </Container>
    </Wrapper>
  );
};

export default PaymentPage;
