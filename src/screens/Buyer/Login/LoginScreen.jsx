import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import AppText from '../../../components/AppText';

const LoginScreen = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');

  const handleProceed = () => {
    if (mobileNumber.length === 10) {
      navigation.navigate('OTPVerification', { mobileNumber, userName });
    }
  };

  const handleSkip = () => {
    navigation.navigate('BuyerMain');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <View style={styles.titleContainer}>
        <Image source={require('../../../assets/logo.png')} style={styles.logo} />
        <AppText weight="SemiBold" style={styles.subtitle}>Your Premium Window to Better Deals</AppText>
      </View>

      {/* User Name Input */}
      <View style={styles.inputRow}>
        <TextInput
          style={[styles.input, { marginLeft: 4 }]}
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
        <TouchableOpacity style={styles.button} onPress={handleProceed}>
          <AppText weight="SemiBold" style={styles.buttonText}>Get OTP</AppText>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.button} onPress={handleSkip}>
        <AppText weight="SemiBold" style={styles.buttonText}>Skip</AppText>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  subtitle: {
    fontSize: 18,
    color: '#333',
    fontWeight: '500',
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
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
    fontWeight: '600',
  },
});

export default LoginScreen;
