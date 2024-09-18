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
import { useDispatch } from "react-redux";
import { register } from "../../redux/features/auth/userActions";
import { useReduxStateHook } from "../../hooks/customeHook";

// Import the local image correctly
import registerImage from "../../assets/logo.png";

const Register = ({ navigation }) => {
  const dispatch = useDispatch();

  // Remove the incorrect string assignment
  // const registerImage = "../../assets/logo.png"; 

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [answer, setAnswer] = useState("");
  const [country, setCountry] = useState("VietNam");

  const handleRegister = () => {
    // Validation
    if (!email || !password || !name || !address || !city || !phone) {
      return alert("Please provide all required fields.");
    }
    const formData = {
      email,
      password,
      name,
      address,
      city,
      phone,
      answer,
      country,
    };
    dispatch(register(formData));
  };

  const loading = useReduxStateHook(navigation, "login");

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Use the imported image */}
        <Image source={registerImage} style={styles.image} />
        {loading && <Text style={styles.loadingText}>Loading...</Text>}
        <InputBox
          placeholder="Enter Your Name"
          value={name}
          setValue={setName}
        />
        <InputBox
          placeholder="Enter Your Email"
          value={email}
          setValue={setEmail}
          keyboardType="email-address"
        />
        <InputBox
          value={password}
          setValue={setPassword}
          placeholder="Enter Your Password"
          secureTextEntry={true}
        />
        <InputBox
          placeholder="Enter Your Address"
          value={address}
          setValue={setAddress}
        />
        <InputBox
          placeholder="Enter Your City"
          value={city}
          setValue={setCity}
        />
        <InputBox
          placeholder="Enter Your Contact Number"
          value={phone}
          setValue={setPhone}
          keyboardType="phone-pad"
        />
        <InputBox
          placeholder="Enter Your Favorite Dish"
          value={answer}
          setValue={setAnswer}
        />
        <TouchableOpacity
          style={styles.registerBtn}
          onPress={handleRegister}
        >
          <Text style={styles.registerBtnText}>Register</Text>
        </TouchableOpacity>
        <View style={styles.loginRedirect}>
          <Text style={styles.loginText}>
            Already have an account?{" "}
            <Text
              style={styles.link}
              onPress={() => navigation.navigate("login")}
            >
              Login
            </Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Register;

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
    marginBottom: 20,
  },
  loadingText: {
    textAlign: "center",
    marginBottom: 10,
    color: "#555",
  },
  registerBtn: {
    backgroundColor: "#007BFF",
    width: "100%",
    justifyContent: "center",
    height: 50,
    borderRadius: 5,
    marginTop: 20,
  },
  registerBtnText: {
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 18,
  },
  loginRedirect: {
    marginTop: 20,
    alignItems: "center",
  },
  loginText: {
    fontSize: 16,
    color: "#555",
  },
  link: {
    color: "#007BFF",
    fontWeight: "bold",
  },
});
