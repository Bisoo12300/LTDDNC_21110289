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
import { forgotPassword } from "../../redux/features/auth/userActions";
import { useDispatch } from "react-redux";

const ForgotPassword = ({ navigation }) => {
  const forgotPasswordImage = "https://example.com/forgot-password.png"; // Replace with your image URL
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();

  const handleForgotPassword = () => {
    if (!email) {
      return alert("Please enter your email address");
    }
    dispatch(forgotPassword(email));
    // Navigate to VerifyOTP screen after dispatching the action
    navigation.navigate("VerifyOTP");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={{ uri: forgotPasswordImage }} style={styles.image} />
        <Text style={styles.infoText}>
          Enter your email address below to receive a password reset code.
        </Text>
        <InputBox
          placeholder="Enter Your Email"
          value={email}
          setValue={setEmail}
          autoComplete="email"
          keyboardType="email-address"
        />

        <TouchableOpacity
          style={styles.submitBtn}
          onPress={handleForgotPassword}
        >
          <Text style={styles.submitBtnText}>Submit</Text>
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
  submitBtn: {
    backgroundColor: "#007BFF",
    width: "100%",
    justifyContent: "center",
    height: 50,
    borderRadius: 5,
    marginTop: 20,
  },
  submitBtnText: {
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 18,
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

export default ForgotPassword;
