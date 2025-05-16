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
        decoded = jwtDecode(accessToken); // Cập nhật decoded sau khi refresh
      }

      const res = await OrderProductService.getAllOrders(accessToken);
      const currentVendorId = decoded?.id;

      const pendingItems = [];

      res.data.data.forEach((order) => {
        order.items.forEach((item) => {
          if (
            item.status === "pending" &&
            item.owner_id === currentVendorId // Lọc đúng shop
          ) {
            pendingItems.push({
              key: item._id || order._id,
              order_id: order._id,
              owner_id: item.owner_id,
              user_id: order.user_id?.user_name || "Ẩn danh",
              status: "Chờ duyệt",
              raw_status: item.status,
              product_name: item.product_name,
              product_image: item.product_image,
              price: item.price,
              quantity: item.quantity,
              size: item.size,
              item_id: item._id,
            });
          }
        });
      });

      setAllData(pendingItems);
    } catch (error) {
      console.error("Lỗi khi lấy đơn hàng:", error);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleApprove = async (item) => {
    try {
      let accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        message.error("Bạn chưa đăng nhập");
        return;
      }
      // Nếu token là JSON string, parse nó
      if (isJsonString(accessToken)) {
        accessToken = JSON.parse(accessToken);
      }

      await OrderProductService.changeStatusOrder(accessToken, item.item_id);

      message.success("Đã duyệt đơn hàng");

      fetchOrders(); // load lại dữ liệu
    } catch (error) {
      message.error("Duyệt đơn hàng thất bại");
      console.error(error);
    }
  };

  const columns = [
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
      title: "Sản phẩm",
      dataIndex: "product_name",
      key: "product_name",
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
      render: (size) => size || "Không có",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const color = status === "Chờ duyệt" ? "orange" : "default";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleApprove(record)}>
            Duyệt
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h2 style={{ marginBottom: 20 }}>Duyệt đơn hàng</h2>
      {/*<OrderFilter
        onSearch={handleSearch}
        onStatusChange={handleStatusChange}
        onDateRangeChange={handleDateRangeChange}
      />
      */}
      <Table columns={columns} dataSource={allData} />
    </div>
  );
};

export default OrderReview;
