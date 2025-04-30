import axios from "axios";

// Lấy tất cả các shops
export const getAllShops = async (accessToken) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/admin/get-all-shops`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return res.data;
};

// Duyệt trạng thái shops
export const partialUpdateShop = async (userId, dataUpdate, accessToken) => {
  const data = { shop: { status: dataUpdate } };

  const res = await axios.patch(
    `${process.env.REACT_APP_API_URL}/admin/partial-update-shop/${userId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return res.data;
};

// Danh sách shop bị report
export const getAllReportedShops = async (accessToken) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/admin/get-all-reported-shops`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return res.data;
};

// Cập nhật mới các thông tin của shop bị report
export const partialUpdateReportedShop = async (
  userId,
  dataUpdate,
  accessToken
) => {
  const data = {
    shop: {
      status: dataUpdate.status, // Đảm bảo dataUpdate chứa status
      comment_reported: dataUpdate.comment_reported || [], // Đảm bảo comment_reported là mảng
    },
  };

  const res = await axios.patch(
    `${process.env.REACT_APP_API_URL}/admin/update-reported-shop/${userId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return res.data;
};
