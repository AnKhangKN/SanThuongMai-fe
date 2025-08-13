import React, { useEffect, useState } from "react";
import { Row, Col, Card, Statistic, Table, Spin, message } from "antd";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import * as StatisticalService from "../../../services/vendor/StatisticalService";
import * as AuthServices from "../../../services/shared/AuthServices";
import { isJsonString } from "../../../utils";
import { jwtDecode } from "jwt-decode";

const IncomeStatistics = () => {
  const [stats, setStats] = useState(null);

  // --- Khai báo handleDecoded trước ---
  const handleDecoded = async () => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      return null;
    }

    try {
      const decoded = jwtDecode(token);

      if (decoded?.exp < Date.now() / 1000) {
        const res = await AuthServices.refreshToken();
        const newToken = res?.access_token;

        if (!newToken) {
          console.error("❌ Refresh thất bại");
          return null;
        }

        localStorage.setItem("access_token", newToken);
        return newToken;
      }

      return token;
    } catch (err) {
      console.error("❌ Token decode lỗi:", err);
      return null;
    }
  };

  // --- Dùng trong useEffect ---
  useEffect(() => {
    const fetchStats = async () => {
      const token = await handleDecoded();
      if (!token) {
        message.error("Bạn chưa đăng nhập hoặc phiên đã hết hạn");
        return;
      }
      const data = await StatisticalService.getVendorStatistics(token);
      setStats(data);
    };
    fetchStats();
  }, []);

  if (!stats) return <p>Đang tải...</p>;

  // useEffect(() => {
  //   const fetchAll = async () => {
  //     try {
  //       setLoading(true);
  //       const token = await handleDecoded(); // Lấy token (có thể refresh)
  //       if (!token) {
  //         message.error("Bạn chưa đăng nhập hoặc phiên đã hết hạn");
  //         setLoading(false);
  //         return;
  //       }

  //       // Gọi API có truyền token
  //       const [{ data: s }, { data: t }, { data: tp }, { data: ls }] =
  //         await Promise.all([
  //           StatisticalService.getSummary({ shopId }, token),
  //           StatisticalService.getRevenueTrend({ shopId, days: 30 }, token),
  //           StatisticalService.getTopProducts({ shopId, limit: 5 }, token),
  //           StatisticalService.getLowStock({ shopId, threshold: 5 }, token),
  //         ]);

  //       setSummary(s);
  //       setTrend(t);
  //       setTopProducts(tp);
  //       setLowStock(ls);
  //     } catch (err) {
  //       console.error(err);
  //       message.error("Không thể load dữ liệu thống kê");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchAll();
  // }, [shopId]);

  // const topCols = [
  //   {
  //     title: "Sản phẩm",
  //     dataIndex: "productName",
  //     key: "productName",
  //     ellipsis: true,
  //     render: (text, row) => (
  //       <div style={{ display: "flex", alignItems: "center" }}>
  //         <img
  //           src={row.images?.[0]}
  //           alt=""
  //           style={{
  //             width: 40,
  //             height: 40,
  //             objectFit: "cover",
  //             marginRight: 8,
  //             borderRadius: 4,
  //           }}
  //         />
  //         <span>{text || "—"}</span>
  //       </div>
  //     ),
  //   },
  //   { title: "Số lượng bán", dataIndex: "qty", key: "qty" },
  //   {
  //     title: "Doanh thu",
  //     dataIndex: "revenue",
  //     key: "revenue",
  //     render: (value) =>
  //       value?.toLocaleString("vi-VN", {
  //         style: "currency",
  //         currency: "VND",
  //       }) || "0₫",
  //   },
  // ];

  // const lowCols = [
  //   { title: "Sản phẩm", dataIndex: "productName", key: "productName" },
  //   {
  //     title: "Variant",
  //     dataIndex: "priceOptions",
  //     key: "priceOptions",
  //     render: (arr) =>
  //       arr
  //         .map(
  //           (p) =>
  //             `[stk:${p.stock}] ${p.attributes.map((a) => a.value).join("/")}`
  //         )
  //         .join(", "),
  //   },
  // ];

  return (
    <div>
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Tổng doanh thu"
              value={stats.totalRevenue}
              suffix="₫"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Doanh thu tháng này"
              value={stats.monthlyRevenue}
              suffix="₫"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Đơn đã giao" value={stats.orders.delivered} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Đơn bị hủy" value={stats.orders.cancelled} />
          </Card>
        </Col>
      </Row>

      <Card title="Top sản phẩm bán chạy" style={{ marginTop: 20 }}>
        <Table
          dataSource={stats.topProducts}
          columns={[
            { title: "Sản phẩm", dataIndex: "productName", key: "productName" },
            { title: "Số lượng", dataIndex: "quantity", key: "quantity" },
            { title: "Doanh thu", dataIndex: "revenue", key: "revenue" },
          ]}
          rowKey="_id"
        />
      </Card>
    </div>
    // <Spin spinning={loading} tip="Đang tải dữ liệu..." size="large">
    //   <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
    //     <Col span={6}>
    //       <Card>
    //         <Statistic
    //           title="Doanh thu (30 ngày)"
    //           value={summary?.revenue || 0}
    //           precision={0}
    //           valueStyle={{ color: "#3f8600" }}
    //           prefix="₫"
    //         />
    //       </Card>
    //     </Col>
    //     <Col span={6}>
    //       <Card>
    //         <Statistic
    //           title="Đơn hàng (30 ngày)"
    //           value={summary?.ordersCount || 0}
    //           valueStyle={{ color: "#1890ff" }}
    //         />
    //       </Card>
    //     </Col>
    //     <Col span={6}>
    //       <Card>
    //         <Statistic
    //           title="Sản phẩm bán"
    //           value={summary?.totalQuantity || 0}
    //           valueStyle={{ color: "#cf1322" }}
    //         />
    //       </Card>
    //     </Col>
    //     <Col span={6}>
    //       <Card>
    //         <Statistic
    //           title="Sản phẩm khác"
    //           value={summary?.productsSoldCount || 0}
    //         />
    //       </Card>
    //     </Col>
    //   </Row>

    //   <Row gutter={[16, 16]}>
    //     <Col span={16}>
    //       <Card
    //         title="Doanh thu theo ngày (30 ngày)"
    //         style={{ marginBottom: 16 }}
    //       >
    //         <ResponsiveContainer width="100%" height={300}>
    //           <LineChart data={trend}>
    //             <CartesianGrid strokeDasharray="3 3" />
    //             <XAxis dataKey="date" />
    //             <YAxis
    //               tickFormatter={(value) =>
    //                 value.toLocaleString("vi-VN", {
    //                   style: "currency",
    //                   currency: "VND",
    //                 })
    //               }
    //             />
    //             <Tooltip
    //               formatter={(value) =>
    //                 value.toLocaleString("vi-VN", {
    //                   style: "currency",
    //                   currency: "VND",
    //                 })
    //               }
    //             />
    //             <Line
    //               type="monotone"
    //               dataKey="revenue"
    //               stroke="#1890ff"
    //               strokeWidth={2}
    //               dot={{ r: 3 }}
    //             />
    //           </LineChart>
    //         </ResponsiveContainer>
    //       </Card>

    //       <Card title="Top sản phẩm">
    //         <Table
    //           dataSource={topProducts}
    //           columns={topCols}
    //           rowKey="productId"
    //           pagination={false}
    //           bordered
    //           size="middle"
    //           scroll={{ y: 300 }}
    //           rowClassName={() => "hover-row"}
    //         />
    //       </Card>
    //     </Col>

    //     <Col span={8}>
    //       <Card title="Sản phẩm sắp hết hàng">
    //         <Table
    //           dataSource={lowStock}
    //           columns={lowCols}
    //           rowKey="_id"
    //           pagination={false}
    //           bordered
    //           size="middle"
    //           scroll={{ y: 600 }}
    //           rowClassName={() => "hover-row"}
    //         />
    //       </Card>
    //     </Col>
    //   </Row>
    // </Spin>
  );
};

export default IncomeStatistics;
