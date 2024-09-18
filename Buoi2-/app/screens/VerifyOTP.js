import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, Pressable, View, Alert } from 'react-native';
import { getDatabase, ref, get, update } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { verifyOTPInRealtimeDB } from '../utils/verifyOTPUtils';

console.log(verifyOTPInRealtimeDB);

const VerifyOTP = ({ route, navigation }) => {
  const { otpId, email } = route.params;
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = getAuth();

  const handleVerifyOTP = async () => {
    setLoading(true);
    try {
      const isValid = await verifyOTPInRealtimeDB(otpId, otp);
      if (isValid) {
        // OTP hợp lệ, cho phép người dùng đăng nhập
        Alert.alert('OTP Verified', 'You are now logged in!');
        navigation.navigate('Home');  // Điều hướng người dùng đến trang chính hoặc trang cần đăng nhập
      } else {
        Alert.alert('Invalid OTP', 'The OTP you entered is incorrect or has expired.');
      }
    } catch (error) {
      console.error('Verification error:', error);
      Alert.alert('Verification failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Verify OTP</Text>
      <TextInput
        style={styles.input}
        placeholder='Enter OTP'
        value={otp}
        onChangeText={setOtp}
        keyboardType='numeric'
        autoCorrect={false}
        autoCapitalize='none'
      />
      <Pressable style={styles.button} onPress={handleVerifyOTP} disabled={loading}>
        <Text style={styles.buttonText}>VERIFY OTP</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#2596be',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 10,
    width: '100%',
  },
  button: {
    backgroundColor: '#2596be',
    padding: 10,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default VerifyOTP;
