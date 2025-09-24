// import React, { useState, useEffect, useRef } from 'react';
// import {
//   View,
//   StyleSheet,
//   Dimensions,
//   ScrollView,
//   Image,
//   TouchableOpacity,
//   ActivityIndicator,
//   Animated,
// } from 'react-native';
// import Video from 'react-native-video';
// import TopTabBar from '../../Dashboard/TopTabBar';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import { useNavigation } from '@react-navigation/native';
// import AppText from '../../../../components/AppText';
// import axios from 'axios';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import LinearGradient from 'react-native-linear-gradient';
// import HamburgerMenu from '../HamburgerMenu';

// const { width, height } = Dimensions.get('window');

// const Price = () => {
//   const insets = useSafeAreaInsets();
//   const navigation = useNavigation();
//   const scrollY = useRef(new Animated.Value(0)).current;
//   const scrollViewRef = useRef(null);

//   const [videoData, setVideoData] = useState(null);
//   const [headingData, setHeadingData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedCategory, setSelectedCategory] = useState('Economy');
//   const [isSticky, setIsSticky] = useState(false);

//   // Calculate the threshold for when the category selector should become sticky
//   const STICKY_THRESHOLD = 900; // Adjust this value based on your layout

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const videoResponse = await axios.get(
//           'http://10.7.10.49:9000/api/pricing/video',
//         );
//         if (videoResponse.data && videoResponse.data.length > 0) {
//           setVideoData(videoResponse.data[0]);
//         }

//         const headingResponse = await axios.get(
//           'http://10.7.10.49:9000/api/pricing/heading',
//         );
//         if (headingResponse.data) {
//           setHeadingData(headingResponse.data);
//         }
//       } catch (err) {
//         setError(err.message);
//         console.error('Error fetching data:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // Handle scroll events
//   const handleScroll = Animated.event(
//     [{ nativeEvent: { contentOffset: { y: scrollY } } }],
//     {
//       useNativeDriver: false,
//       listener: (event) => {
//         const offsetY = event.nativeEvent.contentOffset.y;
//         setIsSticky(offsetY > STICKY_THRESHOLD);
//       },
//     }
//   );

//   const scrollToComparison = () => {
//     if (scrollViewRef.current) {
//       scrollViewRef.current.scrollTo({
//         y: STICKY_THRESHOLD + 10,
//         animated: true,
//       });
//     }
//   };

//   if (loading) {
//     return (
//       <View style={styles.loaderContainer}>
//         <ActivityIndicator size="large" color="#000" />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.errorContainer}>
//         <AppText style={styles.errorText}>
//           Error loading content: {error}
//         </AppText>
//       </View>
//     );
//   }

//   const renderComparisonRow = (category, economy, mid, premium) => {
//     let content = '';
//     switch (selectedCategory) {
//       case 'Economy':
//         content = economy;
//         break;
//       case 'Mid-Range':
//         content = mid;
//         break;
//       case 'Premium':
//         content = premium;
//         break;
//     }

//     return (
//       <View key={category} style={styles.comparisonRow}>
//         <AppText weight="Inter" style={styles.comparisonCategory}>
//           {category}
//         </AppText>
//         <AppText weight="Inter" style={styles.comparisonContent}>
//           {content}
//         </AppText>
//       </View>
//     );
//   };

//   // Sticky category selector component
//   const StickyCategorySelector = () => (
//     <View style={[styles.stickyCategorySelector, isSticky && styles.stickyActive]}>
//       <View style={styles.categorySelector}>
//         <TouchableOpacity 
//           style={[
//             styles.categoryButton, 
//             selectedCategory === 'Economy' && styles.categoryButtonActive
//           ]}
//           onPress={() => setSelectedCategory('Economy')}
//         >
//           <AppText weight="Inter" style={[
//             styles.categoryButtonText,
//             selectedCategory === 'Economy' && styles.categoryButtonTextActive
//           ]}>
//             ECONOMY
//           </AppText>
//         </TouchableOpacity>
        
//         <TouchableOpacity 
//           style={[
//             styles.categoryButton, 
//             selectedCategory === 'Mid-Range' && styles.categoryButtonActive
//           ]}
//           onPress={() => setSelectedCategory('Mid-Range')}
//         >
//           <AppText weight="Inter" style={[
//             styles.categoryButtonText,
//             selectedCategory === 'Mid-Range' && styles.categoryButtonTextActive
//           ]}>
//             MID-RANGE
//           </AppText>
//         </TouchableOpacity>
        
//         <TouchableOpacity 
//           style={[
//             styles.categoryButton, 
//             selectedCategory === 'Premium' && styles.categoryButtonActive
//           ]}
//           onPress={() => setSelectedCategory('Premium')}
//         >
//           <AppText weight="Inter" style={[
//             styles.categoryButtonText,
//             selectedCategory === 'Premium' && styles.categoryButtonTextActive
//           ]}>
//             PREMIUM
//           </AppText>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   return (
//     <View style={{ paddingTop: insets.top, flex: 1, backgroundColor: 'white' }}>
//       <View style={styles.container}>
//         <View style={styles.Headercontainer}>
//           <TouchableOpacity
//             style={styles.backButton}
//             onPress={() => navigation.goBack()}>
//             <Icon name="arrow-back" size={30} color="#000" />
//           </TouchableOpacity>

//           <View style={styles.logoContainer}>
//             <Image
//               source={require('../../../../assets/logo.png')}
//               style={styles.logo}
//             />
//           </View>

//           <View style={styles.menuContainer}>
//             <HamburgerMenu />
//           </View>
//         </View>
//         <TopTabBar />
        
//         {/* Sticky Category Selector */}
//         <StickyCategorySelector />
        
//         <ScrollView 
//           ref={scrollViewRef}
//           contentContainerStyle={styles.scrollContent}
//           onScroll={handleScroll}
//           scrollEventThrottle={16}
//         >
//           <View style={styles.header}>
//             <AppText weight="Inter" style={styles.headerTitle}>
//               {videoData?.title || 'PRICE - KNOW IT ALL'}
//             </AppText>
//             <AppText weight="Inter" style={styles.headerSubtitle}>
//               {videoData?.subtitle ||
//                 'The cost is the entry fee, the value is the experience!'}
//             </AppText>
//             <View style={styles.videoContainer}>
//               {videoData?.video ? (
//                 <Video
//                   source={{
//                     uri: `http://10.7.10.49:9000/${videoData.video}`,
//                   }}
//                   style={styles.video}
//                   resizeMode="cover"
//                   muted
//                   paused={false}
//                   controls={false}
//                 />
//               ) : <></>}
//             </View>
//             {videoData?.sponsorLogo && (
//               <View style={styles.sponsorContainer}>
//                 <LinearGradient
//                   colors={['white', 'white']}
//                   style={styles.sponsorGradient}>

//                   <View style={styles.sponsorContent}>
//                     <Image
//                       source={{
//                         uri: `http://10.7.10.49:9000/${videoData.sponsorLogo}`,
//                       }}
//                       style={styles.sponsorLogo}
//                       resizeMode="contain"
//                     />
//                     {videoData.sponsorText && (
//                       <AppText weight="Inter" style={styles.sponsorText}>
//                         SPONSORED BY {videoData.sponsorText.toUpperCase()}
//                       </AppText>
//                     )}
//                   </View>
//                 </LinearGradient>
//               </View>
//             )}
//           </View>
//           <AppText weight="Inter" style={styles.headerSubtitle2}>
//             {
//               'When you are investing in uPVC windows & doors the price can vary based on several important factors- heres what goes into it'
//             }
//           </AppText>

//           {/* Premium Comparison Section */}
//           <View style={styles.comparisonContainer}>
//             <AppText weight="Inter" style={styles.comparisonTitle}>
//               COMPARISON OF UPVC WINDOWS
//             </AppText>
            
//             {/* Category Selector (Regular - not sticky) */}
//             { isSticky === false ? 
//             <View style={styles.categorySelector}>
//               <TouchableOpacity 
//                 style={[
//                   styles.categoryButton, 
//                   selectedCategory === 'Economy' && styles.categoryButtonActive
//                 ]}
//                 onPress={() => setSelectedCategory('Economy')}
//               >
//                 <AppText weight="Inter" style={[
//                   styles.categoryButtonText,
//                   selectedCategory === 'Economy' && styles.categoryButtonTextActive
//                 ]}>
//                   ECONOMY
//                 </AppText>
//               </TouchableOpacity>
              
//               <TouchableOpacity 
//                 style={[
//                   styles.categoryButton, 
//                   selectedCategory === 'Mid-Range' && styles.categoryButtonActive
//                 ]}
//                 onPress={() => setSelectedCategory('Mid-Range')}
//               >
//                 <AppText weight="Inter" style={[
//                   styles.categoryButtonText,
//                   selectedCategory === 'Mid-Range' && styles.categoryButtonTextActive
//                 ]}>
//                   MID-RANGE
//                 </AppText>
//               </TouchableOpacity>
              
//               <TouchableOpacity 
//                 style={[
//                   styles.categoryButton, 
//                   selectedCategory === 'Premium' && styles.categoryButtonActive
//                 ]}
//                 onPress={() => setSelectedCategory('Premium')}
//               >
//                 <AppText weight="Inter" style={[
//                   styles.categoryButtonText,
//                   selectedCategory === 'Premium' && styles.categoryButtonTextActive
//                 ]}>
//                   PREMIUM
//                 </AppText>
//               </TouchableOpacity>
//             </View> : <></>
// }
//             {/* Comparison Content */}
//             <View style={styles.comparisonContentContainer}>
//               {comparisonData.map(item => 
//                 renderComparisonRow(item.category, item.economy, item.mid, item.premium)
//               )}
//             </View>
 
//           </View>

//           <View style={styles.buyNowContainer}>
//             <TouchableOpacity
//               style={styles.buyNowButton}
//               onPress={() => navigation.navigate('BuyNowScreen')}>
//               <AppText weight="Inter" style={styles.buyNowText}>
//                 BUY NOW
//               </AppText>
//             </TouchableOpacity>
//           </View>
//         </ScrollView>
//       </View>
//     </View>
//   );
// };

// // Static comparison data based on the image
// const comparisonData = [
//   {
//     category: 'Profile Quality',
//     economy: 'Basic profiles, thinner walls (2–2.3 mm)',
//     mid: 'Standard profiles, medium wall thickness (2.5 mm)',
//     premium: 'High-grade profiles, thick walls (2.8 mm+), multi-chamber'
//   },
//   {
//     category: 'Steel Reinforcement',
//     economy: 'Minimal or absent (often 1 mm or less)',
//     mid: 'Moderate reinforcement (1.2–1.8 mm)',
//     premium: 'Strong reinforcement (1.5–2 mm galvanized steel)'
//   },
//   {
//     category: 'Durability',
//     economy: 'Prone to bending, discoloration, cracks over time',
//     mid: 'Good durability, average lifespan',
//     premium: 'Extremely durable, retains shape & finish for decades'
//   },
//   {
//     category: 'Hardware Quality',
//     economy: 'Low-cost hinges, locks, & handles',
//     mid: 'Branded basic hardware',
//     premium: 'Imported / premium hardware (multi point locking, anti-rust)'
//   },
//   {
//     category: 'Sound Insulation',
//     economy: 'Low (basic single glazing, limited sealing)',
//     mid: 'Moderate (better seals, option double glazing)',
//     premium: 'Excellent (multi-chamber design + double/triple glazing)'
//   },
//   {
//     category: 'Thermal Insulation',
//     economy: 'Poor insulation, limited energy savings',
//     mid: 'Decent insulation, noticeable comfort',
//     premium: 'High insulation, major energy savings on cooling/heating'
//   },
//   {
//     category: 'Weather Resistance',
//     economy: 'Limited, mostly white',
//     mid: 'Performs well in moderate weather',
//     premium: 'Designed for extreme weather conditions (UV resistant, storm proof)'
//   },
//   {
//     category: 'Aesthetic Options',
//     economy: 'Limited colors, mostly white',
//     mid: 'Some laminated color/wood finish',
//     premium: 'Wide range of laminated and designer finishes'
//   },
//   {
//     category: 'Warranty',
//     economy: '3–5 years',
//     mid: '7-10 years',
//     premium: '15–20+ years'
//   },
//   {
//     category: 'Cost',
//     economy: 'Lowest initial cost but frequent replacements',
//     mid: 'Balanced pricing & value',
//     premium: 'Higher upfront cost but lowest long-term cost'
//   }, 
//   {
//     category: 'Ideal For',
//     economy: 'Budget-conscious buyers, rental homes, short-term use',
//     mid: 'Middle-class homes, small offices, standard apartments',
//     premium: 'Premium homes, villas, high-rise luxury apartments/complexes',
//   },
// ];

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//   },
//   scrollContent: {
//     paddingBottom: 40,
//   },
//   header: {
//     padding: 20,
//     alignItems: 'center',
//   },
//   headerTitle: {
//     fontSize: width * 0.06,
//     color: '#000000',
//     letterSpacing: 2,
//     marginBottom: 5,
//   },
//   headerSubtitle: {
//     textAlign: 'center',
//     color: 'black',
//     marginTop: 5,
//     fontSize: 14,
//     opacity: 0.8,
//   },
//   headerSubtitle2: {
//     fontSize: 16,
//     color: '#000000',
//     paddingHorizontal: 25,
//     marginBottom: 20,
//     textAlign: 'center',
//     lineHeight: 22,
//   },
//   videoContainer: {
//     width: '100%',
//     aspectRatio: 10 / 16,
//     borderRadius: 10,
//     overflow: 'hidden',
//     marginTop: 15,
//     marginBottom: 10,
//   },
//   video: {
//     width: '100%',
//     height: '100%',
//   },
//   Headercontainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//     width: '100%',
//   },
//   backButton: {
//     padding: 5,
//     width: 40,
//     alignItems: 'flex-start',
//   },
//   logoContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   logo: {
//     width: 100,
//     height: 50,
//   },
//   menuContainer: {
//     width: 40,
//     alignItems: 'flex-end',
//   },
//   loaderContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   errorContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 16,
//     textAlign: 'center',
//   },
//   sponsorContainer: {
//     width: '90%',
//     borderRadius: 10,
//     overflow: 'hidden',
//     shadowRadius: 4,
//   },
//   sponsorGradient: {
//     padding: 15,
//     alignItems: 'center',
//   },
//   sponsorContent: {
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   sponsorLogo: {
//     width: 120,
//     height: 50,
//   },
//   sponsorText: {
//     fontSize: 12,
//     color: '#333',
//     letterSpacing: 1.5,
//     marginTop: 8,
//     fontWeight: '600',
//   },
//   buyNowContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 25,
//   },
//   buyNowButton: {
//     width: '70%',
//     backgroundColor: '#000000',
//     paddingVertical: 14,
//     borderRadius: 25,
//     alignItems: 'center',
//     justifyContent: 'center',
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//   },
//   buyNowText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     letterSpacing: 1,
//   },
  
//   // Comparison Section Styles
//   comparisonContainer: {
//     marginTop: 20,
//     paddingHorizontal: 15,
//   },
//   comparisonTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#000',
//     textAlign: 'center',
//     marginBottom: 20,
//     letterSpacing: 0.5,
//   },
//   categorySelector: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//     backgroundColor: '#f5f5f5',
//     borderRadius: 10,
//     padding: 5,
//   },
//   categoryButton: {
//     flex: 1,
//     paddingVertical: 10,
//     alignItems: 'center',
//     borderRadius: 8,
//   },
//   categoryButtonActive: {
//     backgroundColor: '#000',
//   },
//   categoryButtonText: {
//     fontSize: 12,
//     color: '#666',
//     fontWeight: '600',
//   },
//   categoryButtonTextActive: {
//     color: '#fff',
//   },
//   comparisonContentContainer: {
//     marginBottom: 20,
//   },
//   comparisonRow: {
//     marginBottom: 15,
//     paddingBottom: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   comparisonCategory: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: '#000',
//     marginBottom: 5,
//   },
//   comparisonContent: {
//     fontSize: 13,
//     color: '#333',
//     lineHeight: 18,
//   },
  
//   // Sticky Category Selector Styles
//   stickyCategorySelector: {
//     position: 'absolute',
//     top: 120, // Adjust based on your header height
//     left: 0,
//     right: 0,
//     zIndex: 1000,
//     opacity: 0,
//     transform: [{ translateY: -50 }],
//     paddingHorizontal: 15,
//   },
//   stickyActive: {
//     opacity: 1,
//     transform: [{ translateY: 0 }],
//   },
// });

// export default Price;

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
  RefreshControl,
} from 'react-native';
import Video from 'react-native-video';
import TopTabBar from '../../Dashboard/TopTabBar';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import AppText from '../../../../components/AppText';
import axios from 'axios';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import HamburgerMenu from '../HamburgerMenu';

const { width, height } = Dimensions.get('window');

const Price = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);

  const [videoData, setVideoData] = useState(null);
  const [headingData, setHeadingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('Economy');
  const [isSticky, setIsSticky] = useState(false);

  // Calculate the threshold for when the category selector should become sticky
  const STICKY_THRESHOLD = 900; // Adjust this value based on your layout

  const fetchData = async () => {
    try {
      setLoading(true);
      const videoResponse = await axios.get(
        'http://10.7.10.49:9000/api/pricing/video',
      );
      if (videoResponse.data && videoResponse.data.length > 0) {
        setVideoData(videoResponse.data[0]);
      }

      const headingResponse = await axios.get(
        'http://10.7.10.49:9000/api/pricing/heading',
      );
      if (headingResponse.data) {
        setHeadingData(headingResponse.data);
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  // Handle scroll events
  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    {
      useNativeDriver: false,
      listener: (event) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        setIsSticky(offsetY > STICKY_THRESHOLD);
      },
    }
  );

  const scrollToComparison = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        y: STICKY_THRESHOLD + 10,
        animated: true,
      });
    }
  };

  // Handle category selection specifically for comparison
  const handleCategorySelection = (category) => {
    setSelectedCategory(category);
  };

  if (loading && !refreshing) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <AppText style={styles.errorText}>
          Error loading content: {error}
        </AppText>
      </View>
    );
  }

  const renderComparisonRow = (category, economy, mid, premium) => {
    let content = '';
    switch (selectedCategory) {
      case 'Economy':
        content = economy;
        break;
      case 'Mid-Range':
        content = mid;
        break;
      case 'Premium':
        content = premium;
        break;
    }

    return (
      <View key={category} style={styles.comparisonRow}>
        <AppText weight="Inter" style={styles.comparisonCategory}>
          {category}
        </AppText>
        <AppText weight="Inter" style={styles.comparisonContent}>
          {content}
        </AppText>
      </View>
    );
  };

  // Category selector component that can be used both as sticky and regular
  const CategorySelector = ({ isSticky: stickyMode = false }) => (
    <View style={[
      styles.categorySelector,
      stickyMode && styles.stickyCategorySelectorContainer
    ]}>
      <TouchableOpacity 
        style={[
          styles.categoryButton, 
          selectedCategory === 'Economy' && styles.categoryButtonActive
        ]}
        onPress={() => handleCategorySelection('Economy')}
      >
        <AppText weight="Inter" style={[
          styles.categoryButtonText,
          selectedCategory === 'Economy' && styles.categoryButtonTextActive
        ]}>
          ECONOMY
        </AppText>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[
          styles.categoryButton, 
          selectedCategory === 'Mid-Range' && styles.categoryButtonActive
        ]}
        onPress={() => handleCategorySelection('Mid-Range')}
      >
        <AppText weight="Inter" style={[
          styles.categoryButtonText,
          selectedCategory === 'Mid-Range' && styles.categoryButtonTextActive
        ]}>
          MID-RANGE
        </AppText>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[
          styles.categoryButton, 
          selectedCategory === 'Premium' && styles.categoryButtonActive
        ]}
        onPress={() => handleCategorySelection('Premium')}
      >
        <AppText weight="Inter" style={[
          styles.categoryButtonText,
          selectedCategory === 'Premium' && styles.categoryButtonTextActive
        ]}>
          PREMIUM
        </AppText>
      </TouchableOpacity>
    </View>
  );

  // Sticky category selector component
  const StickyCategorySelector = () => (
    <Animated.View style={[
      styles.stickyCategorySelector, 
      isSticky && styles.stickyActive
    ]}>
      <CategorySelector isSticky={true} />
    </Animated.View>
  );

  return (
    <View style={{ paddingTop: insets.top, flex: 1, backgroundColor: 'white' }}>
      <View style={styles.container}>
        <View style={styles.Headercontainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={30} color="#000" />
          </TouchableOpacity>

          <View style={styles.logoContainer}>
            <Image
              source={require('../../../../assets/logo.png')}
              style={styles.logo}
            />
          </View>

          <View style={styles.menuContainer}>
            <HamburgerMenu />
          </View>
        </View>
        <TopTabBar />
        
        {/* Sticky Category Selector */}
        <StickyCategorySelector />
        
        <ScrollView 
          ref={scrollViewRef}
          contentContainerStyle={styles.scrollContent}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#000000']}
              tintColor={'#000000'}
            />
          }
        >
          <View style={styles.header}>
            <AppText weight="Inter" style={styles.headerTitle}>
              {videoData?.title || 'PRICE - KNOW IT ALL'}
            </AppText>
            <AppText weight="Inter" style={styles.headerSubtitle}>
              {videoData?.subtitle ||
                'The cost is the entry fee, the value is the experience!'}
            </AppText>
            <View style={styles.videoContainer}>
              {videoData?.video ? (
                <Video
                  source={{
                    uri: `http://10.7.10.49:9000/${videoData.video}`,
                  }}
                  style={styles.video}
                  resizeMode="cover"
                  muted
                  paused={false}
                  controls={false}
                />
              ) : <></>}
            </View>
            {videoData?.sponsorLogo && (
              <View style={styles.sponsorContainer}>
                <LinearGradient
                  colors={['white', 'white']}
                  style={styles.sponsorGradient}>

                  <View style={styles.sponsorContent}>
                    <Image
                      source={{
                        uri: `http://10.7.10.49:9000/${videoData.sponsorLogo}`,
                      }}
                      style={styles.sponsorLogo}
                      resizeMode="contain"
                    />
                    {videoData.sponsorText && (
                      <AppText weight="Inter" style={styles.sponsorText}>
                        SPONSORED BY {videoData.sponsorText.toUpperCase()}
                      </AppText>
                    )}
                  </View>
                </LinearGradient>
              </View>
            )}
          </View>
          <AppText weight="Inter" style={styles.headerSubtitle2}>
            {
              'When you are investing in uPVC windows & doors the price can vary based on several important factors- heres what goes into it'
            }
          </AppText>

          {/* Premium Comparison Section */}
          <View style={styles.comparisonContainer}>
            <AppText weight="Inter" style={styles.comparisonTitle}>
              COMPARISON OF UPVC WINDOWS
            </AppText>
            
            {/* Category Selector (Regular - always visible) */}
            <CategorySelector />

            {/* Comparison Content */}
            <View style={styles.comparisonContentContainer}>
              {comparisonData.map(item => 
                renderComparisonRow(item.category, item.economy, item.mid, item.premium)
              )}
            </View>
 
          </View>

          <View style={styles.buyNowContainer}>
            <TouchableOpacity
              style={styles.buyNowButton}
              onPress={() => navigation.navigate('BuyNowScreen')}>
              <AppText weight="Inter" style={styles.buyNowText}>
                BUY NOW
              </AppText>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

// Static comparison data based on the image
const comparisonData = [
  {
    category: 'Profile Quality',
    economy: 'Basic profiles, thinner walls (2–2.3 mm)',
    mid: 'Standard profiles, medium wall thickness (2.5 mm)',
    premium: 'High-grade profiles, thick walls (2.8 mm+), multi-chamber'
  },
  {
    category: 'Steel Reinforcement',
    economy: 'Minimal or absent (often 1 mm or less)',
    mid: 'Moderate reinforcement (1.2–1.8 mm)',
    premium: 'Strong reinforcement (1.5–2 mm galvanized steel)'
  },
  {
    category: 'Durability',
    economy: 'Prone to bending, discoloration, cracks over time',
    mid: 'Good durability, average lifespan',
    premium: 'Extremely durable, retains shape & finish for decades'
  },
  {
    category: 'Hardware Quality',
    economy: 'Low-cost hinges, locks, & handles',
    mid: 'Branded basic hardware',
    premium: 'Imported / premium hardware (multi point locking, anti-rust)'
  },
  {
    category: 'Sound Insulation',
    economy: 'Low (basic single glazing, limited sealing)',
    mid: 'Moderate (better seals, option double glazing)',
    premium: 'Excellent (multi-chamber design + double/triple glazing)'
  },
  {
    category: 'Thermal Insulation',
    economy: 'Poor insulation, limited energy savings',
    mid: 'Decent insulation, noticeable comfort',
    premium: 'High insulation, major energy savings on cooling/heating'
  },
  {
    category: 'Weather Resistance',
    economy: 'Limited, mostly white',
    mid: 'Performs well in moderate weather',
    premium: 'Designed for extreme weather conditions (UV resistant, storm proof)'
  },
  {
    category: 'Aesthetic Options',
    economy: 'Limited colors, mostly white',
    mid: 'Some laminated color/wood finish',
    premium: 'Wide range of laminated and designer finishes'
  },
  {
    category: 'Warranty',
    economy: '3–5 years',
    mid: '7-10 years',
    premium: '15–20+ years'
  },
  {
    category: 'Cost',
    economy: 'Lowest initial cost but frequent replacements',
    mid: 'Balanced pricing & value',
    premium: 'Higher upfront cost but lowest long-term cost'
  }, 
  {
    category: 'Ideal For',
    economy: 'Budget-conscious buyers, rental homes, short-term use',
    mid: 'Middle-class homes, small offices, standard apartments',
    premium: 'Premium homes, villas, high-rise luxury apartments/complexes',
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: width * 0.06,
    color: '#000000',
    letterSpacing: 2,
    marginBottom: 5,
  },
  headerSubtitle: {
    textAlign: 'center',
    color: 'black',
    marginTop: 5,
    fontSize: 14,
    opacity: 0.8,
  },
  headerSubtitle2: {
    fontSize: 16,
    color: '#000000',
    paddingHorizontal: 25,
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: 22,
  },
  videoContainer: {
    width: '100%',
    aspectRatio: 10 / 16,
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 15,
    marginBottom: 10,
  },
  video: {
    width: '100%',
    height: '100%',
  },
  Headercontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: '100%',
  },
  backButton: {
    padding: 5,
    width: 40,
    alignItems: 'flex-start',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 50,
  },
  menuContainer: {
    width: 40,
    alignItems: 'flex-end',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  sponsorContainer: {
    width: '90%',
    borderRadius: 10,
    overflow: 'hidden',
    shadowRadius: 4,
  },
  sponsorGradient: {
    padding: 15,
    alignItems: 'center',
  },
  sponsorContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  sponsorLogo: {
    width: 120,
    height: 50,
  },
  sponsorText: {
    fontSize: 12,
    color: '#333',
    letterSpacing: 1.5,
    marginTop: 8,
    fontWeight: '600',
  },
  buyNowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
  },
  buyNowButton: {
    width: '70%',
    backgroundColor: '#000000',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buyNowText: {
    color: '#FFFFFF',
    fontSize: 16,
    letterSpacing: 1,
  },
  
  // Comparison Section Styles
  comparisonContainer: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  comparisonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
    letterSpacing: 0.5,
  },
  categorySelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 5,
  },
  categoryButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  categoryButtonActive: {
    backgroundColor: '#000',
  },
  categoryButtonText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
  categoryButtonTextActive: {
    color: '#fff',
  },
  comparisonContentContainer: {
    marginBottom: 20,
  },
  comparisonRow: {
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  comparisonCategory: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  comparisonContent: {
    fontSize: 13,
    color: '#333',
    lineHeight: 18,
  },
  
  // Sticky Category Selector Styles
  stickyCategorySelector: {
    position: 'absolute',
    top: 120, // Adjust based on your header height
    left: 0,
    right: 0,
    zIndex: 1000,
    opacity: 0,
    paddingHorizontal: 15,
  },
  stickyActive: {
    opacity: 1,
  },
  stickyCategorySelectorContainer: {
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
});

export default Price;