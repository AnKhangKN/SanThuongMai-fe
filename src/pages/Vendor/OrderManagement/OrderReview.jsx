import React, { useState, useCallback, useEffect } from "react";
import { Table, Tag, Space, Button, message } from "antd";
import OrderFilter from "../../../components/VendorComponents/OrderFilter/OrderFilter";
import * as OrderProductService from "../../../services/vendor/OrderProductService";
import * as AuthServices from "../../../services/shared/AuthServices";
import { isJsonString } from "../../../utils";
import { jwtDecode } from "jwt-decode";

const OrderReview = () => {
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState(null);
  const [dateRange, setDateRange] = useState([]);
  const [allData, setAllData] = useState([]);

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const handleStatusChange = (value) => {
    setStatusFilter(value);
  };

  const handleDateRangeChange = (dates) => {
    setDateRange(dates);
  };

  const handleDecoded = () => {
    const storageData = localStorage.getItem("access_token");
    let decoded = {};

    if (storageData && isJsonString(storageData)) {
      const parsed = JSON.parse(storageData);
      decoded = jwtDecode(parsed);
      return { decoded, storageData: parsed };
    }

    return { decoded, storageData };
  };

  const fetchOrders = useCallback(async () => {
    try {
      let { storageData, decoded } = handleDecoded();
      let accessToken = storageData;

      if (decoded?.exp < Date.now() / 1000) {
        const res = await AuthServices.refreshToken();
        accessToken = res?.access_token;
        localStorage.setItem("access_token", JSON.stringify(accessToken));
      }

      const res = await OrderProductService.getAllOrders(accessToken);

      // ✅ Lọc đơn hàng có trạng thái "pending" hoặc "processing"
      const filteredOrders = res.data.data.filter(
        (order) =>
          order.status === "pending" || order.status === "processing"
      );

      const ordersWithKeys = filteredOrders.map((order, index) => ({
        key: order._id || index,
        order_id: order._id,
        owner_id:
          order.items?.find((item) => item.owner_id)?.owner_id || "N/A",
        user_id: order.user_id || "Ẩn danh",
        status:
          order.status === "pending"
            ? "Chờ duyệt"
            : order.status === "processing"
            ? "Đã đóng gói"
            : order.status,
        raw_status: order.status,
      }));

      setAllData(ordersWithKeys);
    } catch (error) {
      console.error("Lỗi khi lấy đơn hàng:", error);
    }
  }, []);

  // const handleApprove = async (record) => {
  //   try {
  //     const { storageData, decoded } = handleDecoded();
  //     let accessToken = storageData;

  //     if (decoded?.exp < Date.now() / 1000) {
  //       const res = await AuthServices.refreshToken();
  //       accessToken = res?.access_token;
  //       localStorage.setItem("access_token", JSON.stringify(accessToken));
  //     }

  //     // Gọi API cập nhật trạng thái đơn hàng
  //     await OrderProductService.updateOrderStatus(accessToken, record.order_id, "shipped");
  //     message.success(`Đã duyệt đơn hàng ${record.order_id}`);
  //     // Ẩn khỏi danh sách sau khi duyệt
  //     setAllData((prev) =>
  //       prev.filter((order) => order.order_id !== record.order_id)
  //     );
  //   } catch (err) {
  //     console.error("Lỗi khi duyệt đơn:", err);
  //     message.error("Duyệt đơn hàng thất bại");
  //   }
  // };

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const columns = [
    {
      title: "ID Cửa hàng",
      dataIndex: "owner_id",
      key: "owner_id",
    },
    {
      title: "Mã đơn hàng",
      dataIndex: "order_id",
      key: "order_id",
    },
    {
      title: "Khách hàng",
      dataIndex: "user_id",
      key: "user_id",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const color =
          status === "Chờ duyệt"
            ? "orange"
            : status === "Đã đóng gói"
            ? "blue"
            : "default";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" > 
            {/* onClick={() => handleApprove(record)} */}
            Duyệt
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h2 style={{ marginBottom: 20 }}>Duyệt đơn hàng</h2>
      <OrderFilter
        onSearch={handleSearch}
        onStatusChange={handleStatusChange}
        onDateRangeChange={handleDateRangeChange}
      />
      <Table columns={columns} dataSource={allData} />
    </div>
  );
};

export default OrderReview;
