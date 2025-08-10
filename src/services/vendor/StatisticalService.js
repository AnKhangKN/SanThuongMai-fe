import axios from "axios";

// Tổng quan
export const getSummary = (params, token) => {
  return axios.get(
    `${process.env.REACT_APP_API_URL}/vendor/statistics/summary`,
    {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// Xu hướng doanh thu
export const getRevenueTrend = (params, token) => {
  return axios.get(
    `${process.env.REACT_APP_API_URL}/vendor/statistics/revenue`,
    {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// Đơn hàng theo trạng thái
export const getOrdersByStatus = (params, token) => {
  return axios.get(
    `${process.env.REACT_APP_API_URL}/vendor/statistics/orders-by-status`,
    {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// Sản phẩm bán chạy
export const getTopProducts = (params, token) => {
  return axios.get(
    `${process.env.REACT_APP_API_URL}/vendor/statistics/top-products`,
    {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// Sản phẩm sắp hết hàng
export const getLowStock = (params, token) => {
  return axios.get(
    `${process.env.REACT_APP_API_URL}/vendor/statistics/low-stock`,
    {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// Các cảnh báo
export const getWarnings = (params, token) => {
  return axios.get(
    `${process.env.REACT_APP_API_URL}/vendor/statistics/warnings`,
    {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
