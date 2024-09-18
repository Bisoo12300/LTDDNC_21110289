import { getDatabase, ref, get, update } from 'firebase/database';

// Hàm kiểm tra OTP
export const verifyOTPInRealtimeDB = async (otpId, otpInput) => {
  const db = getDatabase();
  const otpRef = ref(db, `otps/${otpId}`);
  
  const snapshot = await get(otpRef);
  if (snapshot.exists()) {
    const otpData = snapshot.val();
    const currentTime = new Date();
    
    // Kiểm tra và xác nhận rằng otp_code và otpInput là chuỗi
    if (otpData && typeof otpData.otp_code === 'string' && typeof otpInput === 'string') {
      if (otpData.otp_code === otpInput && !otpData.is_used && new Date(otpData.expires_at) > currentTime) {
        // Đánh dấu OTP là đã sử dụng
        await update(otpRef, { is_used: true });
        return true;
      } else {
        console.error('OTP không hợp lệ hoặc đã hết hạn.');
        return false;
      }
    } else {
      console.error('OTP hoặc dữ liệu xác minh không phải là chuỗi hợp lệ.');
      return false;
    }
  } else {
    console.error('Không tìm thấy OTP.');
    return false;
  }
};
