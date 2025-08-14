import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AppText from '../AppText';

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
      {canResend ? (
        <AppText weight="Inter" style={styles.timerText}>
          Didn't receive code?
        </AppText>
      ) : (
        <AppText weight="Inter" style={styles.timerText}>
          Resend code in {timer}s
        </AppText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  timerText: {
    color: 'black',
    fontSize: 14,
  },
});

export default ResendTimer;