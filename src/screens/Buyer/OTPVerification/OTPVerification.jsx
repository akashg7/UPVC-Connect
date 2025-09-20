import React, {useState, useEffect} from 'react';
import {View, Text, Alert, Keyboard, ActivityIndicator} from 'react-native';
import {OtpInput} from 'react-native-otp-entry';
import PrimaryButton from '../../../components/UI/PrimaryButton';
import ResendTimer from '../../../components/UI/ResendTimer';
import AppText from '../../../components/AppText';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import {styles} from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SmsRetriever from 'react-native-sms-retriever';

const OTPVerification = ({route, navigation}) => {
  const {mobileNumber, userName, token , autootp} = route.params;
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const [countdown, setCountdown] = useState(30);
  console.log("autootp : " , autootp)
  // Countdown timer for resend OTP
  // useEffect(()=>{
  //   if (autootp) setOtp(autootp)
  // } , [])
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  useEffect(() => {
    const getAppHash = async () => {
      try {
        const hash = await SmsRetriever.getAppSignature();
        console.log('App hash:', hash);
      } catch (error) {
        console.log('Failed to get app hash:', error);
      }
    };
    getAppHash();
  }, []);

  useEffect(() => {
    const startListeningForOtp = async () => {
      try {
        const registered = await SmsRetriever.startSmsRetriever();

        if (registered) {
          SmsRetriever.addSmsListener(event => {
            const message = event.message;
            console.log('Received SMS:', message);

            const otpRegex = /(\d{4})/;
            const match = message.match(otpRegex);
            if (match) {
              setOtp(match[1]);
              handleVerify(match[1]);
            }

            SmsRetriever.removeSmsListener();
          });
        }
      } catch (error) {
        console.warn('SMS Retriever error:', error);
      }
    };

    startListeningForOtp();

    return () => SmsRetriever.removeSmsListener();
  }, []);

  const handleVerify = async (submittedOtp = otp) => {
    Keyboard.dismiss();

    if (submittedOtp.length !== 4) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: 'Please enter a 4-digit OTP',
        visibilityTime: 3000,
      });
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        'https://upvc-backend-oh6m.onrender.com/api/auth/verify-otp',
        {
          mobileNumber,
          otp: submittedOtp,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.status === 200) {
        await AsyncStorage.setItem('buyerToken', response.data.token);
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Success',
          text2: 'OTP verified successfully',
          visibilityTime: 3000,
        });
        console.log('response : ', response.data);
        // navigation.replace('BuyerMain');
        navigation.reset({
          index: 0,
          routes: [{ name: 'BuyerMain' }],
        });

      } else {
        throw new Error(response.data.message || 'Verification failed');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: errorMessage,
        visibilityTime: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    if (!canResend) return;

    try {
      setLoading(true);
      const response = await axios.post(
        'https://upvc-backend-oh6m.onrender.com/api/auth/login',
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

      if (response.status === 200) {
        Toast.show({
          type: 'otpNotification',
          position: 'top',
          visibilityTime: 5000,
          autoHide: true,
          props: {
            otp: response.data.otp,
          },
          onShow: () => console.log('New OTP shown'),
        });

        setOtp('');
        setCanResend(false);
        setCountdown(30);
      } else {
        throw new Error(response.data.message || 'Failed to resend OTP');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: errorMessage,
        visibilityTime: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  const formattedPhone = mobileNumber
    ? `+91 ******${mobileNumber.slice(-3)}`
    : '';

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="black" />
        </View>
      )}

      <View style={loading ? styles.contentBlurred : styles.contentNormal}>
        <AppText weight="Bold" style={styles.title}>
          Verification code
        </AppText>
        <AppText weight="Inter" style={styles.subTitle}>
          Enter the 4-digit code sent to {formattedPhone}
        </AppText>

        <OtpInput
          numberOfDigits={4}
          focusColor="black"
          onTextChange={text => setOtp(text)}
          onFilled={text => handleVerify(text)}
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

        {/* <ResendTimer 
          duration={countdown}
          onResend={() => setCanResend(true)}
        /> */}

        <PrimaryButton
          title={canResend ? 'Resend OTP' : `Resend in ${countdown}s`}
          onPress={resendOtp}
          style={[styles.resendButton, !canResend && styles.disabledButton]}
          disabled={!canResend || loading}
        />
      </View>
    </View>
  );
};

export default OTPVerification;

// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Keyboard,
//   ActivityIndicator,
// } from 'react-native';
// import {OtpInput} from 'react-native-otp-entry';
// import PrimaryButton from '../../../components/UI/PrimaryButton';
// import AppText from '../../../components/AppText';
// import Toast from 'react-native-toast-message';
// import axios from 'axios';
// import {styles} from './styles';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const OTPVerification = ({route, navigation}) => {
//   const [otp, setOtp] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [canResend, setCanResend] = useState(false);
//   const [countdown, setCountdown] = useState(30);
//   const {mobileNumber, userName, token} = route.params;

//   // Countdown logic
//   useEffect(() => {
//     if (countdown > 0) {
//       const timer = setTimeout(() => setCountdown(prev => prev - 1), 1000);
//       return () => clearTimeout(timer);
//     } else {
//       setCanResend(true);
//     }
//   }, [countdown]);

//   const handleVerify = async (submittedOtp = otp) => {
//     Keyboard.dismiss();

//     if (submittedOtp.length !== 4) {
//       Toast.show({
//         type: 'error',
//         position: 'top',
//         text1: 'Error',
//         text2: 'Please enter a 4-digit OTP',
//         visibilityTime: 3000,
//       });
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await axios.post(
//         'https://upvc-backend-oh6m.onrender.com/api/auth/verify-otp',
//         {mobileNumber, otp: submittedOtp},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         },
//       );

//       if (response.status === 200) {
//         await AsyncStorage.setItem('buyerToken', response.data.token);
//         Toast.show({
//           type: 'success',
//           position: 'top',
//           text1: 'Success',
//           text2: 'OTP verified successfully',
//           visibilityTime: 3000,
//         });
//         navigation.replace('BuyerMain');
//       } else {
//         throw new Error(response.data.message || 'Verification failed');
//       }
//     } catch (error) {
//       const errorMessage = error.response?.data?.message || error.message;
//       Toast.show({
//         type: 'error',
//         position: 'top',
//         text1: 'Error',
//         text2: errorMessage,
//         visibilityTime: 4000,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resendOtp = async () => {
//     if (!canResend) return;
//     try {
//       setLoading(true);
//       const response = await axios.post(
//         'https://upvc-backend-oh6m.onrender.com/api/auth/login',
//         {
//           name: userName,
//           mobileNumber,
//         },
//         {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         },
//       );

//       if (response.status === 200) {
//         Toast.show({
//           type: 'otpNotification',
//           position: 'top',
//           visibilityTime: 5000,
//           autoHide: true,
//           props: {
//             otp: response.data.otp,
//           },
//         });

//         setOtp('');
//         setCanResend(false);
//         setCountdown(30);
//       } else {
//         throw new Error(response.data.message || 'Failed to resend OTP');
//       }
//     } catch (error) {
//       const errorMessage = error.response?.data?.message || error.message;
//       Toast.show({
//         type: 'error',
//         position: 'top',
//         text1: 'Error',
//         text2: errorMessage,
//         visibilityTime: 4000,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formattedPhone = mobileNumber
//     ? `+91 ******${mobileNumber.slice(-3)}`
//     : '';

//   return (
//     <View style={styles.container}>
//       {loading && (
//         <View style={styles.loaderContainer}>
//           <ActivityIndicator size="large" color="black" />
//         </View>
//       )}

//       <View style={loading ? styles.contentBlurred : styles.contentNormal}>
//         <AppText weight="Bold" style={styles.title}>
//           Verification code
//         </AppText>
//         <AppText weight="Inter" style={styles.subTitle}>
//           Enter the 4-digit code sent to {formattedPhone}
//         </AppText>

//         <OtpInput
//           value={otp} // Controlled input for auto-fill
//           numberOfDigits={4}
//           focusColor="black"
//           onTextChange={text => setOtp(text)}
//           onFilled={text => handleVerify(text)}
//           theme={{
//             containerStyle: styles.otpContainer,
//             pinCodeContainerStyle: styles.pinCodeContainer,
//             pinCodeTextStyle: styles.pinCodeText,
//             focusStickStyle: styles.focusStick,
//             focusedPinCodeContainerStyle: styles.activePinCodeContainer,
//             filledPinCodeContainerStyle: styles.filledPinCodeContainer,
//           }}
//           autoFocus={true}
//           hideStick={false}
//           disabled={loading}
//         />

//         <PrimaryButton
//           title={canResend ? 'Resend OTP' : `Resend in ${countdown}s`}
//           onPress={resendOtp}
//           style={[styles.resendButton, !canResend && styles.disabledButton]}
//           disabled={!canResend || loading}
//         />
//       </View>
//     </View>
//   );
// };

// export default OTPVerification;

// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Keyboard,
//   ActivityIndicator,
//   Platform,
//   Alert,
// } from 'react-native';
// import {OtpInput} from 'react-native-otp-entry';
// import PrimaryButton from '../../../components/UI/PrimaryButton';
// import AppText from '../../../components/AppText';
// import Toast from 'react-native-toast-message';
// import axios from 'axios';
// import {styles} from './styles';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import SmsRetriever from 'react-native-sms-retriever';

// const OTPVerification = ({route, navigation}) => {
//   const [otp, setOtp] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [canResend, setCanResend] = useState(false);
//   const [countdown, setCountdown] = useState(30);
//   const {mobileNumber, userName, token} = route.params;

//   // Countdown logic
//   useEffect(() => {
//     if (countdown > 0) {
//       const timer = setTimeout(() => setCountdown(prev => prev - 1), 1000);
//       return () => clearTimeout(timer);
//     } else {
//       setCanResend(true);
//     }
//   }, [countdown]);

//   // SMS Retriever for auto-fill OTP
//   useEffect(() => {
//     if (Platform.OS !== 'android') return;

//     const startSMSListener = async () => {
//       try {
//         // Get app hash (for debugging)
//         const hash = await SmsRetriever.getAppSignature();
//         console.log('App hash:', hash);

//         // Start SMS listener
//         const registered = await SmsRetriever.startSmsRetriever();
//         if (registered) {
//           const subscription = SmsRetriever.addSmsListener(event => {
//             const message = event.message;
//             console.log('Received SMS:', message);

//             // Extract OTP from message (adjust regex as needed)
//             const otpRegex = /(\d{4})/;
//             const match = message.match(otpRegex);

//             if (match && match[1]) {
//               const receivedOtp = match[1];
//               setOtp(receivedOtp);

//               // Show alert with the OTP
//               Alert.alert(
//                 'OTP Received',
//                 `We've detected an OTP: ${receivedOtp}. Would you like to auto-fill it?`,
//                 [
//                   {
//                     text: 'Cancel',
//                     style: 'cancel',
//                   },
//                   {
//                     text: 'Auto-fill',
//                     onPress: () => {
//                       setOtp(receivedOtp);
//                       handleVerify(receivedOtp);
//                     },
//                   },
//                 ],
//               );
//             }

//             // Remove listener after getting OTP
//             subscription.remove();
//           });
//         }
//       } catch (error) {
//         console.warn('SMS Retriever error:', error);
//       }
//     };

//     startSMSListener();

//     return () => {
//       // Clean up listener when component unmounts
//       SmsRetriever.removeSmsListener();
//     };
//   }, []);

//   const handleVerify = async (submittedOtp = otp) => {
//     Keyboard.dismiss();

//     if (submittedOtp.length !== 4) {
//       Toast.show({
//         type: 'error',
//         position: 'top',
//         text1: 'Error',
//         text2: 'Please enter a 4-digit OTP',
//         visibilityTime: 3000,
//       });
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await axios.post(
//         'https://upvc-backend-oh6m.onrender.com/api/auth/verify-otp',
//         {mobileNumber, otp: submittedOtp},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         },
//       );

//       if (response.status === 200) {
//         await AsyncStorage.setItem('buyerToken', response.data.token);
//         Toast.show({
//           type: 'success',
//           position: 'top',
//           text1: 'Success',
//           text2: 'OTP verified successfully',
//           visibilityTime: 3000,
//         });
//         navigation.replace('BuyerMain');
//       } else {
//         throw new Error(response.data.message || 'Verification failed');
//       }
//     } catch (error) {
//       const errorMessage = error.response?.data?.message || error.message;
//       Toast.show({
//         type: 'error',
//         position: 'top',
//         text1: 'Error',
//         text2: errorMessage,
//         visibilityTime: 4000,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resendOtp = async () => {
//     if (!canResend) return;
//     try {
//       setLoading(true);
//       const response = await axios.post(
//         'https://upvc-backend-oh6m.onrender.com/api/auth/login',
//         {
//           name: userName,
//           mobileNumber,
//         },
//         {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         },
//       );

//       if (response.status === 200) {
//         Toast.show({
//           type: 'otpNotification',
//           position: 'top',
//           visibilityTime: 5000,
//           autoHide: true,
//           props: {
//             otp: response.data.otp,
//           },
//         });

//         setOtp(response.data.otp);
//         setCanResend(false);
//         setCountdown(30);
//       } else {
//         throw new Error(response.data.message || 'Failed to resend OTP');
//       }
//     } catch (error) {
//       const errorMessage = error.response?.data?.message || error.message;
//       Toast.show({
//         type: 'error',
//         position: 'top',
//         text1: 'Error',
//         text2: errorMessage,
//         visibilityTime: 4000,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formattedPhone = mobileNumber
//     ? `+91 ******${mobileNumber.slice(-3)}`
//     : '';

//   return (
//     <View style={styles.container}>
//       {loading && (
//         <View style={styles.loaderContainer}>
//           <ActivityIndicator size="large" color="black" />
//         </View>
//       )}

//       <View style={loading ? styles.contentBlurred : styles.contentNormal}>
//         <AppText weight="Bold" style={styles.title}>
//           Verification code
//         </AppText>
//         <AppText weight="Inter" style={styles.subTitle}>
//           Enter the 4-digit code sent to {formattedPhone}
//         </AppText>

//         <OtpInput
//           value={otp}
//           numberOfDigits={4}
//           focusColor="black"
//           onTextChange={text => setOtp(text)}
//           onFilled={text => handleVerify(text)}
//           theme={{
//             containerStyle: styles.otpContainer,
//             pinCodeContainerStyle: styles.pinCodeContainer,
//             pinCodeTextStyle: styles.pinCodeText,
//             focusStickStyle: styles.focusStick,
//             focusedPinCodeContainerStyle: styles.activePinCodeContainer,
//             filledPinCodeContainerStyle: styles.filledPinCodeContainer,
//           }}
//           autoFocus={true}
//           hideStick={false}
//           disabled={loading}
//         />

//         <PrimaryButton
//           title={canResend ? 'Resend OTP' : `Resend in ${countdown}s`}
//           onPress={resendOtp}
//           style={[styles.resendButton, !canResend && styles.disabledButton]}
//           disabled={!canResend || loading}
//         />
//       </View>
//     </View>
//   );
// };

// export default OTPVerification;

// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Keyboard,
//   ActivityIndicator,
//   Platform,
// } from 'react-native';
// import {OtpInput} from 'react-native-otp-entry';
// import PrimaryButton from '../../../components/UI/PrimaryButton';
// import AppText from '../../../components/AppText';
// import Toast from 'react-native-toast-message';
// import axios from 'axios';
// import {styles} from './styles';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import SmsRetriever from 'react-native-sms-retriever';

// const OTPVerification = ({route, navigation}) => {
//   const [otp, setOtp] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [canResend, setCanResend] = useState(false);
//   const [countdown, setCountdown] = useState(30);
//   const {mobileNumber, userName, token} = route.params;

//   // Countdown logic
//   useEffect(() => {
//     if (countdown > 0) {
//       const timer = setTimeout(() => setCountdown(prev => prev - 1), 1000);
//       return () => clearTimeout(timer);
//     } else {
//       setCanResend(true);
//     }
//   }, [countdown]);

//   // SMS Retriever for auto-fill OTP
//   useEffect(() => {
//     if (Platform.OS !== 'android') return;

//     const startSMSListener = async () => {
//       try {
//         // Get app hash (for debugging)
//         const hash = await SmsRetriever.getAppSignature();
//         console.log('App hash:', hash);

//         // Start SMS listener
//         const registered = await SmsRetriever.startSmsRetriever();
//         if (registered) {
//           const subscription = SmsRetriever.addSmsListener(event => {
//             const message = event.message;
//             console.log('Received SMS:', message);

//             // Extract OTP from message (adjust regex as needed)
//             const otpRegex = /(\d{4})/;
//             const match = message.match(otpRegex);

//             if (match && match[1]) {
//               const receivedOtp = match[1];
//               // Directly set the OTP and verify without showing alert
//               setOtp(receivedOtp);
//               handleVerify(receivedOtp);
//             }

//             // Remove listener after getting OTP
//             subscription.remove();
//           });
//         }
//       } catch (error) {
//         console.warn('SMS Retriever error:', error);
//       }
//     };

//     startSMSListener();

//     return () => {
//       // Clean up listener when component unmounts
//       SmsRetriever.removeSmsListener();
//     };
//   }, []);

//   const handleVerify = async (submittedOtp = otp) => {
//     Keyboard.dismiss();

//     if (submittedOtp.length !== 4) {
//       Toast.show({
//         type: 'error',
//         position: 'top',
//         text1: 'Error',
//         text2: 'Please enter a 4-digit OTP',
//         visibilityTime: 3000,
//       });
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await axios.post(
//         'https://upvc-backend-oh6m.onrender.com/api/auth/verify-otp',
//         {mobileNumber, otp: submittedOtp},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         },
//       );

//       if (response.status === 200) {
//         await AsyncStorage.setItem('buyerToken', response.data.token);
//         Toast.show({
//           type: 'success',
//           position: 'top',
//           text1: 'Success',
//           text2: 'OTP verified successfully',
//           visibilityTime: 3000,
//         });
//         navigation.replace('BuyerMain');
//       } else {
//         throw new Error(response.data.message || 'Verification failed');
//       }
//     } catch (error) {
//       const errorMessage = error.response?.data?.message || error.message;
//       Toast.show({
//         type: 'error',
//         position: 'top',
//         text1: 'Error',
//         text2: errorMessage,
//         visibilityTime: 4000,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resendOtp = async () => {
//     if (!canResend) return;
//     try {
//       setLoading(true);
//       const response = await axios.post(
//         'https://upvc-backend-oh6m.onrender.com/api/auth/login',
//         {
//           name: userName,
//           mobileNumber,
//         },
//         {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         },
//       );

//       if (response.status === 200) {
//         Toast.show({
//           type: 'otpNotification',
//           position: 'top',
//           visibilityTime: 5000,
//           autoHide: true,
//           props: {
//             otp: response.data.otp,
//           },
//         });

//         setOtp(response.data.otp);
//         setCanResend(false);
//         setCountdown(30);
//       } else {
//         throw new Error(response.data.message || 'Failed to resend OTP');
//       }
//     } catch (error) {
//       const errorMessage = error.response?.data?.message || error.message;
//       Toast.show({
//         type: 'error',
//         position: 'top',
//         text1: 'Error',
//         text2: errorMessage,
//         visibilityTime: 4000,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formattedPhone = mobileNumber
//     ? `+91 ******${mobileNumber.slice(-3)}`
//     : '';

//   return (
//     <View style={styles.container}>
//       {loading && (
//         <View style={styles.loaderContainer}>
//           <ActivityIndicator size="large" color="black" />
//         </View>
//       )}

//       <View style={loading ? styles.contentBlurred : styles.contentNormal}>
//         <AppText weight="Bold" style={styles.title}>
//           Verification code
//         </AppText>
//         <AppText weight="Inter" style={styles.subTitle}>
//           Enter the 4-digit code sent to {formattedPhone}
//         </AppText>

//         <OtpInput
//           value={otp}
//           numberOfDigits={4}
//           focusColor="black"
//           onTextChange={text => setOtp(text)}
//           onFilled={text => handleVerify(text)}
//           theme={{
//             containerStyle: styles.otpContainer,
//             pinCodeContainerStyle: styles.pinCodeContainer,
//             pinCodeTextStyle: styles.pinCodeText,
//             focusStickStyle: styles.focusStick,
//             focusedPinCodeContainerStyle: styles.activePinCodeContainer,
//             filledPinCodeContainerStyle: styles.filledPinCodeContainer,
//           }}
//           autoFocus={true}
//           hideStick={false}
//           disabled={loading}
//         />

//         <PrimaryButton
//           title={canResend ? 'Resend OTP' : `Resend in ${countdown}s`}
//           onPress={resendOtp}
//           style={[styles.resendButton, !canResend && styles.disabledButton]}
//           disabled={!canResend || loading}
//         />
//       </View>
//     </View>
//   );
// };

// export default OTPVerification;
