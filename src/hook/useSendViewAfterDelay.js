import { useEffect, useRef } from "react";
import axios from "axios";
import * as ValidateToken from "../utils/tokenUtils";

/**
 * Gửi request sau delay nếu vẫn còn ở trang, chỉ gửi 1 lần.
 *
 * @param {string} productId - ID sản phẩm cần gửi.
 * @param {number} delayMs - Thời gian chờ (ms). Mặc định 3000.
 * @param {string} url - URL endpoint để gửi
 */
const useSendViewAfterDelay = (
  productId,
  delayMs = 5000,
  url = `${process.env.REACT_APP_API_URL}/ai/products/view-log`
) => {
  const timeoutRef = useRef(null);
  const isSentRef = useRef(false);

  useEffect(() => {
    if (!productId) return;

    isSentRef.current = false;

    timeoutRef.current = setTimeout(() => {
      const sendView = async () => {
        try {
          const accessToken = await ValidateToken.getValidAccessToken();

          await axios.post(
            url,
            {
              productId,
              timestamp: new Date().toISOString(),
            },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          console.log(`Gửi view cho sản phẩm ${productId}`);
          isSentRef.current = true;
        } catch (err) {
          console.error("Lỗi gửi view:", err);
        }
      };

      if (!isSentRef.current) {
        sendView();
      }
    }, delayMs);

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [productId, delayMs, url]);
};

export default useSendViewAfterDelay;
