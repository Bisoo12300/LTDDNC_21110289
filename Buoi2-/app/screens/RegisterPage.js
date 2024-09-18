import React, { useState } from 'react';
import { Image, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from '../api/firebaseConfig'; 
import { generateOTP, saveOTPToRealtimeDB } from '../utils/verifyOTPUtils';

const logo = require("../../assets/logo.png");

const RegisterPage = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const handleRegister = async () => {
    console.log('Register initiated');
    console.log('Username:', username);
    console.log('Password:', password);
  
    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match');
      return;
    }
  
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(auth, username, password);
      console.log('User created:', response);
      const otp = generateOTP();
      const otpId = await saveOTPToRealtimeDB(response.user.uid, otp);
      Alert.alert('Registration successful. Please verify your OTP.');
      navigation.navigate('VerifyOTP', { otpId, email: username });
      
    } catch (error) {
      console.error('Registration error:', error);
      if (error.code === 'auth/weak-password') {
        Alert.alert('Registration failed', 'The password is too weak');
      } else if (error.code === 'auth/email-already-in-use') {
        Alert.alert('Registration failed', 'The email address is already in use');
      } else {
        Alert.alert('Registration failed', error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={logo} style={styles.image} resizeMode='contain' />
      <Text style={styles.title}>Register</Text>
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
        <TextInput
          style={styles.input}
          placeholder='CONFIRM PASSWORD'
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          autoCorrect={false}
          autoCapitalize='none'
        />
      </View>

      <View style={styles.buttonView}>
        <Pressable style={styles.button} onPress={handleRegister} disabled={loading}>
          <Text style={styles.buttonText}>REGISTER</Text>
        </Pressable>
      </View>

      <Text style={styles.footerText}>
        Already have an account? 
        <Text style={styles.login} onPress={() => navigation.navigate('Login')}>
          Login
        </Text>
      </Text>
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
  image: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  inputView: {
    width: '100%',
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
  buttonView: {
    marginVertical: 20,
    width: '100%',
    alignItems: 'center',
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
  footerText: {
    marginTop: 20,
  },
  login: {
    color: '#2596be',
  },
});

export default RegisterPage;
