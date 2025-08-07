import React, { useState } from "react";
import { BoxChange, TextNameChange, Wrapper, WrapperChange } from "./style";
import logo from "../../../../assets/images/Logo_Trang.jpg";
import ButtonComponent from "../../ButtonComponent/ButtonComponent";
import { Input, message, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import * as ImageServices from "../../../../services/customer/ImageServices";
import { isJsonString } from "../../../../utils";
import { jwtDecode } from "jwt-decode";
import * as AuthServices from "../../../../services/shared/AuthServices";
import * as UserServices from "../../../../services/customer/UserServices";
import { avatarUser } from "../../../../redux/slices/avatarSlice";

const ProfileComponent = () => {
  const user = useSelector((state) => state.user);
  const avatar = useSelector((state) => state.avatar);

  const [file, setFile] = useState(null);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

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

        dispatch(avatarUser({ images: imageUrl }));
      } else {
        message.error("Lỗi khi upload ảnh.");
      }
    } catch (error) {
      console.error("Error during image upload:", error);
      message.error("Đã xảy ra lỗi trong quá trình tải lên.");
    }
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleChangeUserName = async () => {
    try {
      let { decoded, token } = decodeToken();

      if (!token || (decoded && decoded.exp < Date.now() / 1000)) {
        const refreshed = await AuthServices.refreshToken();
        token = refreshed?.access_token;
        localStorage.setItem("access_token", JSON.stringify(token));
      }

      if (!inputValue) {
        message.warning("Hãy nhập tên mới của bạn!");
        return;
      }

      await UserServices.updateUser(token, inputValue);

      message.success("Cập nhật tên thành công!");

      setInputValue("");
    } catch (err) {
      console.error("Lỗi thay đổi tên người dùng:", err);
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
                <Input
                  placeholder={user?.name}
                  value={inputValue}
                  onChange={handleChange}
                />
              </BoxChange>
              <div onClick={handleChangeUserName} style={{ cursor: "pointer" }}>
                Thay tên
              </div>
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
                    src={avatar?.img ? avatar.img : user?.img}
                    alt="Avatar"
                  />
                </div>

                <div style={{ position: "relative", display: "inline-block" }}>
                  <input
                    onChange={handleFileChange}
                    type="file"
                    accept="image/*"
                    style={{
                      opacity: 0,
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      cursor: "pointer",
                    }}
                  />
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "2px dashed #ddd",
                      borderRadius: "8px",
                      padding: "8px 15px",
                      width: "135px",
                      height: "30px",
                      backgroundColor: "#f9f9f9",
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#555",
                      cursor: "pointer",
                      transition: "background-color 0.3s, color 0.3s",
                    }}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = "#f0f0f0";
                      e.target.style.color = "#333";
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = "#f9f9f9";
                      e.target.style.color = "#555";
                    }}
                  >
                    Chọn hình ảnh
                  </label>
                </div>

                <div
                  style={{
                    cursor: "pointer",
                    padding: "10px 20px",
                    border: "0.5px solid #bebebe",
                    margin: "10px 0px",
                    textAlign: "center",
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
