import React, { useState } from "react";
import { BoxChange, TextNameChange, Wrapper, WrapperChange } from "./style";
import logo from "../../../../assets/images/Logo_Trang.jpg";
import ButtonComponent from "../../ButtonComponent/ButtonComponent";
import { Input, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import * as ImageServices from "../../../../services/customer/ImageServices";
import { isJsonString } from "../../../../utils";
import { jwtDecode } from "jwt-decode";
import * as AuthServices from "../../../../services/shared/AuthServices";
import { updateUser } from "../../../../redux/slices/userSlice";

const ProfileComponent = () => {
  const user = useSelector((state) => state.user);

  const [file, setFile] = useState(null);

  const dispatch = useDispatch();

  // Hàm giải mã token
  const decodeToken = () => {
    let storageToken = localStorage.getItem("access_token");
    if (storageToken && isJsonString(storageToken)) {
      const token = JSON.parse(storageToken);
      const decoded = jwtDecode(token);
      return { decoded, token };
    }
    return { decoded: null, token: null };
  };

  // Hàm xử lý khi chọn file
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log("File selected:", selectedFile); // Kiểm tra file đã được chọn
    if (selectedFile) {
      setFile(selectedFile);
    } else {
      console.log("No file selected.");
    }
  };

  // Hàm gửi form
  const submitImage = async (event) => {
    event.preventDefault();

    // Kiểm tra nếu không có file được chọn
    if (!file) {
      message.error("Vui lòng chọn ảnh trước khi tải lên.");
      return;
    }

    let { decoded, token } = decodeToken();

    // Kiểm tra token, nếu hết hạn thì làm mới
    if (!token || (decoded && decoded.exp < Date.now() / 1000)) {
      const refreshed = await AuthServices.refreshToken();
      token = refreshed?.access_token;
      localStorage.setItem("access_token", JSON.stringify(token));
    }

    // Tạo đối tượng FormData và thêm file vào
    const formData = new FormData();
    formData.append("image", file);

    // Log FormData để kiểm tra
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    // Gửi request lên server để tải ảnh lên
    try {
      const result = await ImageServices.uploadAvatar(token, formData);

      // Kiểm tra kết quả từ server
      if (result) {
        message.success("Upload thành công!");

        const imageUrl = result?.imageName;

        dispatch(updateUser({ images: imageUrl }));
      } else {
        message.error("Lỗi khi upload ảnh.");
      }
    } catch (error) {
      console.error("Error during image upload:", error);
      message.error("Đã xảy ra lỗi trong quá trình tải lên.");
    }
  };

  return (
    <>
      <Wrapper>
        <div>
          <div>Hồ sơ của tôi</div>
          <div>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ flex: "0 0 66%", marginTop: "30px" }}>
            <WrapperChange>
              <TextNameChange>Tên</TextNameChange>
              <BoxChange>
                <Input placeholder={user?.name} />
              </BoxChange>
              <div>Thay tên</div>
            </WrapperChange>

            <WrapperChange>
              <TextNameChange>Địa chỉ giao hàng</TextNameChange>
              <BoxChange style={{ gap: "20px" }}>Thêm địa chỉ</BoxChange>
            </WrapperChange>
          </div>
          <div style={{ flex: "0 0 34%" }}>
            <div>
              <div
                style={{
                  width: "50%",
                  margin: "auto",
                }}
              >
                <div
                  style={{
                    width: "100px",
                    height: "100px",
                    margin: "auto",
                    overflow: "hidden",
                    borderRadius: "60%",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <img
                    style={{ width: "100%", objectFit: "cover" }}
                    src={user?.img}
                    alt="Avatar"
                  />
                </div>

                <input
                  onChange={handleFileChange}
                  type="file"
                  accept="image/*"
                />

                <div
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={submitImage}
                >
                  Lưu ảnh
                </div>

                <div>
                  <div>Dung lượng file tối đa 1 MB</div>
                  <div>Định dạng: .JPEG, .PNG</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default ProfileComponent;
