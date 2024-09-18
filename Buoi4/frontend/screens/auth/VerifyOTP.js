import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import InputBox from "../../components/Form/InputBox";

// Redux hooks
import { verifyOTP } from "../../redux/features/auth/userActions";
import { useDispatch } from "react-redux";

// Import the local image correctly
import verifyOTPImage from "../../assets/logo.png"; // Ensure this path is correct

const VerifyOTP = ({ navigation }) => {
  const [otpCode, setOtpCode] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const dispatch = useDispatch();

  const handleVerifyOTP = () => {
    if (!otpCode || !newPassword) {
      return alert("Please enter the OTP code and your new password");
    }
    dispatch(verifyOTP(otpCode, newPassword));
    // Navigate to Login screen after successful verification
    navigation.navigate("login"); // Ensure the screen name matches your navigation stack
  };

  const handleResendOTP = () => {
    // Dispatch action to resend OTP code
    // dispatch(resendOTP());
    alert("OTP code has been resent to your email.");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Use the imported image */}
        <Image source={verifyOTPImage} style={styles.image} />
        <Text style={styles.infoText}>
          Enter the OTP code sent to your email and set a new password.
        </Text>
        <InputBox
          placeholder="Enter OTP Code"
          value={otpCode}
          setValue={setOtpCode}
          keyboardType="numeric"
        />
        <InputBox
          placeholder="Enter New Password"
          value={newPassword}
          setValue={setNewPassword}
          secureTextEntry={true}
        />

        <TouchableOpacity style={styles.verifyBtn} onPress={handleVerifyOTP}>
          <Text style={styles.verifyBtnText}>Verify & Reset Password</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.resendBtn} onPress={handleResendOTP}>
          <Text style={styles.resendBtnText}>Resend OTP Code</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("login")}
          style={styles.backToLoginBtn}
        >
          <Text style={styles.backToLoginText}>Back to Login</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default VerifyOTP;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  image: {
    height: 150,
    width: "100%",
    resizeMode: "contain",
    marginBottom: 30,
  },
  infoText: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 16,
    color: "#555",
  },
  verifyBtn: {
    backgroundColor: "#28A745",
    width: "100%",
    justifyContent: "center",
    height: 50,
    borderRadius: 5,
    marginTop: 20,
  },
  verifyBtnText: {
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 18,
  },
  resendBtn: {
    marginTop: 20,
    alignItems: "center",
  },
  resendBtnText: {
    color: "#007BFF",
    fontSize: 16,
  },
  backToLoginBtn: {
    marginTop: 20,
    alignItems: "center",
  },
  backToLoginText: {
    color: "#007BFF",
    fontSize: 16,
  },
});
