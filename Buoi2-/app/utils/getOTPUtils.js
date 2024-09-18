import { getDatabase, ref, get } from 'firebase/database';
import { FIREBASE_DATABASE } from '../api/firebaseConfig'; // Điều chỉnh theo cấu trúc dự án của bạn

const getOTPFromDatabase = async (userId, otpId) => {
  const db = getDatabase(FIREBASE_DATABASE);
  const otpRef = ref(db, `otps/${otpId}`);
  
  try {
    const snapshot = await get(otpRef);
    if (snapshot.exists()) {
      return snapshot.val().otp; // Trả về OTP
    } else {
      throw new Error('OTP not found');
    }
  } catch (error) {
    console.error('Error getting OTP:', error.message);
    throw new Error('Error getting OTP');
  }
};
