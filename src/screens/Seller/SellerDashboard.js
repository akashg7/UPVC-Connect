import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
  ImageBackground,
  SafeAreaView,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import StatsCard from './components/StatsCard';
import LeadCard from './components/LeadCard';
import TrendTeaser from './components/TrendTeaser'; 

const {width, height} = Dimensions.get('window');

const SellerDashboard = ({navigation}) => {
  const [leads, setLeads] = useState(3);
  const [freeLeadsLeft, setFreeLeadsLeft] = useState(5);

  // Animation values
  const headerScaleAnim = useRef(new Animated.Value(0.95)).current;
  const headerFadeAnim = useRef(new Animated.Value(0)).current;
  const headerSlideAnim = useRef(new Animated.Value(30)).current;
  const cardRightAnim = useRef(new Animated.Value(width * 0.5)).current;
  const cardLeftAnim = useRef(new Animated.Value(-width * 0.5)).current;
  const contentFadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Staggered animations
    Animated.sequence([
      // Header animation
      Animated.parallel([
        Animated.spring(headerFadeAnim, {
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.spring(headerScaleAnim, {
          toValue: 1,
          friction: 5,
          useNativeDriver: true,
        }),
        Animated.spring(headerSlideAnim, {
          toValue: 0,
          friction: 6,
          useNativeDriver: true,
        }),
      ]),
      // Cards animation
      Animated.parallel([
        Animated.spring(cardRightAnim, {
          toValue: 0,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.spring(cardLeftAnim, {
          toValue: 0,
          friction: 7,
          useNativeDriver: true,
        }),
      ]),
      // Content fade in
      Animated.timing(contentFadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();

    // Simulate new leads coming in
    const interval = setInterval(() => {
      setLeads(prev => prev + Math.floor(Math.random() * 2));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleCardPress = route => {
    Animated.sequence([
      Animated.timing(headerScaleAnim, {
        toValue: 0.98,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(headerScaleAnim, {
        toValue: 1,
        duration: 200,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start(() => navigation.navigate(route));
  };

  return (
    // <ImageBackground
    //   source={require('../../assets/logo.png')}
    //   style={styles.background}
    //   blurRadius={2}
    // >
    <SafeAreaView style={styles.container}>
      {/* <ImageBackground
        source={require('../../assets/logo.png')}
        style={styles.background}
        blurRadius={Platform.OS === 'ios' ? 4 : 2}> */}
        <LinearGradient
          colors={['rgba(255,255,255,0.98)', 'rgba(245,249,255,0.95)']}
          style={styles.gradientOverlay}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}>
            {/* Header */}
            <Animated.View
              style={[
                styles.headerContainer,
                {
                  opacity: headerFadeAnim,
                  transform: [
                    {scale: headerScaleAnim},
                    {translateY: headerSlideAnim},
                  ],
                },
              ]}>
              {/* <View style={styles.waveContainer}>
              <LottieView  
                source={require('../../assets/animations/dashboard-wave.json')}
                autoPlay
                loop
                style={styles.waveAnimation}
                resizeMode="cover"
              />
            </View> */}
              <View style={styles.headerContent}>
                <Text style={styles.headline}>Welcome to UPVC Connect</Text>
                <Text style={styles.subheadline}>
                  Track your leads and boost sales
                </Text>
                <View style={styles.headerStats}>
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>{leads}</Text>
                    <Text style={styles.statLabel}>New Leads</Text>
                  </View>
                  <View style={styles.statDivider} />
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>{freeLeadsLeft}</Text>
                    <Text style={styles.statLabel}>Free Leads</Text>
                  </View>
                </View>
              </View>
            </Animated.View>

            {/* Stats Cards */}
            <View style={styles.statsRow}>
              <Animated.View
                style={[
                  styles.cardWrapper,
                  {
                    transform: [{translateX: cardRightAnim}],
                  },
                ]}>
                <StatsCard
                  title="New Leads"
                  value={`${leads} today`}
                  subtitle="₹200 each!"
                  icon="people"
                  color="#2E86C1"
                  gradientColors={['#3498db', '#2980b9']}
                  onPress={() => handleCardPress('LeadDetails')}
                  ctaText="View Leads"
                />
              </Animated.View>

              <Animated.View
                style={[
                  styles.cardWrapper,
                  {
                    transform: [{translateX: cardLeftAnim}],
                  },
                ]}>
                <StatsCard
                  title="Free Trial"
                  value={`${freeLeadsLeft} left`}
                  subtitle="Claim now!"
                  icon="card-giftcard"
                  color="#28B463"
                  gradientColors={['#2ecc71', '#27ae60']}
                  onPress={() => handleCardPress('ClaimLeads')}
                  ctaText="Claim Now"
                />
              </Animated.View>
            </View>

            {/* Recent Leads Section */}
            <Animated.View
              style={[
                styles.sectionContainer,
                {
                  opacity: contentFadeAnim,
                },
              ]}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Recent Leads</Text>
                <TouchableOpacity
                  onPress={() => handleCardPress('LeadDetails')}>
                  <Text style={styles.seeAll}>View All</Text>
                </TouchableOpacity>
              </View>

              <LeadCard
                name="Rajesh Builders"
                location="Mumbai, 400001"
                requirement="200 Sliding Windows"
                time="2 hours ago"
                amount="₹40,000"
                onPress={() => navigation.navigate('ContactBuyer')}
              />
              <LeadCard
                name="Sunita Apartments"
                location="Bangalore, 560001"
                requirement="50 Casement Windows"
                time="5 hours ago"
                amount="₹12,500"
                onPress={() => navigation.navigate('ContactBuyer')}
              />
            </Animated.View>

            {/* Market Trends */}
            <Animated.View
              style={[
                styles.sectionContainer,
                {
                  opacity: contentFadeAnim,
                },
              ]}>
              <TrendTeaser
                title="Market Trends"
                insight="60% want sliding windows"
                recommendation="Stock up inventory?"
                onPress={() => handleCardPress('MarketInsights')}
              />
            </Animated.View>
          </ScrollView>
        </LinearGradient>
      {/* </ImageBackground> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // background: {
  //   marginTop:30,
  //   flex: 1,
  //   width: '100%',
  //   height: '100%',
  //   resizeMode: 'cover',
  // },
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    marginTop:30,
    flex: 1,
    backgroundColor: '#000',
  },
  gradientOverlay: {
    flex: 1,
    paddingBottom: 40,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  headerContainer: {
    marginBottom: 24,
    marginTop: 24,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
  },
  waveContainer: {
    height: 140,
    width: '100%',
  },
  waveAnimation: {
    width: '100%',
    height: '100%',
  },
  headerContent: {
    padding: 20,
    paddingTop: 16,
  },
  headline: {
    fontSize: 24,
    fontWeight: '800',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 4,
  },
  subheadline: {
    fontSize: 16,
    fontWeight: '500',
    color: '#7F8C8D',
    textAlign: 'center',
    marginBottom: 20,
  },
  headerStats: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  statItem: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2C3E50',
  },
  statLabel: {
    fontSize: 14,
    color: '#7F8C8D',
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#EAEDED',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  cardWrapper: {
    width: '48%',
  },
  sectionContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2C3E50',
  },
  seeAll: {
    fontSize: 14,
    color: '#3498db',
    fontWeight: '600',
  },
});

export default SellerDashboard;
