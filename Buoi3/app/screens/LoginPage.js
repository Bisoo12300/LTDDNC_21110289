import React, { useState, useEffect } from 'react';
import { Alert, Image, Pressable, SafeAreaView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth'; 
import { FIREBASE_AUTH } from '../api/firebaseConfig'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { generateOTP, saveOTPToRealtimeDB } from '../utils/generateOTPUtils';
import { sendOTPEmail } from '../utils/sendEmailUtils';

const logo = require("../../assets/logo.png");
const facebook = require("../../assets/facebook.png");
const google = require("../../assets/search.png");
const twitter = require("../../assets/twitter.png");

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [click, setClick] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const auth = FIREBASE_AUTH;

  useEffect(() => {
    checkRememberMe();
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, username, password);
      const otp = generateOTP(); // Tạo OTP ngẫu nhiên
      const otpId = await saveOTPToRealtimeDB(response.user.uid, otp); // Lưu OTP vào Realtime Database
      
      // Giả sử bạn đã gửi OTP qua email ở nơi khác
      // sendEmailWithOTP(response.user.email, otp); 
      // Gửi OTP qua email
      await sendOTPEmail(response.user.email, otp); 

      Alert.alert('Please verify the OTP sent to your email.');

      if (click) {
        // Lưu thông tin vào AsyncStorage
        await AsyncStorage.setItem('user', JSON.stringify({
          email: username,
          password,
        }));
      }

      // Điều hướng đến trang VerifyOTP với otpId
      navigation.navigate('VerifyOTP', { otpId });
    } catch (error) {
      console.error(error);
      if (error.code === 'auth/user-not-found') {
        Alert.alert('Login failed: User not found');
      } else if (error.code === 'auth/wrong-password') {
        Alert.alert('Login failed: Wrong password');
      } else {
        Alert.alert('Login failed: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const checkRememberMe = async () => {
    const userData = await AsyncStorage.getItem('user');
    if (userData) {
      const { email, password } = JSON.parse(userData);
      try {
        await signInWithEmailAndPassword(auth, email, password);
        navigation.navigate('Home');
      } catch (error) {
        console.error('Auto login failed:', error);
        // Xử lý khi đăng nhập tự động thất bại nếu cần
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={logo} style={styles.image} resizeMode='contain' />
      <Text style={styles.title}>Login</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          placeholder='EMAIL'
          value={username}
          onChangeText={setUsername}
          autoCorrect={false}
          autoCapitalize='none'
        />
        <TextInput
          style={styles.input}
          placeholder='PASSWORD'
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          autoCorrect={false}
          autoCapitalize='none'
        />
      </View>
      <View style={styles.rememberView}>
        <View style={styles.switch}>
          <Switch
            value={click}
            onValueChange={setClick}
            trackColor={{ true: 'green', false: 'gray' }}
          />
          <Text style={styles.rememberText}>Remember Me</Text>
        </View>
        <View>
          <Pressable onPress={() => navigation.navigate('ForgotPassword')}> 
            <Text style={styles.forgetText}>Forgot Password?</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.buttonView}>
        <Pressable style={styles.button} onPress={handleLogin} disabled={loading}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </Pressable>
        <Text style={styles.optionsText}>OR LOGIN WITH</Text>
      </View>
      
      <View style={styles.mediaIcons}>
        <Image source={facebook} style={styles.icons} />
        <Image source={twitter} style={styles.icons} />
        <Image source={google} style={styles.icons} />
      </View>

      <Text style={styles.footerText}>
        Don't have an account?{' '}
        <Text style={styles.register} onPress={() => navigation.navigate('Register')}>
          Register
        </Text>
      </Text>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 70,
  },
  image: {
    height: 160,
    width: 170,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center",
    paddingVertical: 40,
    color: "#2596be",
  },
  inputView: {
    gap: 15,
    width: "100%",
    paddingHorizontal: 40,
    marginBottom: 5,
  },
  input: {
    height: 50,
    paddingHorizontal: 20,
    borderColor: "#2596be",
    borderWidth: 1,
    borderRadius: 7,
  },
  rememberView: {
    width: "100%",
    paddingHorizontal: 50,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 8,
  },
  switch: {
    flexDirection: "row",
    gap: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  rememberText: {
    fontSize: 13,
  },
  forgetText: {
    fontSize: 11,
    color: "#2596be",
  },
  button: {
    backgroundColor: "#2596be",
    height: 45,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonView: {
    width: "100%",
    paddingHorizontal: 50,
  },
  optionsText: {
    textAlign: "center",
    paddingVertical: 10,
    color: "gray",
    fontSize: 13,
    marginBottom: 6,
  },
  mediaIcons: {
    flexDirection: "row",
    gap: 30,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 23,
  },
  icons: {
    width: 40,
    height: 40,
  },
  footerText: {
    textAlign: "center",
    color: "gray",
  },
  register: {
    color: "#2596be",
    fontSize: 13,
  },
});