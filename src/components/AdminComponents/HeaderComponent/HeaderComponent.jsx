import {
  AccountText,
  IconContainer,
  ModalChatBox,
  ModalInformation,
  ModalNotification,
  WrapperChatBox,
  WrapperInformation,
  WrapperNotification,
} from "./style";
import { HiBars3BottomLeft } from "react-icons/hi2";
import {
  IoChatboxEllipsesOutline,
  IoNotificationsOutline,
} from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as AuthServices from "../../../services/shared/AuthServices";
import { resetUser } from "../../../redux/slices/userSlice";

const HeaderComponent = ({ toggleSidebar }) => {
  const user = useSelector((state) => state.user);
  const avatar = useSelector((state) => state.avatar);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await AuthServices.logoutUser();

      // Xoá access token localStorage
      localStorage.removeItem("access-token");
      localStorage.removeItem("access_token");

      // Reset redux user state
      dispatch(resetUser());

      // Điều hướng về trang login
      handleNavigateLogin();
    } catch (error) {
      console.error("Lỗi khi logout:", error);
    }
  };

  const handleNavigateDashboard = () => {
    navigate("/admin");
  };

  const handleNavigateLogin = () => {
    navigate("/login");
  };

  const handleNavigateProfile = () => {
    navigate("/admin/profile");
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "10px",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "10px",
        }}
      >
        <IconContainer onClick={toggleSidebar}>
          <HiBars3BottomLeft />
        </IconContainer>

        <h3
          onClick={handleNavigateDashboard}
          style={{ margin: "0px 0px 0px 20px", cursor: "pointer" }}
        >
          HKN store
        </h3>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <WrapperNotification>
          <IconContainer>
            <IoNotificationsOutline />
          </IconContainer>

          {/* modal notification */}
          <ModalNotification>
            <div>Chưa có thông báo</div>
          </ModalNotification>
        </WrapperNotification>

        <WrapperChatBox>
          <IconContainer style={{ margin: "0px 20px" }}>
            <IoChatboxEllipsesOutline />
          </IconContainer>

          {/* modal chat box */}
          <ModalChatBox>
            <div>Chưa có tin nhắn</div>
          </ModalChatBox>
        </WrapperChatBox>

        <WrapperInformation>
          <div
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              border: "0.5px solid rgb(155, 155, 155)",
              marginRight: "5px",
            }}
          >
            <img
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                borderRadius: "50%",
              }}
              src={avatar?.avatar ? avatar?.avatar : user?.img} // nếu được làm thêm default img admin
              alt=""
            />
          </div>
          <AccountText>{user?.fullName}</AccountText>

          {/* modal */}
          <ModalInformation>
            <div onClick={handleNavigateProfile}>Thông tin cá nhân</div>
            <div onClick={handleLogout}>Đăng xuất</div>
          </ModalInformation>
        </WrapperInformation>
      </div>
    </div>
  );
};

export default HeaderComponent;
