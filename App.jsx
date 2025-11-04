import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native'; // Added missing imports
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import LottieView from 'lottie-react-native';

export default function App() {
  const toastConfig = {
    otpNotification: ({ props }) => (
      <View style={styles.toastContainer}>
        {/* <Text style={styles.toastTitle}>Your Premium OTP</Text> */}
        <Text style={styles.toastTitle}>
          Your verification code is: <Text style={styles.toastTitle}>{props.otp}</Text>
        </Text>
        <Text style={styles.toastTitle2}>{"redircting in 5 sec..."}</Text>
        <View style={styles.decorativeLine} />
      </View>
    )
  };

  const SuccessToast = ({ text1, text2 }) => (
    <View style={styles.successToast}>
      <LottieView
        // source={require('./assets/success.json')}
        autoPlay
        loop={false}
        style={{ width: 80, height: 80 }}
      />
      <Text style={styles.successTitle}>{text1}</Text>
      <Text style={styles.successMessage}>{text2}</Text>
    </View>
  );

  // Toast.configure({
  //   successFancy: (props) => <SuccessToast {...props} />
  // });

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <AppNavigator />
          {/* Toast should be rendered after your main content */}
          <Toast config={toastConfig} />
        </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  toastContainer: {
    width: '90%',
    backgroundColor: '#1a1a1a',
    padding: 20,
    borderRadius: 12,
    borderLeftColor: 'black',
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  toastTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign:"center"
  },
  toastTitle2: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign:"center"
  },
  toastMessage: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 12,
  },
  otpText: {
    color: '#FFD700',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 2,
  },
  decorativeLine: {
    height: 2,
    backgroundColor: 'white',
    width: '30%',
    alignSelf: 'center',
    marginTop: 8,
  },
  successToast: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  successTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2E7D32',
    marginTop: 8
  },
  successMessage: {
    fontSize: 14,
    color: '#444'
  }
});