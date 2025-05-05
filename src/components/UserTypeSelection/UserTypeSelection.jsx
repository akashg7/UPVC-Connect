import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ImageBackground, 
  SafeAreaView,
  Animated,
  Easing,
  Dimensions,
  Platform
} from 'react-native';
import { useNavigation , useFocusEffect} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LottieView from 'lottie-react-native'; 

const { width, height } = Dimensions.get('window');

const UserTypeSelection = () => {
  const navigation = useNavigation();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const buttonScale = React.useRef(new Animated.Value(1)).current;
  const titlePosition = React.useRef(new Animated.Value(height * 0.1)).current;
  const button1Position = React.useRef(new Animated.Value(width)).current;
  const button2Position = React.useRef(new Animated.Value(-width)).current;

  React.useEffect(() => {
    // Sequence animations for entrance
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
      })
    ]).start();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      // Reset animation values
      fadeAnim.setValue(0);
      titlePosition.setValue(height * 0.1);
      button1Position.setValue(width);
      button2Position.setValue(-width);
  
      // Re-run entrance animation
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
    }, [])
  );
  

  const handlePress = (screenName) => {
    // Button press animation
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
      // Navigation with transition effects
      if (screenName === 'SellerOnboarding') {
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(titlePosition, {
            toValue: -height * 0.1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(button1Position, {
            toValue: width,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(button2Position, {
            toValue: -width,
            duration: 500,
            useNativeDriver: true,
          }),
        ]).start(() => navigation.navigate('WelcomeProfileSetup'));
      } else if (screenName === 'BuyerOnboarding') {
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(titlePosition, {
            toValue: height * 0.1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(button1Position, {
            toValue: -width,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(button2Position, {
            toValue: width,
            duration: 500,
            useNativeDriver: true,
          }),
        ]).start(() => navigation.navigate('BuyerOnboarding'));
      }
    });
  };
   
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground 
        source={require('../../assets/logo.png')} 
        style={styles.background}
        blurRadius={Platform.OS === 'ios' ? 4 : 2}
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.5)']}
          style={styles.overlay}
        >
          <Animated.View style={[styles.titleContainer, { opacity: fadeAnim, transform: [{ translateY: titlePosition }] }]}>
            <LottieView
              source={require('../../assets/logo.png')}
              autoPlay
              loop
              style={styles.logoAnimation}
            />
            <Text style={styles.title}>UPVC Connect</Text>
            <Text style={styles.subtitle}>Your Premium Window to Better Deals</Text>
          </Animated.View>

          <View style={styles.buttonContainer}>
            <Animated.View style={[styles.buttonWrapper, { transform: [{ translateX: button1Position }] }]}>
              <TouchableOpacity 
                style={styles.button}
                onPress={() => handlePress('BuyerOnboarding')}
                activeOpacity={0.9}
              >
                <LinearGradient
                  colors={['#4A90E2', '#2E86C1']}
                  style={styles.gradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Icon name="shopping-cart" size={28} color="#FFF" style={styles.buttonIcon} />
                  <Text style={styles.buttonText}>I'm a Buyer</Text>
                  <Text style={styles.buttonSubtext}>Find premium UPVC products</Text>
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>50+ Suppliers</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>

            <Animated.View style={[styles.buttonWrapper, { transform: [{ translateX: button2Position }] }]}>
              <TouchableOpacity 
                style={[styles.button, styles.sellerButton]}
                onPress={() => handlePress('SellerOnboarding')}
                activeOpacity={0.9}
              >
                <LinearGradient
                  colors={['#28B463', '#1E8449']}
                  style={styles.gradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Icon name="store" size={28} color="#FFF" style={styles.buttonIcon} />
                  <Text style={styles.buttonText}>I'm a Seller</Text>
                  <Text style={styles.buttonSubtext}>Connect with verified buyers</Text>
                  <View style={[styles.badge, styles.sellerBadge]}>
                    <Text style={styles.badgeText}>5 Free Leads</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>
          </View>

          <Animated.View style={[styles.footer, { opacity: fadeAnim }]}>
            <Text style={styles.footerText}>Join 500+ businesses in our network</Text>
          </Animated.View>
        </LinearGradient>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 40,
  },
  titleContainer: {
    alignItems: 'center',
    paddingTop: height * 0.1,
  },
  logoAnimation: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: '#FFF',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.85)',
    marginBottom: 8,
    textAlign: 'center',
    paddingHorizontal: 40,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  buttonContainer: {
    paddingHorizontal: 30,
  },
  buttonWrapper: {
    marginBottom: 25,
  },
  button: {
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  gradient: {
    paddingVertical: 25,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  buttonIcon: {
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 5,
    letterSpacing: 0.5,
  },
  buttonSubtext: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
    marginBottom: 10,
  },
  badge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  sellerBadge: {
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFF',
    letterSpacing: 0.3,
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default UserTypeSelection;