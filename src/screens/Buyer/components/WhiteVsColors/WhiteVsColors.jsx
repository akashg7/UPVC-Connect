// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Dimensions,
//   ScrollView,
//   Image,
//   TouchableOpacity,
//   ActivityIndicator,
// } from 'react-native';
// import Video from 'react-native-video';
// import TopTabBar from '../../Dashboard/TopTabBar';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import {useNavigation} from '@react-navigation/native';
// import AppText from '../../../../components/AppText';
// import {useSafeAreaInsets} from 'react-native-safe-area-context';
// import axios from 'axios';

// const {width, height} = Dimensions.get('window');

// const WhiteVsColor = () => {
//   const navigation = useNavigation();
//   const insets = useSafeAreaInsets();
//   const [video, setVideo] = useState(null);
//   const [difference, setDifference] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [videoResponse, differenceResponse] = await Promise.all([
//           axios.get('http://10.7.10.49:9000/api/color/video'),
//           axios.get('http://10.7.10.49:9000/api/color/comparisons'),
//         ]);

//         if (videoResponse.data.length > 0) {
//           setVideo(videoResponse.data[0]);
//         }
//         setDifference(differenceResponse.data);
//       } catch (err) {
//         console.error('Error fetching White vs Color Data:', err);
//         setError('Failed to load data. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   const renderRow = type => {
//     const item = difference.find(d => d.type === type);
//     if (!item) return null;

//     return (
//       <View>
//         <AppText weight="Inter" style={styles.category}>
//           {type}
//         </AppText>
//         <View style={styles.tableRow}>
//           <View style={styles.cell}>
//             <AppText weight="Inter" style={styles.description}>
//               {item.white}
//             </AppText>
//           </View>
//           <View style={styles.cell}>
//             <AppText weight="Inter" style={styles.description}>
//               {item.lam}
//             </AppText>
//           </View>
//         </View>
//       </View>
//     );
//   };

//   return (
//     <View style={{paddingTop: insets.top, flex: 1, backgroundColor: 'white'}}>
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
//         </View>
//         <TopTabBar />

//         {loading ? (
//           <View
//             style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//             <ActivityIndicator size="large" color="#000" />
//           </View>
//         ) : error ? (
//           <View style={{padding: 20}}>
//             <Text style={{color: 'red'}}>{error}</Text>
//           </View>
//         ) : (
//           <ScrollView contentContainerStyle={styles.scrollContent}>
//             <View style={styles.header}>
//               <AppText weight="Inter" style={styles.headerTitle}>
//                 WHITE VS COLOR
//               </AppText>
//               <View style={styles.videoContainer}>
//                 <Video
//                   source={{
//                     uri: `http://10.7.10.49:9000${video.src}`,
//                   }}
//                   style={styles.video}
//                   resizeMode="cover"
//                   repeat
//                   muted
//                   paused={false}
//                   controls={false}
//                 />
//               </View>
//             </View>
//             {video?.sponsorLogo && (
//               <View style={styles.premiumSponsorContainer}>
//                 <View style={styles.premiumSponsorContent}>
//                   <View style={styles.sponsorDivider} />
//                   <Image
//                     source={{
//                       uri: `http://10.7.10.49:9000/${video.sponsorLogo}`,
//                     }}
//                     style={styles.premiumSponsorLogo}
//                     resizeMode="contain"
//                   />
//                   {video.sponsorText && (
//                     <AppText weight="Inter" style={styles.premiumSponsorText}>
//                       {video.sponsorText.toUpperCase()}
//                     </AppText>
//                   )}
//                   <View style={styles.sponsorDivider} />
//                 </View>
//               </View>
//             )}

//             <View style={styles.tableContainer}>
//               <View style={styles.tableHeader}>
//                 <AppText
//                   weight="Inter"
//                   style={[styles.tableHeaderText, {textAlign: 'left'}]}>
//                   WHITE
//                 </AppText>
//                 <AppText
//                   weight="Inter"
//                   style={[styles.tableHeaderText, {textAlign: 'right'}]}>
//                   LAMINATED
//                 </AppText>
//               </View>

//               {[
//                 'APPEARANCE',
//                 'COST',
//                 'UV RESISTANCE & FADING',
//                 'MAINTENANCE',
//                 'HEAT RESISTANCE',
//                 'SCRATCH VISIBILITY',
//                 'AVAILABILITY',
//               ].map(type => renderRow(type))}
//             </View>

//             <View style={styles.buyNowContainer}>
//               <TouchableOpacity
//                 style={styles.buyNowButton}
//                 onPress={() => navigation.navigate('BuyNowScreen')}>
//                 <AppText weight="Inter" style={styles.buyNowText}>
//                   BUY NOW
//                 </AppText>
//               </TouchableOpacity>
//             </View>
//           </ScrollView>
//         )}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//   },
//   Headercontainer: {},
//   backButton: {
//     position: 'absolute',
//     left: 10,
//     top: '30%',
//     transform: [{translateY: -12}],
//     padding: 5,
//   },
//   logoContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   logo: {
//     width: 100,
//     height: 50,
//   },
//   scrollContent: {
//     paddingBottom: 20,
//   },
//   header: {
//     padding: 20,
//     alignItems: 'center',
//   },
//   headerTitle: {
//     fontSize: width * 0.06,
//     color: '#000000',
//     letterSpacing: 2,
//   },
//   tableContainer: {
//     margin: 15,
//     borderRadius: 10,
//     elevation: 3,
//     backgroundColor: '#FFFFFF',
//   },
//   tableHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     padding: 15,
//   },
//   tableHeaderText: {
//     fontSize: width * 0.045,
//     color: '#000000',
//     flex: 1,
//   },
//   tableRow: {
//     flexDirection: 'row',
//   },
//   cell: {
//     flex: 1,
//     padding: 15,
//   },
//   category: {
//     textAlign: 'center',
//     fontSize: width * 0.04,
//     color: '#000000',
//     marginBottom: 5,
//   },
//   description: {
//     fontSize: width * 0.035,
//     color: '#A0A0A0',
//     lineHeight: 20,
//   },
//   videoContainer: {
//     width: '100%',
//     aspectRatio: 10 / 16,
//     borderRadius: 10,
//     overflow: 'hidden',
//     marginTop: 15,
//   },
//   video: {
//     width: '100%',
//     height: '100%',
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
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//   },
//   buyNowText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     letterSpacing: 1,
//   },
//   premiumSponsorContainer: {
//     width: '100%', 
//     backgroundColor: '#fff',
//   },
//   premiumSponsorContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   premiumSponsorText: {
//     fontSize: 10,
//     color: '#999',
//     letterSpacing: 1,
//     marginHorizontal: 12,
//     fontWeight: '500',
//   },
//   premiumSponsorLogo: {
//     width: 100,
//     height: 40,
//   },
//   sponsorDivider: {
//     flex: 1,
//     height: 1,
//     backgroundColor: '#eee',
//   },
// });

// export default WhiteVsColor;



// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Dimensions,
//   ScrollView,
//   Image,
//   TouchableOpacity,
//   ActivityIndicator,
// } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import Video from 'react-native-video';
// import TopTabBar from '../../Dashboard/TopTabBar';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import {useNavigation} from '@react-navigation/native';
// import AppText from '../../../../components/AppText';
// import {useSafeAreaInsets} from 'react-native-safe-area-context';
// import axios from 'axios';

// const {width, height} = Dimensions.get('window');

// const WhiteVsColor = () => {
//   const navigation = useNavigation();
//   const insets = useSafeAreaInsets();
//   const [video, setVideo] = useState(null);
//   const [difference, setDifference] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [videoResponse, differenceResponse] = await Promise.all([
//           axios.get('http://10.7.10.49:9000/api/color/video'),
//           axios.get('http://10.7.10.49:9000/api/color/comparisons'),
//         ]);

//         if (videoResponse.data.length > 0) {
//           setVideo(videoResponse.data[0]);
//         }
//         setDifference(differenceResponse.data);
//       } catch (err) {
//         console.error('Error fetching White vs Color Data:', err);
//         setError('Failed to load data. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   const renderRow = type => {
//     const item = difference.find(d => d.type === type);
//     if (!item) return null;

//     return (
//       <View key={type} style={styles.rowContainer}>
//         <AppText weight="Inter" style={styles.category}>
//           {type}
//         </AppText>
//         <View style={styles.tableRow}>
//           <View style={styles.cell}>
//             <AppText weight="Inter" style={styles.description}>
//               {item.white}
//             </AppText>
//           </View>
//           <View style={styles.cell}>
//             <AppText weight="Inter" style={styles.description}>
//               {item.lam}
//             </AppText>
//           </View>
//         </View>
//       </View>
//     );
//   };

//   return (
//     <View style={{paddingTop: insets.top, flex: 1, backgroundColor: 'white'}}>
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
//         </View>
//         <TopTabBar />

//         {loading ? (
//           <View
//             style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//             <ActivityIndicator size="large" color="#000" />
//           </View>
//         ) : error ? (
//           <View style={{padding: 20}}>
//             <Text style={{color: 'red'}}>{error}</Text>
//           </View>
//         ) : (
//           <ScrollView contentContainerStyle={styles.scrollContent}>
//             <View style={styles.header}>
//               <AppText weight="Inter" style={styles.headerTitle}>
//                 WHITE VS COLOR
//               </AppText>
//               <View style={styles.videoContainer}>
//                 <Video
//                   source={{
//                     uri: `http://10.7.10.49:9000${video.src}`,
//                   }}
//                   style={styles.video}
//                   resizeMode="cover"
//                   repeat
//                   muted
//                   paused={false}
//                   controls={false}
//                 />
//               </View>
//               {video?.sponsorLogo && (
//                 <View style={styles.sponsorContainer}>
//                   <LinearGradient
//                     colors={['white', 'white']}
//                     style={styles.sponsorGradient}>
//                     <View style={styles.sponsorContent}>
//                       <Image
//                         source={{
//                           uri: `http://10.7.10.49:9000/${video.sponsorLogo}`,
//                         }}
//                         style={styles.sponsorLogo}
//                         resizeMode="contain"
//                       />
//                       {video.sponsorText && (
//                         <AppText weight="Inter" style={styles.sponsorText}>
//                           SPONSORED BY {video.sponsorText.toUpperCase()}
//                         </AppText>
//                       )}
//                     </View>
//                   </LinearGradient>
//                 </View>
//               )}
//             </View>

//             <View style={styles.tableContainer}>
//               <View style={styles.tableHeader}>
//                 <AppText
//                   weight="Inter"
//                   style={[styles.tableHeaderText, {textAlign: 'left'}]}>
//                   WHITE
//                 </AppText>
//                 <AppText
//                   weight="Inter"
//                   style={[styles.tableHeaderText, {textAlign: 'right'}]}>
//                   LAMINATED
//                 </AppText>
//               </View>

//               {[
//                 'APPEARANCE',
//                 'COST',
//                 'UV RESISTANCE & FADING',
//                 'MAINTENANCE',
//                 'HEAT RESISTANCE',
//                 'SCRATCH VISIBILITY',
//                 'AVAILABILITY',
//               ].map(type => renderRow(type))}
//             </View>

//             <View style={styles.buyNowContainer}>
//               <TouchableOpacity
//                 style={styles.buyNowButton}
//                 onPress={() => navigation.navigate('BuyNowScreen')}>
//                 <AppText weight="Inter" style={styles.buyNowText}>
//                   BUY NOW
//                 </AppText>
//               </TouchableOpacity>
//             </View>
//           </ScrollView>
//         )}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//   },
//   Headercontainer: {},
//   backButton: {
//     position: 'absolute',
//     left: 10,
//     top: '30%',
//     transform: [{translateY: -12}],
//     padding: 5,
//   },
//   logoContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   logo: {
//     width: 100,
//     height: 50,
//   },
//   scrollContent: {
//     paddingBottom: 20,
//   },
//   header: {
//     padding: 20,
//     alignItems: 'center',
//   },
//   headerTitle: {
//     fontSize: width * 0.06,
//     color: '#000000',
//     letterSpacing: 2,
//   },
//   tableContainer: {
//     margin: 15,
//     borderRadius: 10,
//     elevation: 3,
//     backgroundColor: '#FFFFFF',
//   },
//   tableHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     padding: 15,
//   },
//   tableHeaderText: {
//     fontSize: width * 0.045,
//     color: '#000000',
//     flex: 1,
//   },
//   rowContainer: {
//     marginBottom: 10,
//   },
//   tableRow: {
//     flexDirection: 'row',
//   },
//   cell: {
//     flex: 1,
//     padding: 15,
//   },
//   category: {
//     textAlign: 'center',
//     fontSize: width * 0.04,
//     color: '#000000',
//     marginBottom: 5,
//   },
//   description: {
//     fontSize: width * 0.035,
//     color: '#A0A0A0',
//     lineHeight: 20,
//   },
//   videoContainer: {
//     width: '100%',
//     aspectRatio: 10 / 16,
//     borderRadius: 10,
//     overflow: 'hidden',
//     marginTop: 15,
//   },
//   video: {
//     width: '100%',
//     height: '100%',
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
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//   },
//   buyNowText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     letterSpacing: 1,
//   },
//   sponsorContainer: {
//     width: '90%',
//     // marginTop: 15,
//     borderRadius: 10,
//     overflow: 'hidden',
//     // elevation: 4,
//     // shadowColor: '#000',
//     // shadowOffset: {width: 0, height: 2},
//     // shadowOpacity: 0.2,
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
// });

// export default WhiteVsColor;



import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Video from 'react-native-video';
import TopTabBar from '../../Dashboard/TopTabBar';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import AppText from '../../../../components/AppText';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import HamburgerMenu from '../HamburgerMenu';

const {width, height} = Dimensions.get('window');

const WhiteVsColor = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [video, setVideo] = useState(null);
  const [difference, setDifference] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const slideAnim = useState(new Animated.Value(-300))[0];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [videoResponse, differenceResponse] = await Promise.all([
          axios.get('http://10.7.10.49:9000/api/color/video'),
          axios.get('http://10.7.10.49:9000/api/color/comparisons'),
        ]);

        if (videoResponse.data.length > 0) {
          setVideo(videoResponse.data[0]);
        }
        setDifference(differenceResponse.data);
      } catch (err) {
        console.error('Error fetching White vs Color Data:', err);
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('buyerToken'); 
        setToken(storedToken); 
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    };

    fetchToken();
  }, []);

  const toggleMenu = () => {
    if (menuVisible) {
      Animated.timing(slideAnim, {
        toValue: -300,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setMenuVisible(false));
    } else {
      setMenuVisible(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const navigateTo = (screen) => {
    toggleMenu();
    navigation.navigate(screen);
  };

  const renderRow = type => {
    const item = difference.find(d => d.type === type);
    if (!item) return null;

    return (
      <View key={type} style={styles.rowContainer}>
        <AppText weight="Inter" style={styles.category}>
          {type}
        </AppText>
        <View style={styles.tableRow}>
          <View style={styles.cell}>
            <AppText weight="Inter" style={styles.description}>
              {item.white}
            </AppText>
          </View>
          <View style={styles.cell}>
            <AppText weight="Inter" style={styles.description}>
              {item.lam}
            </AppText>
          </View>
        </View>
      </View>
    );
  };

  const MenuItem = ({icon, title, onPress}) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <Icon name={icon} size={24} color="#000" />
      <Text style={styles.menuText}>{title}</Text>
    </TouchableOpacity>
  );

  const handleLogout = async () => {
    if (!token) {
      // If user not logged in, go to LoginScreen
      navigation.navigate('LoginScreen');
      return;
    }
    try {
      await AsyncStorage.clear();

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'UserTypeSelection'}],
        }),
      );

      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Success',
        text2: 'Logged out successfully',
        visibilityTime: 3000,
      });
    } catch (error) {
      console.error('Logout error:', error);
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: 'Failed to logout',
        visibilityTime: 3000,
      });
    }
  };

  return (
    <View style={{paddingTop: insets.top, flex: 1, backgroundColor: 'white'}}>
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
          <HamburgerMenu/>
{/*           
          <TouchableOpacity 
            style={styles.menuButton}
            onPress={toggleMenu}
          >
            <Icon name="menu" size={30} color="#000" />
          </TouchableOpacity> */}
        </View>
         
        <TopTabBar />

        {loading ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" color="#000" />
          </View>
        ) : error ? (
          <View style={{padding: 20}}>
            <Text style={{color: 'red'}}>{error}</Text>
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.header}>
              <AppText weight="Inter" style={styles.headerTitle}>
                WHITE VS COLOR
              </AppText>
              <View style={styles.videoContainer}>
                <Video
                  source={{
                    uri: `http://10.7.10.49:9000${video.src}`,
                  }}
                  style={styles.video}
                  resizeMode="cover"
                  // repeat
                  muted
                  paused={false}
                  controls={false}
                />
              </View>
              {video?.sponsorLogo && (
                <View style={styles.sponsorContainer}>
                  <LinearGradient
                    colors={['white', 'white']}
                    style={styles.sponsorGradient}>
                    <View style={styles.sponsorContent}>
                      <Image
                        source={{
                          uri: `http://10.7.10.49:9000/${video.sponsorLogo}`,
                        }}
                        style={styles.sponsorLogo}
                        resizeMode="contain"
                      />
                      {video.sponsorText && (
                        <AppText weight="Inter" style={styles.sponsorText}>
                          SPONSORED BY {video.sponsorText.toUpperCase()}
                        </AppText>
                      )}
                    </View>
                  </LinearGradient>
                </View>
              )}
            </View>

            <View style={styles.tableContainer}>
              <View style={styles.tableHeader}>
                <AppText
                  weight="Inter"
                  style={[styles.tableHeaderText, {textAlign: 'left'}]}>
                  WHITE
                </AppText>
                <AppText
                  weight="Inter"
                  style={[styles.tableHeaderText, {textAlign: 'right'}]}>
                  LAMINATED
                </AppText>
              </View>

              {[
                'APPEARANCE',
                'COST',
                'UV RESISTANCE & FADING',
                'MAINTENANCE',
                'HEAT RESISTANCE',
                'SCRATCH VISIBILITY',
                'AVAILABILITY',
              ].map(type => renderRow(type))}
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
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  Headercontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  backButton: {
    padding: 5,
  },
  menuButton: {
    padding: 5,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 50,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: width * 0.06,
    color: '#000000',
    letterSpacing: 2,
  },
  tableContainer: {
    margin: 15,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: '#FFFFFF',
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  tableHeaderText: {
    fontSize: width * 0.045,
    color: '#000000',
    flex: 1,
  },
  rowContainer: {
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
    padding: 15,
  },
  category: {
    textAlign: 'center',
    fontSize: width * 0.04,
    color: '#000000',
    marginBottom: 5,
  },
  description: {
    fontSize: width * 0.035,
    color: '#A0A0A0',
    lineHeight: 20,
  },
  videoContainer: {
    width: '100%',
    aspectRatio: 10 / 16,
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 15,
  },
  video: {
    width: '100%',
    height: '100%',
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
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buyNowText: {
    color: '#FFFFFF',
    fontSize: 16,
    letterSpacing: 1,
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
  // Menu styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  menuContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 300,
    height: '100%',
    backgroundColor: '#fff',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuLogo: {
    width: 100,
    height: 40,
  },
  mainitems: {
    flex: 1, // makes it take full height
    flexDirection: "column",
    justifyContent: "space-between",
    paddingVertical: 20, 
  }, 
  closeButton: {
    padding: 5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuText: {
    marginLeft: 20,
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  logoutButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#000',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 10,
    marginHorizontal:10
  },
  logoutButtonText: {
    color: '#000',
    fontSize: 16, 
    letterSpacing: 1,
    marginRight: 10,
  },
});

export default WhiteVsColor;