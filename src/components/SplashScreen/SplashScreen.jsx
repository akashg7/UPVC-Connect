import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import AppText from '../AppText';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SplashScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('UserTypeSelection');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={{ paddingTop: insets.top, flex: 1 }}>
      <View style={styles.container}>
        <Image 
          source={require('../../assets/logo.png')}  
          style={styles.logo}
        />
        <AppText weight='SemiBold' style={styles.tagline}>Your Window to Better Deals</AppText>
        <ActivityIndicator size="large" color="#000000" style={styles.loader} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Black background#FFFFFF
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 350,
    height: 350,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  tagline: {
    fontSize: 20,
    color: '#000000',
    // fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
  },
  loader: {
    marginTop: 10,
  },
});

export default SplashScreen;
