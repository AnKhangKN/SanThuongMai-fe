import React, { useEffect, useState } from "react";
import { Wrapper } from "./style";
import { Select, Table, Image, Tag, Spin, message } from "antd";
import axios from "axios";

const BannerPage = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredStatus, setFilteredStatus] = useState("all");

  const fetchBanners = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/banners"); // <-- Đường dẫn API của bạn
      setBanners(res.data || []);
    } catch (err) {
      console.error("Lỗi khi lấy banner:", err);
      message.error("Không thể tải banner.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const filteredData = banners.filter((item) =>
    filteredStatus === "all" ? true : item.status === filteredStatus
  );

  const columns = [
    {
      title: "Tên chương trình",
      dataIndex: "programName",
      key: "programName",
    },
    {
      title: "Hình ảnh",
      dataIndex: "images",
      key: "images",
      render: (images) => (
        <Image
          src={images?.[0] || "/default_banner.jpg"}
          alt="Banner"
          width={100}
        />
      ),
    },
    {
      title: "Thời gian",
      key: "duration",
      render: (record) => (
        <div>
          <div>Bắt đầu: {new Date(record.startAt).toLocaleDateString()}</div>
          <div>Kết thúc: {new Date(record.endAt).toLocaleDateString()}</div>
        </div>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "active" ? "green" : "red"}>
          {status === "active" ? "Hoạt động" : "Không hoạt động"}
        </Tag>
      ),
    },
  ];

  return (
    <Wrapper>
      <h3>Quản lý Banner</h3>
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
            marginBottom: "20px",
          }}
        >
          <h5>Danh sách chương trình</h5>
          <Select
            value={filteredStatus}
            style={{ width: "160px" }}
            onChange={setFilteredStatus}
            options={[
              { value: "all", label: "Tất cả" },
              { value: "active", label: "Đang hoạt động" },
              { value: "inactive", label: "Không hoạt động" },
            ]}
          />
        </div>

        {loading ? (
          <Spin />
        ) : (
          <Table
            rowKey="_id"
            columns={columns}
            dataSource={filteredData}
            pagination={{ pageSize: 8 }}
          />
        )}
      </div>
    </Wrapper>
  );
};

export default BannerPage;
