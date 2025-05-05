import React, { useState } from 'react';
import { View, Text, Alert, Keyboard } from 'react-native';
import { styles } from './styles'; 
import { OtpInput } from "react-native-otp-entry";
import PrimaryButton from '../../../components/UI/PrimaryButton';
import ResendTimer from '../../../components/UI/ResendTimer';

const OTPVerification = ({ route, navigation }) => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const { phone } = route.params;

  // const handleVerify = () => {
  //   Keyboard.dismiss();
    
  //   if (otp.length !== 6) {
  //     Alert.alert('Incomplete OTP', 'Please enter the full 6-digit OTP');
  //     return;
  //   }

  //   console.log("Otp : " , otp)
  //   setLoading(true);
    
  //   // Simulate verification
  //   setTimeout(() => {
  //     setLoading(false);
  //     console.log("Otp : " , otp)
  //     if (otp === '123456') { // Replace with actual OTP check
  //       // navigation.replace('BuyerDashboard');
  //       navigation.replace('HomeDashboard'); 
  //     } else {
  //       Alert.alert('Invalid OTP', 'The OTP you entered is incorrect');
  //     }
  //   }, 1500);
  // };

  const handleVerify = (submittedOtp = otp) => {
    Keyboard.dismiss();
  
    if (submittedOtp.length !== 6) {
      Alert.alert('Incomplete OTP', 'Please enter the full 6-digit OTP');
      return;
    }
  
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log("Otp: ", submittedOtp);
      if (submittedOtp === '123456') {
        // navigation.replace('HomeDashboard');
        navigation.replace('BuyerMain');
      } else {
        Alert.alert('Invalid OTP', 'The OTP you entered is incorrect');
      }
    }, 1500);
  };
  
  
  // Format phone number for display (shows last 3 digits)
  const formattedPhone = phone ? `+91 ******${phone.slice(-3)}` : '';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify Your Phone</Text>
      <Text style={styles.subTitle}>
        Enter the OTP sent to {formattedPhone}
      </Text>

      <OtpInput
        numberOfDigits={6}
        focusColor="#4CAF50" // Using your theme color
        onTextChange={(text) => setOtp(text)}
        onFilled={(text) => {
          setOtp(text);
          handleVerify(text); // Use freshly filled OTP directly
        }}
        theme={{
          containerStyle: styles.otpContainer,
          pinCodeContainerStyle: styles.pinCodeContainer,
          pinCodeTextStyle: styles.pinCodeText,
          focusStickStyle: styles.focusStick,
          focusedPinCodeContainerStyle: styles.activePinCodeContainer,
          filledPinCodeContainerStyle: styles.filledPinCodeContainer,
        }}
      />

      <ResendTimer 
        duration={30} 
        onResend={() => {
          Alert.alert('OTP Resent', 'New OTP has been sent to your number');
          // Here you would typically call your OTP resend API
          setOtp(''); // Clear current OTP input
        }}
      />

      <PrimaryButton
        title="Verify & Submit"
        onPress={handleVerify}
        loading={loading}
        disabled={otp.length < 6}
        style={styles.button}
      />
    </View>
  );
};

export default OTPVerification;