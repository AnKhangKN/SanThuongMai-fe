import React, { useEffect, useMemo, useState } from "react";
import { Container, Wrapper } from "./style";
import ButtonComponent from "../../../components/CustomerComponents/ButtonComponent/ButtonComponent";
import { FaMapMarkerAlt, FaPlus } from "react-icons/fa";
import { Button, Col, Flex, Input, message, Modal, Row } from "antd";
import imgTest from "../../../assets/images/Logo_Trang.jpg";
import * as OrderServices from "../../../services/customer/OrderServices";
import { useDispatch, useSelector } from "react-redux";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { resetCheckout } from "../../../redux/slices/checkoutSlice";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import TextArea from "antd/es/input/TextArea";
import * as ValidateToken from "../../../utils/tokenUtils";

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
  const vouchers = useSelector((state) => state.checkout.vouchers);

  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const selectedVouchers = useMemo(() => {
    if (!vouchers || !Array.isArray(vouchers)) return {};
    return vouchers.reduce((acc, v) => {
      if (v?._id) acc[v._id] = v;
      return acc;
    }, {});
  }, [vouchers]);

  const totalAmount = products.reduce(
    (sum, product) => sum + product.finalPrice * product.quantity,
    0
  );

  const totalQuantity = products.reduce(
    (sum, product) => sum + product.quantity,
    0
  );

  const calculateVoucherDiscountNoShip = () => {
    let discount = 0;

    Object.values(selectedVouchers).forEach((voucher) => {
      if (!voucher || typeof voucher !== "object") return;
      const { type, value, maxDiscount, category, minOrderValue } = voucher;

      if (category === "van-chuyen") return;
      if (typeof minOrderValue === "number" && totalAmount < minOrderValue)
        return;

      if (type === "percentage" && typeof value === "number") {
        const rawDiscount = (totalAmount * value) / 100;
        discount +=
          typeof maxDiscount === "number"
            ? Math.min(rawDiscount, maxDiscount)
            : rawDiscount;
      } else if (type === "fixed" && typeof value === "number") {
        discount += value;
      }
    });

    return discount;
  };

  const calculateVoucherDiscountAndShip = () => {
    let discount = 0;

    Object.values(selectedVouchers).forEach((voucher) => {
      if (!voucher || typeof voucher !== "object") return;

      const { type, value, maxDiscount } = voucher;

      if (type === "percentage" && typeof value === "number") {
        const rawDiscount = (totalAmount * value) / 100;
        discount +=
          typeof maxDiscount === "number"
            ? Math.min(rawDiscount, maxDiscount)
            : rawDiscount;
      } else if (type === "fixed" && typeof value === "number") {
        discount += value;
      }
    });

    return discount;
  };

  const shippingVoucher = vouchers.find((v) => v.category === "van-chuyen");
  const shippingDiscount = shippingVoucher?.value;
  const shippingFee = 30000;

  const handleConfirmOrder = async () => {
    if (!selectedAddressId) {
      message.warning("Hãy thêm địa chỉ!");
      return;
    }

    const selectedAddress = addresses.find(
      (addr) => addr._id === selectedAddressId
    );

    if (!selectedAddress) {
      message.error("Địa chỉ không hợp lệ!");
      return;
    }

    if (!selectedMethod) {
      message.info("Hãy chọn phương thức thanh toán!");
      return;
    }

    if (!products || products.length === 0) {
      message.warning("Hãy thêm sản phẩm để thanh toán!");
      navigate("/cart");
      return;
    }

    const shippingAddress = {
      phone: selectedAddress.phone,
      address: selectedAddress.address,
      city: selectedAddress.city,
    };

    const productItems = products;
    const paymentMethod = selectedMethod;
    const totalPrice = totalAmount;
    const note = orderNote;

    const discountShip = calculateVoucherDiscountAndShip() || 0;
    const discountNormal = calculateVoucherDiscountNoShip() || 0;
    const discountAmount = discountShip + discountNormal;
    const finalAmount = totalAmount - discountAmount;

    try {
      const accessToken = await ValidateToken.getValidAccessToken();

      const payload = {
        productItems,
        shippingAddress,
        paymentMethod,
        totalPrice,
        vouchers,
        discountAmount,
        finalAmount,
        note,
      };

      const res = await OrderServices.addPayment(accessToken, payload);

      if (res) {
        dispatch(resetCheckout());
        setOrderNote("");
        message.success("Đặt hàng thành công!");
        navigate("/cart");
      }
    } catch (err) {
      console.error("Error confirming order:", err);
      message.warning("Có lỗi xảy ra khi đặt hàng.");
    }
  };

  const fetchAllAddress = async () => {
    try {
      const accessToken = await ValidateToken.getValidAccessToken();
      const response = await OrderServices.getAllAddress(accessToken);
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
      message.error("Hãy chọn đủ thông tin!");
      return;
    }

    const phoneRegex = /^[0-9]{10,11}$/;
    if (!phoneRegex.test(newAddress.phone)) {
      message.warning("Hãy kiểm tra lại số điện thoại của bạn!");
      return;
    }

    try {
      const payload = {
        phone: newAddress.phone,
        city: newAddress.city,
        address: newAddress.address,
      };

      const accessToken = await ValidateToken.getValidAccessToken();
      const res = await OrderServices.addAddress(accessToken, payload);

      if (!res || res.status !== "SUCCESS") {
        message.error(res?.message || "Thêm địa chỉ thất bại!");
        return;
      }

      const data = res?.data?.shippingAddress || [];

      const newItems = data.map((item) => ({
        ...item,
        key: item._id || item.id,
        quantity: item.quantity || 1,
      }));

      setAddresses(newItems);

      const lastItem = newItems[newItems.length - 1];
      setSelectedAddressId(lastItem._id || lastItem.id);

      message.success("Thêm địa chỉ giao hàng thành công!");
      handleCancel();
    } catch (error) {
      console.error("Lỗi khi thêm địa chỉ:", error);
      message.error("Có lỗi xảy ra khi thêm địa chỉ.");
    }
  };

  const handleChooseMethod = (method) => {
    setSelectedMethod(method);
  };

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
      const accessToken = await ValidateToken.getValidAccessToken();

      await OrderServices.removeShippingAddress(accessToken, shippingInfo);
      message.success("Địa chỉ đã xóa!");

      handleCancel();
    } catch (err) {
      console.error("Error removing address:", err);
      message.warning("Xóa địa chỉ không thành công!");
    }
  };

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

          {/* Tổng giảm */}
          {Object.values(selectedVouchers).length > 0 && (
            <div
              style={{
                textAlign: "right",
                backgroundColor: "#fff",
                padding: "0px 20px 20px 20px",
                borderTop: "1px solid #eee",
              }}
            >
              <div style={{ fontSize: 14, color: "#52c41a", marginTop: 10 }}>
                Đã áp dụng voucher:
                <ul style={{ paddingLeft: 20, marginTop: 5 }}>
                  {Object.values(selectedVouchers).map((voucher) => (
                    <li style={{ listStyleType: "none" }} key={voucher._id}>
                      {voucher.voucherName} – Giảm{" "}
                      {voucher.type === "percentage"
                        ? `${voucher.value}%` +
                          (voucher.maxDiscount
                            ? ` (tối đa ₫${voucher.maxDiscount.toLocaleString()})`
                            : "")
                        : `₫${voucher.value.toLocaleString()}`}
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ fontSize: 14, color: "#f5222d" }}>
                Tổng giảm: ₫
                {(shippingVoucher
                  ? calculateVoucherDiscountAndShip()
                  : calculateVoucherDiscountNoShip()
                ).toLocaleString()}
              </div>
            </div>
          )}

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
              {calculateVoucherDiscountNoShip() ? (
                <>
                  {(
                    totalAmount - calculateVoucherDiscountNoShip()
                  ).toLocaleString()}
                </>
              ) : (
                <>{totalAmount.toLocaleString()}</>
              )}
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
              onClick={() => handleChooseMethod("COD")}
              style={{
                padding: "10px",
                border:
                  selectedMethod === "COD"
                    ? "1px solid #194a7a"
                    : "1px solid #ddd",
                color: selectedMethod === "COD" ? "#194a7a" : "#333",
                cursor: "pointer",
              }}
            >
              Thanh toán khi nhận hàng
            </div>
            <div
              onClick={() => handleChooseMethod("Online")}
              style={{
                padding: "10px",
                border:
                  selectedMethod === "Online"
                    ? "1px solid #194a7a"
                    : "1px solid #ddd",
                color: selectedMethod === "Online" ? "#194a7a" : "#333",
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
                  {calculateVoucherDiscountNoShip() ? (
                    <>
                      {(
                        totalAmount - calculateVoucherDiscountNoShip()
                      ).toLocaleString()}
                    </>
                  ) : (
                    <>{totalAmount.toLocaleString()}</>
                  )}
                </div>
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
                    width: "150px",
                    textAlign: "start",
                  }}
                >
                  Phí vận chuyển:
                </div>

                {shippingVoucher ? (
                  <>
                    <div style={{ textAlign: "end" }}>
                      <del>{shippingFee.toLocaleString()}</del>
                      <div>
                        {(shippingFee - shippingDiscount).toLocaleString()}
                      </div>
                    </div>
                  </>
                ) : (
                  <>{shippingFee.toLocaleString()}</>
                )}
              </div>

              <hr />
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ width: "150px", textAlign: "start" }}>
                  Tổng thanh toán:
                </div>
                <div style={{ width: "200px", textAlign: "end" }}>
                  {calculateVoucherDiscountAndShip() ? (
                    <>
                      {(
                        totalAmount - calculateVoucherDiscountAndShip()
                      ).toLocaleString()}
                    </>
                  ) : (
                    <>{totalAmount.toLocaleString()}</>
                  )}
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
                        const token = await ValidateToken.getValidAccessToken();

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
