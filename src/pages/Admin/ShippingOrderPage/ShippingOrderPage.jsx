import React, { useState, useEffect, useCallback } from "react";
import { Wrapper } from "./style";
import { Modal, Table, Button, Select, Tag, message } from "antd";
import * as OrderServices from "../../../services/admin/OrderServices";
import { isJsonString } from "../../../utils";
import { jwtDecode } from "jwt-decode";
import * as AuthServices from "../../../services/shared/AuthServices";

const columns = [
  { title: "Tên khách hàng", dataIndex: ["user", "name"], key: "user.name" },
  {
    title: "Địa chỉ giao hàng",
    dataIndex: "shipping_address",
    key: "shipping_address.address",
    render: (shipping_address) =>
      `${shipping_address?.phone}, ${shipping_address?.address}, ${shipping_address?.city}`,
  },
  { title: "Tổng giá tiền", dataIndex: "total_price", key: "total_price" },
  {
    title: "Trạng thái đơn hàng",
    dataIndex: "status",
    key: "status",
    render: (status) => (
      <Tag
        color={
          status === "pending"
            ? "orange"
            : status === "processing"
            ? "blue"
            : "green"
        }
      >
        {status.toUpperCase()}
      </Tag>
    ),
  },
];

const ShippingOrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [filteredData, setFilteredData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchAllOrder = useCallback(async () => {
    try {
      const token = await handleDecoded();
      const res = await OrderServices.getAllOrder(token);
      setOrders(res.data.map((order) => ({ ...order, key: order._id })));
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  }, []);

  const handleDecoded = async () => {
    let storageData = localStorage.getItem("access_token");
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData);
      const decoded = jwtDecode(storageData);
      if (decoded?.exp < Date.now() / 1000) {
        const res = await AuthServices.refreshToken();
        const accessToken = res?.access_token;
        localStorage.setItem("access_token", JSON.stringify(accessToken));
        return accessToken;
      }
      return storageData;
    }
    return null;
  };

  useEffect(() => {
    fetchAllOrder();
  }, [fetchAllOrder]);

  useEffect(() => {
    setFilteredData(
      selectedStatus === "all"
        ? orders
        : orders.filter((order) => order.status === selectedStatus)
    );
  }, [selectedStatus, orders]);

  const handleSave = async () => {
    if (selectedOrder.items.some((item) => item.status === "pending")) {
      message.warning("Hãy nhắc chủ shop đóng gói trước khi xác nhận!");
      return;
    }

    try {
      const token = await handleDecoded();

      await OrderServices.setStatusOrder(token, {
        Order_id: selectedOrder?._id,
      });

      message.success("Đơn hàng đã được chuyển sang trạng thái Đã vận chuyển!");

      setOrders((prev) =>
        prev.map((order) =>
          order._id === selectedOrder._id
            ? { ...order, status: "shipped" }
            : order
        )
      );
      setModalVisible(false);
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái đơn hàng:", error);
      message.error("Lỗi khi cập nhật trạng thái đơn hàng!");
    }
  };

  return (
    <Wrapper>
      <h3>Quản lý giao hàng</h3>
      <div
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "5px",
          boxShadow: "1px 1px 10px #e9e9e9",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h5>Danh sách đơn hàng</h5>
          <Select
            value={selectedStatus}
            onChange={setSelectedStatus}
            style={{ width: 200 }}
            options={[
              { value: "all", label: "Tất cả" },
              { value: "shipped", label: "Đã vận chuyển" },
              { value: "pending", label: "Chờ duyệt" },
            ]}
          />
        </div>

        <Table
          bordered
          columns={columns}
          dataSource={filteredData}
          rowKey="_id"
          onRow={(record) => ({
            onClick: () => {
              setSelectedOrder(record);
              setModalVisible(true);
            },
          })}
        />
      </div>
      <Modal
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={handleSave}
      >
        {selectedOrder && (
          <div>
            <h4>Chi tiết đơn hàng</h4>

            <div style={{ display: "flex", gap: "10px" }}>
              <div>Tên Khách Hàng: </div>
              <div>{selectedOrder.user?.name}</div>
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <div>Địa chỉ khách hàng: </div>
              <div>
                {selectedOrder.shipping_address?.phone},{" "}
                {selectedOrder.shipping_address?.address},{" "}
                {selectedOrder.shipping_address?.city}
              </div>
            </div>

            {selectedOrder.items.map((item, index) => (
              <div key={index}>
                <p style={{ display: "flex", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", gap: "20px" }}>
                    <div>{item.product_name}</div>

                    <div
                      style={{
                        backgroundColor:
                          item.status === "pending" ? "#bc8268" : "#60ca71",
                        color: "#fff",
                        padding: "0px 5px 4px 5px",
                        borderRadius: "5px",
                      }}
                    >
                      {item.status}
                    </div>
                  </div>
                  <div>
                    {item.quantity} x {item.price}₫
                  </div>
                </p>

                <p style={{ display: "flex", gap: "10px" }}>
                  <div>Chủ cửa hàng:</div>
                  <div>{item.owner.name}</div>
                  <div>{item.owner.email}</div>
                </p>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>Tổng tiền: </div>
              <div>{selectedOrder.total_price}₫</div>
            </div>
          </div>
        )}
      </Modal>
    </Wrapper>
  );
};

export default ShippingOrderPage;
