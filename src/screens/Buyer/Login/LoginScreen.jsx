import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import Toast from 'react-native-toast-message';
import AppText from '../../../components/AppText';
import * as Animatable from 'react-native-animatable';
import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleProceed = async () => {
    if (mobileNumber.length !== 10) return;

    setIsLoading(true);

    try {
      const response = await axios.post(
        'http://192.168.1.52:9000/api/auth/login',
        {
          name: userName,
          mobileNumber,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      console.log('data : ', response.data);

      if (response.status === 200) {
        // Show premium OTP notification
        Toast.show({
          type: 'otpNotification',
          position: 'top',
          visibilityTime: 5000,
          autoHide: true,
          props: {
            otp: response.data.otp,
          },
          onShow: () => console.log('Toast shown'),
          onHide: () =>
            navigation.navigate('OTPVerification', {
              mobileNumber,
              userName,
              token: response.data.token,
            }),
        });
      } else {
        throw new Error(response.data.message || 'Failed to send OTP');
      }
    } catch (error) {
      // Axios wraps the error response in error.response
      const errorMessage = error.response?.data?.message || error.message;

      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: errorMessage,
        visibilityTime: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    navigation.navigate('BuyerMain');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0} // Adjust if needed
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <Animatable.View
          animation="fadeInDown"
          duration={1000}
          style={styles.titleContainer}>
          <Image
            source={require('../../../assets/logo.png')}
            style={styles.logo}
          />
          <AppText weight="Inter" style={styles.subtitle}>
            Your Premium Window to Better Deals
          </AppText>
        </Animatable.View>

        <Animatable.View animation="fadeInUp" delay={300} duration={800}>
          {/* User Name Input */}
          <View style={styles.inputRow}>
            <TextInput
              style={[styles.input, {marginLeft: 4}]}
              placeholder="Enter your name"
              value={userName}
              onChangeText={setUserName}
              placeholderTextColor="#999"
            />
          </View>

          {/* Mobile Number Input */}
          <View style={styles.inputRow}>
            <Image
              source={require('../../../assets/Flag_of_India.svg.webp')}
              style={styles.flag}
            />
            <Text style={styles.countryCode}>+91</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter mobile number"
              keyboardType="phone-pad"
              maxLength={10}
              value={mobileNumber}
              onChangeText={setMobileNumber}
              placeholderTextColor="#999"
            />
          </View>

          {mobileNumber.length === 10 && (
            <TouchableOpacity
              style={styles.button}
              onPress={handleProceed}
              disabled={isLoading}>
              <AppText weight="Inter" style={styles.buttonText}>
                {isLoading ? 'Sending...' : 'Get OTP'}
              </AppText>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
            <AppText weight="Inter" style={styles.skipButtonText}>
              Skip
            </AppText>
          </TouchableOpacity>
        </Animatable.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: 'center',
    marginBottom: 25,
  },
  logo: {
    width: 300,
    height: 200,
    resizeMode: 'contain',
  },
  subtitle: {
    fontSize: 18,
    color: '#333',
    // fontWeight: '500',
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    flexDirection: 'column',
    alignItems: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: 40,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 0.5,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 30,
  },
  flag: {
    width: 24,
    height: 16,
    resizeMode: 'contain',
    marginRight: 8,
  },
  countryCode: {
    fontSize: 16,
    color: '#000',
    marginRight: 8,
    borderRightWidth: 1,
    paddingVertical: 10,
    paddingRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 14,
    marginBottom: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  skipButton: {
    backgroundColor: 'transparent',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
  },
  skipButtonText: {
    color: '#000',
    fontSize: 16,
  },
});

export default LoginScreen;
