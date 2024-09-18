import axios from 'axios';

// Tạo instance axios với cấu hình mặc định
const instance = axios.create({
  baseURL: 'https://btt2-67904-default-rtdb.asia-southeast1.firebasedatabase.app/sendermail.json ', // Thay đổi thành URL của máy chủ backend của bạn
  timeout: 10000, // Thời gian chờ (millisecond)
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

instance.interceptors.response.use(
  response => response,
  error => {
    // Xử lý lỗi ở đây
    console.error('API Error:', error.response ? error.response.data : error.message);
    return Promise.reject(error);
  }
);

export default instance;