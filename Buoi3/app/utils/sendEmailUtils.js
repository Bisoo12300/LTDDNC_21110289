// utils/sendEmailUtils.js
import axiosInstance from './axiosConfig';

const sendOTPEmail = async (email, otp) => {
  try {
    const response = await axiosInstance.post('/sendemail', {
      emailID: email,
      otp,
    });
    if (response.status !== 200) {
      throw new Error(response.data.message);
    }
    console.log('OTP sent successfully');
  } catch (error) {
    console.error('Error sending OTP:', error.message);
    throw new Error('Error sending OTP');
  }
};

export { sendOTPEmail };
