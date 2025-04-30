import axios from "axios";

// Lấy tất của user
export const getAllProducts = async (accessToken) => {
  console.log("accessToken", accessToken);

  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/admin/get-all-products`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return res.data;
};

// Cập nhật trạng thái khách hàng
export const partialUpdateProduct = async (
  productId,
  dataUpdate,
  accessToken
) => {
  // Chỉ cần truyền giá trị của dataUpdate vào trực tiếp
  const data = { status: dataUpdate };

  const res = await axios.patch(
    `${process.env.REACT_APP_API_URL}/admin/partial-update-product/${productId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return res.data;
};
