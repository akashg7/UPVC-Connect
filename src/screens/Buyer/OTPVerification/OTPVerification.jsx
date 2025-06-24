import React, { useState } from 'react';
import { View, Text, Alert, Keyboard, ActivityIndicator } from 'react-native';
import { styles } from './styles'; 
import { OtpInput } from "react-native-otp-entry";
import PrimaryButton from '../../../components/UI/PrimaryButton';
import ResendTimer from '../../../components/UI/ResendTimer';
import AppText from '../../../components/AppText';

const OTPVerification = ({ route, navigation }) => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const { phone } = route.params;
 
  const handleVerify = (submittedOtp = otp) => {
    Keyboard.dismiss();
    setLoading(true);
    setTimeout(() => {
      navigation.replace('BuyerMain');
    }, 2000);
  };
  
  const resendOtp = () => {
    if (!canResend) return;
    Alert.alert('OTP Resent', 'New OTP has been sent to your number'); 
    setOtp('');
    setCanResend(false);
  }

  const formattedPhone = phone ? `+91 ******${phone.slice(-3)}` : '';

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="black" /> 
        </View>
      )}
      
      <View style={loading ? styles.contentBlurred : styles.contentNormal}>
        <AppText weight="Bold" style={styles.title}>Verification code</AppText>
        <AppText weight="Inter" style={styles.subTitle}>
          Enter the 4-digit code sent on {formattedPhone}
        </AppText> 

        <OtpInput
          numberOfDigits={4} 
          focusColor="black"
          onTextChange={(text) => setOtp(text)}
          onFilled={(text) => {
            setOtp(text);
            handleVerify(text); 
          }}
          theme={{
            containerStyle: styles.otpContainer,
            pinCodeContainerStyle: styles.pinCodeContainer,
            pinCodeTextStyle: styles.pinCodeText,
            focusStickStyle: styles.focusStick,
            focusedPinCodeContainerStyle: styles.activePinCodeContainer,
            filledPinCodeContainerStyle: styles.filledPinCodeContainer,
          }}
          autoFocus={true}
          hideStick={false}
          disabled={loading}
        />

        <ResendTimer 
          duration={30} 
          onResend={() => setCanResend(true)}
        />

        {!loading && (
          <PrimaryButton 
            title="Resend OTP"
            onPress={resendOtp}
            style={[
              styles.resendButton,
              !canResend && styles.disabledButton
            ]}
            disabled={!canResend || loading}
          />
        )}
      </View>
    </View>
  );
};

export default OTPVerification;