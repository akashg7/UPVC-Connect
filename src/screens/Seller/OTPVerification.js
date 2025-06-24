// import React, { useState, useRef, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
// } from 'react-native';
// import { sellerStyles } from '../../styles/sellerStyles';
// import OTPInput from '../../components/Seller/OTPInput';

// const SellerOTPVerification = ({ route, navigation }) => {
//   const { sellerData, phone } = route.params;
//   const [otp, setOtp] = useState(['', '', '', '', '', '']);
//   const [error, setError] = useState('');
//   const [timer, setTimer] = useState(60);
//   const inputs = Array(6).fill(0).map(() => useRef());

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTimer((prev) => (prev > 0 ? prev - 1 : 0));
//     }, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   const handleOtpChange = (text, index) => {
//     const newOtp = [...otp];
//     newOtp[index] = text;
//     setOtp(newOtp);

//     if (text && index < 5) {
//       inputs[index + 1].current.focus();
//     } else if (!text && index > 0) {
//       inputs[index - 1].current.focus();
//     }
//   };

//   const verifyOTP = () => {
//     const enteredOtp = otp.join('');
//     if (enteredOtp.length !== 6) {
//       setError('Please enter a 6-digit OTP');
//       return;
//     }

//     // In a real app, verify OTP with your backend
//     // For demo, we'll assume OTP is correct
//     if (enteredOtp === '123456') {
//       // navigation.replace('PendingApproval', { sellerData });
//       // navigation.replace('SellerDashboard', { sellerData }); 
//       navigation.replace('SellerMain', {
//         screen: 'SellerDashboard',
//         params: { sellerData },
//       });
//     } else {
//       setError('Incorrect OTP. Please try again.');
//     }
//   };

//   const resendOTP = () => {
//     if (timer > 0) return;
    
//     // Resend OTP logic
//     Alert.alert('OTP Resent', 'A new OTP has been sent to your phone');
//     setTimer(60);
//     setOtp(['', '', '', '', '', '']);
//     setError('');
//     inputs[0].current.focus();
//   };

//   return (
//     <View style={sellerStyles.container}>
//       <Text style={[sellerStyles.headline, { marginBottom: 32 }]}>
//         Verify Your Phone
//       </Text>
//       <Text style={[sellerStyles.subhead, { marginBottom: 32 }]}>
//         Enter the OTP sent to {phone} to unlock leads!
//       </Text>

//       <View style={sellerStyles.otpContainer}>
//         {otp.map((digit, index) => (
//           <OTPInput
//             key={index}
//             ref={inputs[index]}
//             value={digit}
//             onChangeText={(text) => handleOtpChange(text, index)}
//             onKeyPress={({ nativeEvent }) => {
//               if (nativeEvent.key === 'Backspace' && !digit && index > 0) {
//                 inputs[index - 1].current.focus();
//               }
//             }}
//           />
//         ))}
//       </View>

//       {error ? <Text style={sellerStyles.errorText}>{error}</Text> : null}

//       <TouchableOpacity style={sellerStyles.button} onPress={verifyOTP}>
//         <Text style={sellerStyles.buttonText}>Verify & Submit</Text>
//       </TouchableOpacity>

//       <TouchableOpacity
//         onPress={resendOTP}
//         disabled={timer > 0}
//         style={{ alignSelf: 'center', marginTop: 24 }}
//       >
//         <Text
//           style={{
//             color: timer > 0 ? '#95A5A6' : '#2E86C1',
//             fontSize: 16,
//           }}
//         >
//           {timer > 0
//             ? `Resend OTP in ${timer}s`
//             : "Didn't receive OTP? Resend"}
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default SellerOTPVerification;

import React, { useState } from 'react';
import { View, Text, Alert, Keyboard, ActivityIndicator } from 'react-native';
import { styles } from './styles'; 
import { OtpInput } from "react-native-otp-entry"; 
import PrimaryButton from '../../components/UI/PrimaryButton';
import ResendTimer from '../../components/UI/ResendTimer';
import AppText from '../../components/AppText';

const SellerOTPVerification = ({ route, navigation }) => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const { phone } = route.params;
 
  const handleVerify = (submittedOtp = otp) => {
    Keyboard.dismiss();
    setLoading(true);
    setTimeout(() => {
      navigation.replace('WelcomeProfileSetup');
            // navigation.replace('SellerMain', {
        // screen: 'SellerDashboard'
        // screen: 'WelcomeProfileSetup'
        // params: { sellerData },
      // });
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
        <AppText weight='Bold' style={styles.title}>Verification code</AppText>
        <AppText weight='Inter' style={styles.subTitle}>
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

export default SellerOTPVerification;