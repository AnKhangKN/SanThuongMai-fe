import React, { useState, useEffect, useCallback } from "react";
import { Wrapper } from "./style";
import { Select, Tag, Button, Divider, Pagination } from "antd";
import * as OrderServices from "../../../services/admin/OrderServices";
import * as ValidateToken from "../../../utils/tokenUtils";

const statusOptions = [
  { value: "all", label: "Tất cả" },
  { value: "shipping", label: "Đang giao" },
  { value: "shipped", label: "Đã giao" },
  { value: "others", label: "Khác" },
];

const ShippingOrderPage = () => {
  const [groupedOrders, setGroupedOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;

  const fetchAllOrder = useCallback(async () => {
    try {
      const token = await ValidateToken.getValidAccessToken();
      const res = await OrderServices.getAllOrder(token);
      const rawOrders = res.data;

      const grouped = [];
      rawOrders.forEach((order) => {
        const { productItems, user, shippingAddress, _id: orderId } = order;

        const shopMap = new Map();
        productItems.forEach((item) => {
          const { shopId, shopName } = item;
          const key = `${orderId}_${shopId}`;
          if (!shopMap.has(key)) {
            shopMap.set(key, {
              key,
              orderId,
              shopId,
              shopName,
              user,
              shippingAddress,
              items: [],
            });
          }
          shopMap.get(key).items.push(item);
        });

        grouped.push(...shopMap.values());
      });

      setGroupedOrders(grouped);
    } catch (err) {
      console.error("Lỗi lấy đơn hàng:", err);
    }
  }, []);

  useEffect(() => {
    fetchAllOrder();
  }, [fetchAllOrder]);

  const getFilteredGroups = () => {
    let filtered = groupedOrders;
    if (selectedStatus === "others") {
      filtered = groupedOrders.filter((group) =>
        group.items.every(
          (item) => item.status !== "shipping" && item.status !== "shipped"
        )
      );
    } else if (selectedStatus !== "all") {
      filtered = groupedOrders.filter((group) =>
        group.items.some((item) => item.status === selectedStatus)
      );
    }
    return filtered;
  };

  const handleComplete = (group) => {
    console.log("Mark as completed:", group);
    // Call API to mark all items in this group as shipped/delivered
  };

  const filteredGroups = getFilteredGroups();
  const paginatedGroups = filteredGroups.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <Wrapper>
      <h3>Quản lý giao hàng</h3>
      <div
        style={{
          backgroundColor: "#fff",
          padding: 20,
          borderRadius: 5,
          boxShadow: "1px 1px 10px #e9e9e9",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <h5>Đơn hàng theo trạng thái</h5>
          <Select
            value={selectedStatus}
            onChange={(value) => {
              setSelectedStatus(value);
              setCurrentPage(1);
            }}
            options={statusOptions}
            style={{ width: 200 }}
          />
        </div>

        {paginatedGroups.map((group) => (
          <div
            key={group.key}
            style={{
              border: "1px solid #eee",
              borderRadius: 6,
              padding: 16,
              marginBottom: 24,
              backgroundColor: "#fafafa",
            }}
          >
            <h4>🧾 Mã đơn: {group.orderId}</h4>
            <p>🛍 Shop: {group.shopName}</p>
            <p>👤 Người mua: {group.user?.name}</p>
            <p>📦 Địa chỉ: {group.shippingAddress?.address}</p>

            {group.items.map((item) => (
              <div
                key={item.productId}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "8px 0",
                  borderBottom: "1px dashed #ddd",
                }}
              >
                <div style={{ flex: 2 }}>{item.productName}</div>
                <div style={{ flex: 1, textAlign: "center" }}>
                  {item.quantity}
                </div>
                <div style={{ flex: 1, textAlign: "right" }}>
                  {item.price.toLocaleString()}₫
                </div>
                <div style={{ flex: 1, textAlign: "right" }}>
                  <Tag
                    color={
                      item.status === "shipping"
                        ? "cyan"
                        : item.status === "shipped"
                        ? "blue"
                        : "gray"
                    }
                  >
                    {item.status}
                  </Tag>
                </div>
              </div>
            ))}

            <div style={{ textAlign: "right", marginTop: 12 }}>
              <strong>
                Tổng tiền:{" "}
                {group.items
                  .reduce((acc, item) => acc + item.price * item.quantity, 0)
                  .toLocaleString()}
                ₫
              </strong>
            </div>

            {selectedStatus === "shipping" && (
              <div style={{ textAlign: "right", marginTop: 12 }}>
                <Button type="primary" onClick={() => handleComplete(group)}>
                  Đánh dấu hoàn tất
                </Button>
              </div>
            )}

            <Divider />
          </div>
        ))}

        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={filteredGroups.length}
          onChange={(page) => setCurrentPage(page)}
          style={{ textAlign: "right", marginTop: 24 }}
        />
      </div>
    </Wrapper>
  );
};

export default ShippingOrderPage;
