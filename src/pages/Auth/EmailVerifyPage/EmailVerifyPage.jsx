import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EmailVerifyPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("Đang xác nhận email...");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/shared/auth/verify-email/${token}`,
          {
            method: "GET",
          }
        );
        const data = await response.json();
        if (data.status === "SUCCESS") {
          setMessage("Xác nhận email thành công! Đang chuyển hướng...");
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        } else {
          setMessage(data.message || "Xác nhận email thất bại.");
        }
      } catch (error) {
        setMessage("Đã xảy ra lỗi trong quá trình xác nhận.");
      }
    };

    if (token) {
      verifyEmail();
    }
  }, [token, navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>{message}</h2>
    </div>
  );
};

export default EmailVerifyPage;
