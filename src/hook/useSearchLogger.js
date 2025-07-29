import axios from "axios";

/**
 * Gửi keyword lên server để lưu lại hành vi tìm kiếm
 * @returns { logSearch: (keyword: string) => Promise<void> }
 */
const useSearchLogger = () => {
  const logSearch = async (keyword) => {
    try {
      if (!keyword || keyword.trim() === "") return;

      await axios.post(`${process.env.REACT_APP_API_URL}/ai/search/key-word`, {
        keyword: keyword.trim(),
      });
    } catch (error) {
      console.error("Lỗi khi lưu keyword tìm kiếm:", error);
    }
  };

  return { logSearch };
};

export default useSearchLogger;
