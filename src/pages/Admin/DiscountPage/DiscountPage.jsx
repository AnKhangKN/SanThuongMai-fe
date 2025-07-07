import { Select, Table } from "antd";
import React from "react";
import { Wrapper } from "./style";

const DiscountPage = () => {
  return (
    <Wrapper>
      <h3>Quản lý giảm giá</h3>
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
            // value={selectedStatus}
            // style={{ width: "120px" }}
            // onChange={handleFilterChange}
            options={[
              { value: "all", label: "Tất cả" },
              { value: "active", label: "Đang hoạt động" },
              { value: "pending", label: "Đang chờ" },
              { value: "inactive", label: "Không hoạt động" },
            ]}
          />
        </div>
        <Table
          //   columns={columns}
          //   dataSource={filteredData}
          //   onRow={(record) => ({
          //     onClick: () => handleRowClick(record),
          //   })}
          pagination={{ pageSize: 8 }}
        />
      </div>

      {/* <Modal
        title="Thông tin Cộng tác viên"
        open={modalVisible}
        onCancel={handleModalCancel}
        footer={[
          <Button key="cancel" onClick={handleModalCancel}>
            Đóng
          </Button>,
          <Button key="save" type="primary" onClick={handleSaveStatus}>
            Lưu
          </Button>,
        ]}
      >
        {selectedUser && (
          <div>
            <p>
              <strong>ID:</strong> {selectedUser.key}
            </p>
            <p>
              <strong>Tên:</strong> {selectedUser.user_name}
            </p>
            <p>
              <strong>Tên cửa hàng:</strong>{" "}
              {selectedUser.shop?.name || "Chưa có"}
            </p>
            <div>
              <Select
                value={newStatus}
                style={{ width: "120px" }}
                onChange={(value) => setNewStatus(value)}
                options={[
                  { value: "active", label: "Đang hoạt động" },
                  { value: "inactive", label: "Không hoạt động" },
                  { value: "pending", label: "Đang chờ" },
                  { value: "banned", label: "Bị cấm" },
                ]}
              />
            </div>
          </div>
        )}
      </Modal> */}
    </Wrapper>
  );
};

export default DiscountPage;
