// import React, { useEffect } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import LottieView from 'lottie-react-native';
// import Animated, { 
//   FadeIn, 
//   FadeInDown, 
//   FadeInUp,
//   useSharedValue,
//   useAnimatedStyle,
//   withSpring,
//   withRepeat,
//   withSequence,
//   withTiming
// } from 'react-native-reanimated';
// import Icon from 'react-native-vector-icons/MaterialIcons';

// const { width, height } = Dimensions.get('window');

// const PendingApproval = ({ navigation }) => {
//   const scaleValue = useSharedValue(1);
//   const rotationValue = useSharedValue(0);

//   useEffect(() => {
//     // Pulse animation for CTA
//     scaleValue.value = withRepeat(
//       withSequence(
//         withTiming(1.03, { duration: 1000 }),
//         withTiming(1, { duration: 1000 })
//       ),
//       -1,
//       true
//     );

//     // Rotate animation for refresh icon
//     rotationValue.value = withRepeat(
//       withTiming(10, { duration: 1500 }),
//       -1,
//       true
//     );
//   }, []);

//   const animatedStyle = useAnimatedStyle(() => ({
//     transform: [{ scale: scaleValue.value }]
//   }));

//   const refreshIconStyle = useAnimatedStyle(() => ({
//     transform: [{ rotate: `${rotationValue.value}deg` }]
//   }));

//   return (
//     <LinearGradient
//       colors={['#F8F9FA', '#E8F4FD']}
//       style={styles.container}
//     >
//       <View style={styles.content}>
//         <Animated.View entering={FadeIn.delay(200)} style={styles.animationContainer}>
//           <LottieView
//             source={require('./../../assets/animations/approval-animation.json')}
//             autoPlay 
//             loop
//             style={styles.animation}
//           />
//         </Animated.View>

//         <Animated.View entering={FadeInDown.duration(800)}>
//           <Text style={styles.headline}>We're Reviewing Your Profile!</Text>
//           <Text style={styles.subText}>
//             Our team's checking your details—approval takes 24 hrs. Once you're in, 5 free
//             leads are yours!
//           </Text>
//         </Animated.View>

//         <Animated.View 
//           entering={FadeInUp.delay(400).duration(600)}
//           style={styles.statusContainer}
//         >
//           <Text style={styles.statusLabel}>STATUS</Text>
//           <View style={styles.statusPill}>
//             <Text style={styles.statusText}>Pending</Text>
//           </View>
//         </Animated.View>

//         <Animated.View 
//           style={[styles.ctaContainer, animatedStyle]}
//           entering={FadeInUp.delay(600).duration(600)}
//         >
//           <TouchableOpacity 
//             style={styles.ctaButton}
//             onPress={() => navigation.navigate('Support')}
//           >
//             <Icon name="support-agent" size={24} color="#2E86C1" />
//             <Text style={styles.ctaText}>Contact Support</Text>
//           </TouchableOpacity>
//         </Animated.View>

//         <Animated.View 
//           style={[styles.refreshContainer, refreshIconStyle]}
//           entering={FadeIn.delay(1000)}
//         >
//           <TouchableOpacity onPress={() => console.log('Refresh status')}>
//             <Icon name="refresh" size={28} color="#95A5A6" />
//           </TouchableOpacity>
//         </Animated.View>
//       </View>
//     </LinearGradient>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 24,
//   },
//   content: {
//     width: '100%',
//     maxWidth: 400,
//     alignItems: 'center',
//   },
//   animationContainer: {
//     width: 200,
//     height: 200,
//     marginBottom: 24,
//   },
//   animation: {
//     width: '100%',
//     height: '100%',
//   },
//   headline: {
//     fontSize: 28,
//     fontWeight: '800',
//     color: '#2C3E50',
//     textAlign: 'center',
//     marginBottom: 16,
//     lineHeight: 36,
//   },
//   subText: {
//     fontSize: 16,
//     color: '#566573',
//     textAlign: 'center',
//     lineHeight: 24,
//     marginBottom: 32,
//   },
//   statusContainer: {
//     alignItems: 'center',
//     marginBottom: 40,
//   },
//   statusLabel: {
//     fontSize: 12,
//     fontWeight: '600',
//     color: '#95A5A6',
//     letterSpacing: 1,
//     marginBottom: 8,
//   },
//   statusPill: {
//     backgroundColor: '#FDEBD0',
//     paddingHorizontal: 24,
//     paddingVertical: 8,
//     borderRadius: 20,
//     borderWidth: 1,
//     borderColor: '#F39C12',
//   },
//   statusText: {
//     fontSize: 16,
//     fontWeight: '700',
//     color: '#E67E22',
//   },
//   ctaContainer: {
//     width: '100%',
//     maxWidth: 300,
//   },
//   ctaButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'white',
//     padding: 16,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: '#D6EAF8',
//     shadowColor: '#2E86C1',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 12,
//     elevation: 5,
//   },
//   ctaText: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#2E86C1',
//     marginLeft: 8,
//   },
//   refreshContainer: {
//     marginTop: 40,
//   },
// });

// export default PendingApproval;
import React, { useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Dimensions,
  Animated,
  Easing,
  ImageBackground,
  SafeAreaView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');

const PendingApproval = ({ navigation }) => {
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideUpAnim = useRef(new Animated.Value(height * 0.2)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  // Start animations
  useEffect(() => {
    // Parallel entrance animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(slideUpAnim, {
        toValue: 0,
        duration: 1000,
        easing: Easing.out(Easing.back(0.5)),
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      })
    ]).start();

    // Continuous rotation animation
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const rotateInterpolation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  const handleSupportPress = () => {
    // Button press animation
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 200,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      })
    ]).start(() => navigation.navigate('Support'));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground 
        source={require('../../assets/logo.png')} 
        style={styles.background}
        blurRadius={4}
      >
        <LinearGradient
          colors={['rgba(255,255,255,0.9)', 'rgba(255,255,255,0.7)']}
          style={styles.overlay}
        >
          <Animated.View 
            style={[
              styles.content, 
              { 
                opacity: fadeAnim,
                transform: [
                  { translateY: slideUpAnim },
                  { scale: scaleAnim }
                ] 
              }
            ]}
          >
            <View style={styles.animationContainer}>
              <LottieView
                source={require('../../assets/animations/approval-animation.json')}
                autoPlay 
                loop
                style={styles.animation}
              />
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.headline}>We're Reviewing Your Profile!</Text>
              <Text style={styles.subText}>
                Our team's checking your details—approval takes 24 hrs. 
                Once you're in, 5 free leads are yours!
              </Text>
            </View>

            <View style={styles.statusContainer}>
              <Text style={styles.statusLabel}>STATUS</Text>
              <View style={styles.statusPill}>
                <Text style={styles.statusText}>Pending</Text>
              </View>
            </View>

            <Animated.View 
              style={[
                styles.ctaContainer,
                { transform: [{ scale: scaleAnim }] }
              ]}
            >
              <TouchableOpacity 
                style={styles.ctaButton}
                onPress={handleSupportPress}
                activeOpacity={0.9}
              >
                <LinearGradient
                  colors={['#4A90E2', '#2E86C1']}
                  style={styles.gradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Icon name="support-agent" size={24} color="#FFF" />
                  <Text style={styles.ctaText}>Contact Support</Text>
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>

            <Animated.View 
              style={[
                styles.refreshContainer, 
                { transform: [{ rotate: rotateInterpolation }] }
              ]}
            >
              <TouchableOpacity onPress={() => console.log('Refresh status')}>
                <Icon name="refresh" size={28} color="#2E86C1" />
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>
        </LinearGradient>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  content: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  animationContainer: {
    width: 200,
    height: 200,
    marginBottom: 24,
  },
  animation: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    marginBottom: 32,
    alignItems: 'center',
  },
  headline: {
    fontSize: 28,
    fontWeight: '800',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 36,
  },
  subText: {
    fontSize: 16,
    color: '#566573',
    textAlign: 'center',
    lineHeight: 24,
  },
  statusContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  statusLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#95A5A6',
    letterSpacing: 1,
    marginBottom: 8,
  },
  statusPill: {
    backgroundColor: '#FDEBD0',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#F39C12',
  },
  statusText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#E67E22',
  },
  ctaContainer: {
    width: '100%',
    maxWidth: 300,
    marginBottom: 24,
  },
  ctaButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  gradient: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ctaText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
    marginLeft: 8,
  },
  refreshContainer: {
    padding: 8,
  },
});

export default PendingApproval;