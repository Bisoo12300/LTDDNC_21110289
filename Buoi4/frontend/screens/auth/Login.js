import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect } from "react";
import InputBox from "../../components/Form/InputBox";

//redux hooks
import { login } from "../../redux/features/auth/userActions";
import { useDispatch} from "react-redux";
import { useReduxStateHook } from "../../hooks/customeHook";
import loginImage from "../../assets/logo.png";


const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // hooks
  const dispatch = useDispatch();
  // global state

  const loading = useReduxStateHook(navigation, "home");

  // login function
  const handleLogin = async () => {
    if (!email || !password) {
      return alert("Please add email or password");
    }
    
    // Gọi action login và truyền thêm navigation
    dispatch(login(email, password, navigation));
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Use the imported image */}
        <Image source={loginImage} style={styles.image} />
        {loading && <Text style={styles.loadingText}>Loading...</Text>}
        <InputBox
          placeholder="Enter Your Email"
          value={email}
          setValue={setEmail}
          autoComplete="email"
          keyboardType="email-address"
        />
        <InputBox
          value={password}
          setValue={setPassword}
          placeholder="Enter Your Password"
          secureTextEntry={true}
        />

        <TouchableOpacity
          style={styles.forgotPasswordBtn}
          onPress={() => navigation.navigate("ForgotPassword")}
        >
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
            <Text style={styles.loginBtnText}>Login</Text>
          </TouchableOpacity>
          <Text style={styles.registerText}>
            Not a user yet?{" "}
            <Text
              style={styles.link}
              onPress={() => navigation.navigate("register")}
            >
              Register!
            </Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;

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
  loadingText: {
    textAlign: "center",
    marginBottom: 10,
    color: "#555",
  },
  forgotPasswordBtn: {
    alignItems: "flex-end",
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: "#007BFF",
    fontSize: 14,
  },
  btnContainer: {
    alignItems: "center",
  },
  loginBtn: {
    backgroundColor: "#007BFF",
    width: "100%",
    justifyContent: "center",
    height: 50,
    borderRadius: 5,
    marginBottom: 20,
  },
  loginBtnText: {
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 18,
  },
  registerText: {
    fontSize: 16,
    color: "#555",
  },
  link: {
    color: "#007BFF",
    fontWeight: "bold",
  },
});