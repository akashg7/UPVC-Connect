import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AppText from '../../components/AppText'; 

const {width, height} = Dimensions.get('window');

const UserTypeSelection = () => {
  const navigation = useNavigation();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const buttonScale = React.useRef(new Animated.Value(1)).current;
  const titlePosition = React.useRef(new Animated.Value(height * 0.05)).current; // Reduced initial position
  const button1Position = React.useRef(new Animated.Value(width)).current;
  const button2Position = React.useRef(new Animated.Value(-width)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(titlePosition, {
        toValue: 0,
        duration: 1000,
        easing: Easing.out(Easing.back(1)),
        useNativeDriver: true,
      }),
      Animated.timing(button1Position, {
        toValue: 0,
        duration: 800,
        delay: 300,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(button2Position, {
        toValue: 0,
        duration: 800,
        delay: 500,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fadeAnim.setValue(0);
      titlePosition.setValue(height * 0.05); // Reduced reset position
      button1Position.setValue(width);
      button2Position.setValue(-width);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(titlePosition, {
          toValue: 0,
          duration: 1000,
          easing: Easing.out(Easing.back(1)),
          useNativeDriver: true,
        }),
        Animated.timing(button1Position, {
          toValue: 0,
          duration: 800,
          delay: 300,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(button2Position, {
          toValue: 0,
          duration: 800,
          delay: 500,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
      ]).start();
    }, []),
  );

  const handlePress = screenName => {
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.95,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 120,
        useNativeDriver: true,
      }),
    ]).start(() => {
      const animations = [
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(titlePosition, {
          toValue:
            screenName === 'SellerLoginScreen' ? -height * 0.05 : height * 0.05,
          duration: 500,
          useNativeDriver: true,
        }), // Reduced movement
        Animated.timing(button1Position, {
          toValue: screenName === 'SellerLoginScreen' ? width : -width,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(button2Position, {
          toValue: screenName === 'SellerLoginScreen' ? -width : width,
          duration: 500,
          useNativeDriver: true,
        }),
      ];
      Animated.parallel(animations).start(() =>
        // navigation.navigate(screenName === 'SellerLoginScreen' ? 'WelcomeProfileSetup' : 'LoginScreen')
        navigation.navigate(
          screenName === 'SellerLoginScreen'
            ? 'SellerLoginScreen'
            : 'LoginScreen',
        ),
      );
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.titleContainer,
            {opacity: fadeAnim, transform: [{translateY: titlePosition}]},
          ]}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.logo}
          />

          <AppText weight="SemiBold"
            style={styles.subtitle}>
            {/* style={{fontFamily: 'Poppins-Bold', fontSize: 18, color: 'black'}}> */}
            Your Premium Window to Better Deals
          </AppText>
        </Animated.View>

        <View style={styles.buttonContainer}>
          <Animated.View
            style={[
              styles.buttonWrapper,
              {transform: [{translateX: button1Position}]},
            ]}>
            <TouchableOpacity
              style={[styles.button, styles.blackButton]}
              onPress={() => handlePress('BuyerOnboarding')}
              activeOpacity={0.8}>
                {/* <Text style={{ flexDirection: 'row', alignItems: 'center' }}></Text> */}
              <Icon
                name="shopping-cart"
                size={26}
                color="#FFF"
                style={styles.buttonIcon}
              />
              <AppText weight="SemiBold" style={styles.buttonText}>I'm a Buyer</AppText>
              <AppText weight="Inter" style={styles.buttonSubtext}>
                Browse premium UPVC products
              </AppText>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View
            style={[
              styles.buttonWrapper,
              {transform: [{translateX: button2Position}]},
            ]}>
            <TouchableOpacity
              style={[styles.button, styles.blackButton]}
              onPress={() => handlePress('SellerLoginScreen')}
              activeOpacity={0.8}>
              <Icon
                name="store"
                size={26}
                color="#FFF"
                style={styles.buttonIcon}
              /> 
              <AppText weight="SemiBold" style={styles.buttonText}>I'm a Seller</AppText>
              <AppText weight="Inter" style={styles.buttonSubtext}>
                Connect with real buyers
              </AppText>
            </TouchableOpacity>
          </Animated.View>
        </View>

        <Animated.View style={[styles.footer, {opacity: fadeAnim}]}>
          <AppText weight="Inter" style={styles.footerText}>
            Trusted by 500+ businesses
          </AppText>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  overlay: {
    flex: 1,
    paddingHorizontal: 25,
    justifyContent: 'flex-start',
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginTop: height * 0,
  },
  titleContainer: {
    alignItems: 'center',
    paddingTop: height * 0,
  },
  subtitle: { 
    color: '#333',
    textAlign: 'center',
    letterSpacing: 0.5,
    // fontFamily: 'Poppins-Bold', 
    fontSize: 16, 
    // color: 'black'
  },
  buttonContainer: {
    flex: 1,
    marginTop: height * 0.05,
  },
  buttonWrapper: {
    marginBottom: 20,
  },
  button: {
    width: '100%',
    borderRadius: 14,
    borderWidth: 1.2,
    paddingVertical: 18,
    paddingHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
  },
  blackButton: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  buttonIcon: {
    marginBottom: 8,
  },
  buttonText: { 
    color: '#FFF',
    marginBottom: 4, 
    fontSize:20
  },
  buttonSubtext: {
    fontSize: 14,
    color: '#FFF',
    // fontWeight: '500', 
  },
  footer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  footerText: {
    color: '#888',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default UserTypeSelection;
