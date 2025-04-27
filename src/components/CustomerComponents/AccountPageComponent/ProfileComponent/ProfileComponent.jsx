import React from "react";
import { BoxChange, TextNameChange, Wrapper, WrapperChange } from "./style";
import logo from "../../../../assets/images/Logo_Trang.jpg";
import ButtonComponent from "../../ButtonComponent/ButtonComponent";

const ProfileComponent = () => {
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
                <input style={{ width: "50%" }} type="text" />
              </BoxChange>
            </WrapperChange>
            <WrapperChange>
              <TextNameChange>Email</TextNameChange>
              <BoxChange style={{ gap: "20px" }}>
                <div>khang****.com</div>
                <div>Thay đổi</div>
              </BoxChange>
            </WrapperChange>
            <WrapperChange>
              <TextNameChange>Số điện thoại</TextNameChange>
              <BoxChange>Thêm</BoxChange>
            </WrapperChange>
            <WrapperChange>
              <TextNameChange>Giới tính </TextNameChange>
              <BoxChange style={{ gap: "20px" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <input type="radio" />
                  <div>Nam</div>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <input type="radio" />
                  <div>Nữ</div>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <input type="radio" />
                  <div>Khác</div>
                </div>
              </BoxChange>
            </WrapperChange>

            <div style={{ marginLeft: "172px" }}>
              <ButtonComponent name="Lưu" />
            </div>
          </div>
          <div style={{ flex: "0 0 34%" }}>
            <div>
              <div
                style={{
                  width: "50%",
                  margin: "auto ",
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
                    src={logo}
                    alt=""
                  />
                </div>

                <button
                  style={{
                    margin: "20px auto",
                    width: "65%",
                    padding: "10px",
                    border: "00.5px solid rgb(231 231 231)",
                    borderRadius: "4px",
                    outline: "none",
                    backgroundColor: "#fff",
                  }}
                >
                  Chọn ảnh
                </button>
                <div>
                  <div>Dụng lượng file tối đa 1 MB</div>
                  <div>Định dạng:.JPEG, .PNG</div>
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
