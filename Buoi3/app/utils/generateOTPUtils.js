import { getDatabase, ref, set } from 'firebase/database';
import { generateUUID } from './uuidUtils'; // Thay thế phương pháp tạo UUID nếu cần

// Hàm tạo OTP ngẫu nhiên
export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Hàm chuyển đổi thời gian UTC sang GMT+7
const convertToGMT7 = (date) => {
  // Cộng thêm 7 giờ (7 * 60 * 60 * 1000 ms) vào thời gian hiện tại
  const gmt7Date = new Date(date.getTime() + (7 * 60 * 60 * 1000));
  return gmt7Date.toISOString();
};

// Hàm lưu OTP vào Realtime Database
export const saveOTPToRealtimeDB = async (userId, otp) => {
  const db = getDatabase();
  const otpId = generateUUID(); // Sử dụng phương pháp tạo UUID mới
  const otpRef = ref(db, `otps/${userId}/${otpId}`);
  
  const now = new Date();
  
  await set(otpRef, {
    otp_code: otp,
    expires_at: convertToGMT7(new Date(now.getTime() + 10 * 60 * 1000)), // OTP expires in 10 minutes
    is_used: false,
    created_at: convertToGMT7(now),
  });

  return otpId;
};
