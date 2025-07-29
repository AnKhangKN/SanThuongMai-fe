import React, { useState } from "react";
import HeaderComponent from "../HeaderComponent/HeaderComponent";
import SidebarComponent from "../SidebarComponent/SidebarComponent";
import {
  ChatBoxAdmin,
  ModalChatBox,
  Wrapper,
  WrapperMain,
  WrapperSidebar,
} from "./style";
import ChatBoxComponents from "../ChatBoxComponents/ChatBoxComponents";

const AdminLayout = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <>
      <div onClick={openModal ? handleCloseModal : undefined}>
        <Wrapper>
          {/* Sidebar */}
          <WrapperSidebar style={{ width: isCollapsed ? "80px" : "260px" }}>
            <SidebarComponent isCollapsed={isCollapsed} />
          </WrapperSidebar>

          {/* Main Content */}
          <WrapperMain>
            <HeaderComponent toggleSidebar={toggleSidebar} />
            {children}
          </WrapperMain>
        </Wrapper>

        {openModal ? (
          <ModalChatBox onClick={(e) => e.stopPropagation()}>
            <ChatBoxComponents onClose={handleCloseModal} />
          </ModalChatBox>
        ) : (
          <>
            <ChatBoxAdmin
              onClick={(e) => {
                e.stopPropagation(); // Ngăn lan sự kiện
                handleOpenModal();
              }}
            >
              Chat
            </ChatBoxAdmin>
          </>
        )}
      </div>
    </>
  );
};

export default AdminLayout;
