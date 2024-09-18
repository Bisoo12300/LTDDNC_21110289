import React, { useState } from 'react';
import { Alert, Button, SafeAreaView, StyleSheet, TextInput, View } from 'react-native';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

const auth = getAuth();

const ForgetPassword = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendResetEmail = async () => {
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert('Success', 'Password reset email sent!');
      navigation.goBack(); // Go back to the previous screen
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to send password reset email: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <Button
          title={loading ? 'Sending...' : 'Send Password Reset Email'}
          onPress={handleSendResetEmail}
          disabled={loading}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  innerContainer: {
    width: '80%',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default ForgetPassword;
