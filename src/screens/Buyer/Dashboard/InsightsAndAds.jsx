// import React from 'react';
// import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
// import { styles } from './styles/insightsStyles';
// import PrimaryButton from '../../../components/UI/PrimaryButton';
// import Icon from 'react-native-vector-icons/MaterialIcons';

// const InsightsAndAds = ({ navigation }) => {
//   // Trending data
//   const trends = [
//     { category: 'UPVC Profiles', topChoice: 'uPVC X', percentage: 65 },
//     { category: 'Hardware', topChoice: 'Roto', percentage: 70 },
//     { category: 'Glass', topChoice: 'Tinted', percentage: 70 },
//     { category: 'Avg. Budget', value: '₹450/sft' }
//   ];

//   // Ad banners
//   const ads = [
//     { id: 1, title: 'UPVC Profiles', image: 'https://en.lesso.com/blogs/wp-content/uploads/2021/03/all-you-need-to-know-about-upvc-windows-1024x714.jpg' },
//     { id: 2, title: 'Hardware', image: 'https://siridesignercollections.com/wp-content/uploads/2020/04/list-of-upvc-hardware.jpg' },
//     { id: 3, title: 'Glass', image: 'https://www.guardianglass.com/content/dam/guardianindustriesholdings/project/usca/CSUC_B028-1.jpg.transform/rendition-730-420/img.jpg' },
//     { id: 4, title: 'Sealants', image: 'https://heartlandinspections.com/wp-content/uploads/2022/09/caulking_the_toilet_25.jpeg' },
//     { id: 5, title: 'Reinforcements', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNnqtdIQTK4cWQN4uS6zJffx8mPkErNObSEg&s' }
//   ];

//   return (
//     <ScrollView 
//       contentContainerStyle={styles.container}
//       showsVerticalScrollIndicator={false}
//     >
//       {/* Header */}
//       <View style={styles.headerContainer}>
//         <Text style={styles.header}>What's Hot in UPVC</Text>
//         <Text style={styles.subHeader}>Current market trends and recommendations</Text>
//       </View>

//       {/* Trends Section */}
//       <View style={styles.sectionContainer}>
//         <Text style={styles.sectionTitle}>Market Insights</Text>
        
//         <View style={styles.trendsGrid}>
//           {trends.map((trend, index) => (
//             <View key={index} style={styles.trendCard}>
//               <Text style={styles.trendCategory}>{trend.category}</Text>
//               {trend.value ? (
//                 <Text style={styles.trendValue}>{trend.value}</Text>
//               ) : (
//                 <>
//                   <Text style={styles.trendChoice}>{trend.topChoice}</Text>
//                   <View style={styles.percentageBadge}>
//                     <Text style={styles.percentageText}>{trend.percentage}%</Text>
//                   </View>
//                 </>
//               )}
//             </View>
//           ))}
//         </View>
//       </View>

//       {/* Ad Space */}
//       <View style={styles.sectionContainer}>
//         <Text style={styles.sectionTitle}>Featured Products</Text>
        
//         <ScrollView 
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={styles.adsContainer}
//         >
//           {ads.map(ad => (
//             <TouchableOpacity key={ad.id} style={styles.adCard}>
//               <Image 
//                 source={{ uri: ad.image }} 
//                 style={styles.adImage}
//                 resizeMode="cover"
//               />
//               <Text style={styles.adTitle}>{ad.title}</Text>
//             </TouchableOpacity>
//           ))}
//         </ScrollView>
//       </View>

//       {/* Action Buttons */}
//       <View style={styles.buttonContainer}>
//         <PrimaryButton
//           title="Back to Dashboard"
//           onPress={() => navigation.navigate('HomeDashboard')}
//           style={styles.button}
//           type="outline"
//           icon="arrow-back"
//         />
//         <PrimaryButton
//           title="Submit New Request"
//           onPress={() => navigation.navigate('BuyerOnboarding')}
//           style={styles.button}
//           icon="add"
//         />
//       </View>
//     </ScrollView>
//   );
// };

// export default InsightsAndAds;

import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ImageBackground, 
  ScrollView, 
  Image, 
  Dimensions,
  Animated,
  PanResponder
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');
const BANNER_WIDTH = width - 40;
const BANNER_HEIGHT = 180;

const MarketInsights = ({ navigation }) => {
  // Sample market data
  const marketData = [
    { category: 'Top Profile', value: 'uPVC X', percentage: '65%', icon: 'star' },
    { category: 'Hardware', value: 'Roto', percentage: '70%', icon: 'build' },
    { category: 'Glass', value: 'Tinted', percentage: '70%', icon: 'filter' },
    { category: 'Avg. Budget', value: '₹20,000', percentage: '', icon: 'attach-money' }
  ];

  // Premium ad banners with better images
  const adBanners = [
    { 
      id: 1, 
      title: 'Premium uPVC Profiles', 
      subtitle: 'Weather-resistant & durable',
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
    },
    { 
      id: 2, 
      title: 'Hardware Solutions', 
      subtitle: 'German-engineered quality',
      image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
    },
    { 
      id: 3, 
      title: 'Tempered Glass', 
      subtitle: 'Safety & clarity guaranteed',
      image: "https://images.unsplash.com/photo-1519669417670-68775a50919c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
    },
    { 
      id: 4, 
      title: 'Premium Sealants', 
      subtitle: 'Perfect insulation',
      image: "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
    },
    { 
      id: 5, 
      title: 'Structural Reinforcements', 
      subtitle: 'Enhanced durability',
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
    }
  ];

  // Carousel state
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef(null);
  const timerRef = useRef(null);

  // Auto-scroll every 3 seconds
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrentIndex(prev => (prev === adBanners.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(timerRef.current);
  }, []);

  // Update scroll position when index changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        x: currentIndex * BANNER_WIDTH,
        animated: true
      });
    }
  }, [currentIndex]);

  // Handle manual swipe
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dx < -50) {
        // Swipe left
        setCurrentIndex(prev => Math.min(prev + 1, adBanners.length - 1));
      } else if (gestureState.dx > 50) {
        // Swipe right
        setCurrentIndex(prev => Math.max(prev - 1, 0));
      }
    },
  });

  return (
    <ImageBackground 
      source={require('../../../assets/logo.png')} 
      style={styles.background}
      blurRadius={2}
    >
      <LinearGradient
        colors={['rgba(255,255,255,0.98)', 'rgba(245,249,255,0.95)']}
        style={styles.gradientOverlay}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headline}>Market Intelligence</Text>
            <Text style={styles.subheader}>Data-driven insights to grow your business</Text>
          </View>

          {/* Market Insights */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Current Trends</Text>
              <Icon name="trending-up" size={24} color="#3F51B5" />
            </View>
            <View style={styles.insightsContainer}>
              {marketData.map((item, index) => (
                <View key={index} style={styles.insightCard}>
                  <View style={styles.insightIcon}>
                    <Icon name={item.icon} size={20} color="#3F51B5" />
                  </View>
                  <Text style={styles.insightCategory}>{item.category}</Text>
                  <Text style={styles.insightValue}>{item.value}</Text>
                  {item.percentage ? (
                    <View style={styles.percentageBadge}>
                      <Text style={styles.percentageText}>{item.percentage}</Text>
                    </View>
                  ) : null}
                </View>
              ))}
            </View>
          </View>

          {/* Ad Space Carousel */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Featured Partners</Text>
              <View style={styles.indicatorContainer}>
                {adBanners.map((_, idx) => (
                  <View 
                    key={idx} 
                    style={[
                      styles.indicator,
                      currentIndex === idx && styles.activeIndicator
                    ]}
                  />
                ))}
              </View>
            </View>
            
            <View style={styles.carouselContainer} {...panResponder.panHandlers}>
              <Animated.ScrollView
                ref={scrollRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event(
                  [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                  { useNativeDriver: false }
                )}
                scrollEventThrottle={16}
                onMomentumScrollEnd={(ev) => {
                  const newIndex = Math.round(
                    ev.nativeEvent.contentOffset.x / BANNER_WIDTH
                  );
                  setCurrentIndex(newIndex);
                }}
              >
                {adBanners.map((ad) => (
                  <View key={ad.id} style={styles.bannerContainer}>
                    <Image
                      source={{ uri: ad.image }}
                      style={styles.bannerImage}
                      resizeMode="cover"
                    />
                    <LinearGradient
                      colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.3)', 'transparent']}
                      style={styles.bannerOverlay}
                    >
                      <View style={styles.bannerContent}>
                        <Text style={styles.bannerTitle}>{ad.title}</Text>
                        <Text style={styles.bannerSubtitle}>{ad.subtitle}</Text>
                      </View>
                    </LinearGradient>
                  </View>
                ))}
              </Animated.ScrollView>
            </View>
          </View>

          {/* CTA Buttons */}
          {/* <View style={styles.buttonRow}>
            <TouchableOpacity 
              style={[styles.button, styles.secondaryButton]}
              onPress={() => navigation.navigate('HomeDashboard')}
            >
              <Icon name="dashboard" size={20} color="white" />
              <Text style={styles.buttonText}>Dashboard</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.button, styles.primaryButton]}
              onPress={() => navigation.navigate('BuyerOnboarding')}
            >
              <Icon name="add" size={20} color="white" />
              <Text style={styles.buttonText}>New Request</Text>
            </TouchableOpacity>
          </View> */}
        </ScrollView>
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gradientOverlay: {
    flex: 1,
    paddingBottom: 40,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginTop:30,
    marginBottom: 30,
    alignItems: 'center',
  },
  headline: {
    fontSize: 28,
    fontWeight: '800',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  subheader: {
    fontSize: 16,
    color: '#7F8C8D',
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2C3E50',
  },
  insightsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  insightCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 18,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  insightIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EBF5FB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  insightCategory: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 5,
    fontWeight: '500',
  },
  insightValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2C3E50',
    // backgroundColor: '#3F51B5',
    marginBottom: 8,
  },
  percentageBadge: {
    backgroundColor: '#EBF5FB',
    alignSelf: 'flex-start',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  percentageText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3F51B5',
  },
  carouselContainer: {
    height: BANNER_HEIGHT,
    borderRadius: 16,
    overflow: 'hidden',
  },
  bannerContainer: {
    width: BANNER_WIDTH,
    height: BANNER_HEIGHT,
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    padding: 20,
    justifyContent: 'flex-end',
  },
  bannerContent: {
    marginBottom: 10,
  },
  bannerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: 'white',
    marginBottom: 5,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  bannerSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#BDC3C7',
    marginHorizontal: 3,
  },
  activeIndicator: {
    backgroundColor: '#2E86C1',
    width: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    width: '48%',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  primaryButton: {
    backgroundColor: '#2E86C1',
  },
  secondaryButton: {
    backgroundColor: '#95A5A6',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginLeft: 8,
  },
});

export default MarketInsights;