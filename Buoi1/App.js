import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function IntroductionPage({ navigation }) { 
  
  useEffect(() => {
    // Thiết lập một timer để chuyển đến HomePage sau 10 giây
    const timer = setTimeout(() => {
      navigation.navigate('HomePage');
    }, 10000);

    // Dọn dẹp timer khi component bị unmount
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text>Hi, I'm Son!</Text>
      <Text>I'm a Student.</Text>
      
      <Image
        source={require('./assets/logoHCMUTE.png')} // Đường dẫn tới ảnh trong thư mục dự án
        style={styles.image}
      />

      <StatusBar style="auto" />
      
      {/* Nút điều hướng đến trang Home */}
      <Text style={styles.linkText} onPress={() => navigation.navigate('HomePage')}>
        Go to Home Page
      </Text>
    </View>
  );
}

function HomePage() {
  return (
    <View style={styles.container}>
      <Text>Welcome to the Home Page!</Text>
    </View>
  );
}


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="IntroductionPage">
        <Stack.Screen name="IntroductionPage" component={IntroductionPage} />
        <Stack.Screen name="HomePage" component={HomePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain', // Giữ nguyên tỷ lệ ảnh
    marginTop: 20, // Khoảng cách giữa ảnh và văn bản trên
  },
  linkText: {
    marginTop: 20,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});