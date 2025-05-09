import React from "react";
import { BoxChange, TextNameChange, Wrapper, WrapperChange } from "./style";
import logo from "../../../../assets/images/Logo_Trang.jpg";
import ButtonComponent from "../../ButtonComponent/ButtonComponent";
import { Input } from "antd";
import { useSelector } from "react-redux";

const ProfileComponent = () => {
  const user = useSelector((state) => state.user);
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
            </WrapperChange>

            <WrapperChange>
              <TextNameChange>Email</TextNameChange>
              <BoxChange style={{ gap: "20px" }}>
                <div>{user?.email}</div>
                <div>Thay đổi</div>
              </BoxChange>
            </WrapperChange>

            <WrapperChange>
              <TextNameChange>Địa chỉ giao hàng</TextNameChange>
              <BoxChange style={{ gap: "20px" }}>Thêm địa chỉ</BoxChange>
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
