import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingTop: 48,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
    textAlign: 'center',
    fontFamily: 'Inter-SemiBold', // Use your preferred font family
  },
  subTitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 40,
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
    lineHeight: 24,
  },
  pinCodeContainer: {
    width: 52,
    height: 60,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FAFAFA',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 6,
  },
  activePinCodeContainer: {
    borderColor: '#4CAF50',
    backgroundColor: '#FFFFFF',
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  filledPinCodeContainer: {
    borderColor: '#4CAF50',
    backgroundColor: '#FFFFFF',
  },
  pinCodeText: {
    fontSize: 24,
    color: '#1A1A1A',
    fontWeight: '600',
    fontFamily: 'Inter-Medium',
  },
  focusStick: {
    width: 2,
    height: 30,
    backgroundColor: '#4CAF50',
  },
  placeholderText: {
    fontSize: 24,
    color: '#BDBDBD',
  },
  disabledPinCodeContainer: {
    backgroundColor: '#F5F5F5',
    borderColor: '#EEEEEE',
  },
  resendContainer: {
    marginTop: 32,
    marginBottom: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resendText: {
    color: '#666666',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  resendLink: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
    marginLeft: 4,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 32,
    paddingHorizontal: 16,
  },
  errorText: {
    color: '#F44336',
    fontSize: 14,
    marginTop: 8,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
  },
  successText: {
    color: '#4CAF50',
    fontSize: 14,
    marginTop: 8,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
  },
  otpContainer: {
    marginVertical: 40,
    width: '100%',
    justifyContent: 'center',
  },
});