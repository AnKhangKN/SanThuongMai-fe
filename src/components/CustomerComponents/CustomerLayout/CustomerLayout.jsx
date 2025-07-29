import React, { useState } from "react";
import HeaderComponent from "../HeaderComponent/HeaderComponent";
import ChatBoxComponents from "../../AdminComponents/ChatBoxComponents/ChatBoxComponents";
import { ModalChatBox, ChatButton } from "./style";

const CustomerLayout = ({ children }) => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <div onClick={openModal ? handleCloseModal : undefined}>
      <HeaderComponent />
      {children}

      {openModal ? (
        <ModalChatBox onClick={(e) => e.stopPropagation()}>
          <ChatBoxComponents onClose={handleCloseModal} />
        </ModalChatBox>
      ) : (
        <ChatButton
          onClick={(e) => {
            e.stopPropagation(); // Ngăn lan sự kiện
            handleOpenModal();
          }}
        >
          💬
        </ChatButton>
      )}
    </div>
  );
};

export default CustomerLayout;
