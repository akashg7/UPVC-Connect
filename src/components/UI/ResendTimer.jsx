import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, fonts, spacing } from '../../theme';

const ResendTimer = ({ duration = 30, onResend }) => {
  const [timer, setTimer] = useState(duration);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleResend = () => {
    if (!canResend) return;
    onResend();
    setTimer(duration);
    setCanResend(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>
        {canResend ? 'Didn\'t receive code? ' : `Resend code in ${timer}s`}
      </Text>
      {canResend && (
        <TouchableOpacity onPress={handleResend}>
          <Text style={styles.resendText}>Resend OTP</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: spacing.medium,
  },
  timerText: {
    ...fonts.body,
    color: colors.textSecondary,
  },
  resendText: {
    ...fonts.body,
    color: colors.primary,
    marginLeft: spacing.small,
    fontWeight: '600',
  },
});

export default ResendTimer;