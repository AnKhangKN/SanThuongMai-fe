import { IoMdMore } from "react-icons/io";
import { Wrapper } from "./style";
import { useSelector } from "react-redux";

const WalletComponent = () => {
  const user = useSelector((state) => state.user);
  return (
    <>
      <Wrapper>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h5>Ví tiền</h5>
          <div
            style={{ fontSize: "18px", display: "flex", alignItems: "center" }}
          >
            <IoMdMore />
          </div>
        </div>
        <div>
          <div style={{ fontSize: "30px" }}>
            {user?.wallet?.toLocaleString("vi-VN")} VNĐ
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default WalletComponent;
