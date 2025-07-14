import React, { useEffect, useState, useCallback } from "react";
import {
  Modal,
  Form,
  Input,
  InputNumber,
  Upload,
  message,
  Table,
  Tag,
  Tooltip,
  Select,
  Tabs,
} from "antd";
import { PlusOutlined, SearchOutlined, EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import ButtonComponents from "../../../components/VendorComponents/ButtonComponents/ButtonComponents";
import InputComponent from "../../../components/VendorComponents/InputComponent/InputComponent";
import ComboboxComponent from "../../../components/VendorComponents/ComboboxComponent/ComboboxComponent";
import {
  WrapperHeaderSeeAllProduct,
  WrapperTabs,
  WrapperUnderHeaderSeeAllProduct,
} from "./StyleSeeAllProduct";
import * as ProductService from "../../../services/vendor/ProductService";
import * as AuthServices from "../../../services/shared/AuthServices";
import { isJsonString } from "../../../utils";
import ProductDetailModal from "./ProductDetailModal";

const imageURL = `${process.env.REACT_APP_API_URL}/products-img/`;

const SeeAllProduct = () => {
  const navigate = useNavigate();
  const { TabPane } = Tabs;
  const [productList, setProductList] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [searchKeywords, setSearchKeywords] = useState({
    all: "",
    active: "",
    inactive: "",
    banned: "",
  });

  const handleClickToAddProduct = () => {
    navigate("/vendor/add-product");
  };

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

      localStorage.setItem("access_token", newToken); // không cần stringify
      return newToken;
    }

    return token;
  } catch (err) {
    console.error("❌ Token decode lỗi:", err);
    return null;
  }
};

const fetchProducts = async () => {
    try {
      const tokenHandle = await handleDecoded();

      if (!tokenHandle) {
        message.error("Không có token hợp lệ");
        return;
      }

      const response = await ProductService.getAllProducts(tokenHandle);
      console.log("📦 Product data:", response.data);
      setProductList(response.data.data);
    } catch (error) {
      message.error("❌ Không lấy được sản phẩm");
      console.error("Lỗi khi fetch:", error);
    }
  };

 useEffect(() => {
  fetchProducts();
}, []);

  const PriceProduct = [
    { label: "Tất cả", value: "all" },
    { label: "0 -> 100.000", value: "0-100000" },
    { label: "100.000 -> 200.000", value: "100000-200000" },
    { label: "200.000 -> 300.000", value: "200000-300000" },
    { label: "300.000 -> 400.000", value: "300000-400000" },
    { label: "400.000 -> 500.000", value: "400000-500000" },
    { label: "500.000 -> 600.000", value: "500000-600000" },
  ];

  // Cột
  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Danh mục",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Đã bán",
      dataIndex: "soldCount",
      key: "soldCount",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "green";
        if (status === "inactive") color = "orange";
        if (status === "banned") color = "red";
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Biến thể",
      dataIndex: "priceOptions",
      key: "priceOptions",
      render: (priceOptions) => priceOptions?.length ?? 0,
    },
    // {
    //   title: "Thao tác",
    //   render: (_, record) => (
    //     <Tooltip title="Chỉnh sửa">
    //       <EditOutlined
    //         style={{ color: "blue", cursor: "pointer" }}
    //         onClick={() => navigate(`/vendor/edit-product/${record._id}`)}
    //       />
    //     </Tooltip>
    //   ),
    // },
  ];
    const filterProductsByStatus = (status) => {
    if (status === "all") {
      return productList;
    }
    return productList.filter((product) => product.status === status);
  };

  const countByStatus = (status) => {
    return productList.filter((product) => product.status === status).length;
  };

  const handleSearchProduct = async () => {
    try {
      const token = await handleDecoded();
      if (!token) {
        message.error("Không có token hợp lệ");
        return;
      }

      const res = await ProductService.searchProductByName(token, searchText);
      setProductList(res); // Cập nhật danh sách sau khi tìm
    } catch (err) {
      message.error("Lỗi khi tìm kiếm sản phẩm");
    }
  };

  useEffect(() => {
  if (searchText.trim() === "") {
      fetchProducts();
    }
  }, [searchText]);

  const filterProductsByStatusAndKeyword = (status) => {
  const keyword = searchKeywords[status]?.toLowerCase() || "";
  const filteredByStatus = status === "all" ? productList : productList.filter((p) => p.status === status);

  return filteredByStatus.filter((product) =>
    product.productName.toLowerCase().includes(keyword)
  );
};

  return (
    <div>
      <WrapperHeaderSeeAllProduct>
        <h3>Sản phẩm</h3>
        <ButtonComponents
          onClick={handleClickToAddProduct}
          icon={<PlusOutlined />}
          textButton="Thêm sản phẩm"
        />
      </WrapperHeaderSeeAllProduct>

      {/* <WrapperUnderHeaderSeeAllProduct>
        <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        <div style={{ flex: 1 }}>
          <InputComponent
            name="searchProduct"
            placeholder="Nhập tên sản phẩm"
            icon={<SearchOutlined />}
            onChange={(e) => setSearchText(e.target.value)} // ✅ Thêm dòng này
          />
        </div>
        <ButtonComponents icon={<SearchOutlined />} textButton="Tìm kiếm" onClick={handleSearchProduct}  />
      </div>

        <ComboboxComponent
          name="searchPriceProduct"
          label="Giá sản phẩm"
          placeholder="Chọn giá sản phẩm"
          options={PriceProduct}
          // onChange={handlePriceChange}
        />
      </WrapperUnderHeaderSeeAllProduct> */}

      <WrapperUnderHeaderSeeAllProduct>
        <WrapperTabs defaultActiveKey="1">
        <TabPane tab="Tất cả" key="all">
          <div style={{ marginBottom: "12px", display: "flex", gap: 8 }}>
            <Input
              placeholder="Tìm theo tên sản phẩm"
              value={searchKeywords.all}
              onChange={(e) =>
                setSearchKeywords((prev) => ({ ...prev, all: e.target.value }))
              }
              style={{ width: 300 }}
              prefix={<SearchOutlined />}
              allowClear
            />
          </div>
          <Table 
            columns={columns} 
            dataSource={filterProductsByStatusAndKeyword("all")}
            rowKey={"_id"} 
            pagination={{ pageSize: 5 }}
            onRow={(record) => {
            return {
              onClick: () => {
                setSelectedProduct(record);
                setIsModalVisible(true);
              },
            };
          }}
            />
        </TabPane>
        <TabPane tab={`Đang hoạt động (${countByStatus("active")})`} key="active">
          <div style={{ marginBottom: "12px", display: "flex", gap: 8 }}>
            <Input
              placeholder="Tìm theo tên sản phẩm"
              value={searchKeywords.active}
              onChange={(e) =>
                setSearchKeywords((prev) => ({ ...prev, active: e.target.value }))
              }
              style={{ width: 300 }}
              prefix={<SearchOutlined />}
              allowClear
            />
          </div>
          <Table 
            columns={columns} 
            dataSource={filterProductsByStatusAndKeyword("active")}
            rowKey={"_id"} 
            pagination={{ pageSize: 5 }}
            onRow={(record) => {
            return {
              onClick: () => {
                setSelectedProduct(record);
                setIsModalVisible(true);
              },
            };
          }}
            />
        </TabPane>
        <TabPane tab={`Không hoạt động (${countByStatus("inactive")})`} key="inactive">
          <div style={{ marginBottom: "12px", display: "flex", gap: 8 }}>
            <Input
              placeholder="Tìm theo tên sản phẩm"
              value={searchKeywords.inactive}
              onChange={(e) =>
                setSearchKeywords((prev) => ({ ...prev, inactive: e.target.value }))
              }
              style={{ width: 300 }}
              prefix={<SearchOutlined />}
              allowClear
            />
          </div>
          <Table 
            columns={columns} 
            dataSource={filterProductsByStatusAndKeyword("inactive")}
            rowKey={"_id"} 
            pagination={{ pageSize: 5 }}
            onRow={(record) => {
            return {
              onClick: () => {
                setSelectedProduct(record);
                setIsModalVisible(true);
              },
            };
          }}
            />
        </TabPane>
        <TabPane tab={`Bị cấm (${countByStatus("banned")})`} key="banned">
          <div style={{ marginBottom: "12px", display: "flex", gap: 8 }}>
            <Input
              placeholder="Tìm theo tên sản phẩm"
              value={searchKeywords.banned}
              onChange={(e) =>
                setSearchKeywords((prev) => ({ ...prev, banned: e.target.value }))
              }
              style={{ width: 300 }}
              prefix={<SearchOutlined />}
              allowClear
            />
          </div>
          <Table 
            columns={columns} 
            dataSource={filterProductsByStatusAndKeyword("banned")} 
            rowKey={"_id"} 
            pagination={{ pageSize: 5 }}
            onRow={(record) => {
            return {
              onClick: () => {
                setSelectedProduct(record);
                setIsModalVisible(true);
              },
            };
          }}
            />
        </TabPane>
      </WrapperTabs>
      </WrapperUnderHeaderSeeAllProduct>

      <ProductDetailModal
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        product={selectedProduct}
         onUpdateSuccess={fetchProducts}
      />
    </div>
  );
};

export default SeeAllProduct;