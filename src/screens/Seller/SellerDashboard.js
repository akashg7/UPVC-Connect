// import React, { useState, useRef, useEffect, useCallback } from 'react';
// import {
//   View,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   Dimensions,
//   Image,
//   Animated,
//   Alert,
//   AppState,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import Video from 'react-native-video';
// import AppText from '../../components/AppText';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import { launchImageLibrary } from 'react-native-image-picker';
// import { useFocusEffect } from '@react-navigation/native';

// const { width } = Dimensions.get('window');

// const SellerHome = () => {
//   const insets = useSafeAreaInsets();
//   const [hasVideo, setHasVideo] = useState(false);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [videoUri, setVideoUri] = useState(null); 
//   const [isUploading, setIsUploading] = useState(false);
//   const [videoEnded, setVideoEnded] = useState(false);
//   const [appState, setAppState] = useState(AppState.currentState);
//   const fadeAnim = useRef(new Animated.Value(0)).current;
//   const scaleAnim = useRef(new Animated.Value(0.9)).current;
//   const videoRef = useRef(null);

//   useEffect(() => {
//     Animated.parallel([
//       Animated.timing(fadeAnim, {
//         toValue: 1,
//         duration: 800,
//         useNativeDriver: true,
//       }),
//       Animated.spring(scaleAnim, {
//         toValue: 1,
//         friction: 4,
//         useNativeDriver: true,
//       }),
//     ]).start();

//     // Check if seller already has a video
//     checkExistingVideo();
    
//     // Add app state listener
//     const subscription = AppState.addEventListener('change', handleAppStateChange);
    
//     return () => {
//       subscription.remove();
//     };
//   }, []);

//   const handleAppStateChange = useCallback((nextAppState) => {
//     if (appState.match(/active|background/) && nextAppState === 'background') {
//       // App is going to background - pause video
//       setIsPlaying(false);
//     }
//     setAppState(nextAppState);
//   }, [appState]);

//   useFocusEffect(
//     React.useCallback(() => {
//       // Reset video state when screen is focused
//       setIsPlaying(false);
//       setVideoEnded(false);
      
//       return () => {
//         // Pause video when screen loses focus
//         setIsPlaying(false);
//       };
//     }, [])
//   );

//   const checkExistingVideo = async () => {
//     try {
//       const token = await AsyncStorage.getItem('sellerToken');
//       if (!token) return;

//       const response = await axios.get('https://upvc-backend-oh6m.onrender.com/api/sellers', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       console.log("response data : ", response.data)
//       if (response.data.success && response.data.seller.businessProfileVideo) {
//         setHasVideo(true);
//         setVideoUri(`https://upvc-backend-oh6m.onrender.com${response.data.seller.businessProfileVideo}`);
//       }
//     } catch (error) {
//       console.error('Error checking existing video:', error);
//     }
//   };

//   const handleVideoPress = () => {
//     if (videoEnded) {
//       // If video has ended, restart it
//       if (videoRef.current) {
//         videoRef.current.seek(0);
//         setVideoEnded(false);
//       }
//       setIsPlaying(true);
//     } else {
//       // Toggle play/pause
//       setIsPlaying(!isPlaying);
//     }
//   };

//   const handleVideoEnd = () => {
//     setIsPlaying(false);
//     setVideoEnded(true);
//   };

//   const handleVideoLoad = () => {
//     setVideoEnded(false);
//   };

//   const selectVideo = async () => {
//     try {
//       const result = await launchImageLibrary({
//         mediaType: 'video',
//         videoQuality: 'medium',
//         // durationLimit: 90, // 90 seconds max
//         durationLimit: 45, // 45 seconds max
//       });

//       if (result.didCancel) return;
//       if (result.errorCode) {
//         Alert.alert('Error', result.errorMessage || 'Failed to select video');
//         return;
//       }

//       const selectedVideo = result.assets[0];
//       // if (selectedVideo.duration > 90000) { // 90 seconds in ms
//       if (selectedVideo.duration > 45000) { // 45 seconds in ms
//         Alert.alert('Error', 'Video must be 45 seconds or less');
//         return;
//       }

//       return selectedVideo;
//     } catch (error) {
//       console.error('Error selecting video:', error);
//       Alert.alert('Error', 'Failed to select video');
//       return null;
//     }
//   };

//   const handleUpload = async () => {
//     try {
//       const selectedVideo = await selectVideo();
//       if (!selectedVideo) return;

//       setIsUploading(true);
//       const token = await AsyncStorage.getItem('sellerToken'); 
//       if (!token) {
//         Alert.alert('Please Login');
//         return;
//       }
//       console.log("selectedVideo.fileName : ", selectedVideo)
//       const formData = new FormData();
//       formData.append('businessProfileVideo', {
//         uri: selectedVideo.uri,
//         type: selectedVideo.type || 'video/mp4',
//         name: selectedVideo.fileName || `business-video-${Date.now()}.mp4`,
//       });

//       const response = await axios.post(
//         'https://upvc-backend-oh6m.onrender.com/api/sellers/business-video',
//         formData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       console.log("response.data : ", response.data)
//       if (response.data.success) {
//         setHasVideo(true);
//         setVideoUri(`https://upvc-backend-oh6m.onrender.com${response.data.videoUrl}`);
//         setIsPlaying(false);
//         setVideoEnded(false);
//         Alert.alert('Success', 'Video uploaded successfully!');
//       } else {
//         throw new Error(response.data.message || 'Failed to upload video');
//       }
//     } catch (error) {
//       console.error('Error uploading video:', error);
//       Alert.alert('Error', error.message || 'Failed to upload video');
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   return (
//     <View style={{ paddingTop: insets.top, flex: 1, backgroundColor: 'white' }}>
//       <Animated.View
//         style={[
//           styles.container,
//           { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
//         ]}>
//         <ScrollView contentContainerStyle={styles.scrollContainer}>
//           {/* Header Section */}
//           <Image source={require('../../assets/logo.png')} style={styles.logo} />
//           <View style={styles.headerCard}>
//             <AppText weight='Inter' style={styles.headerTitle}>
//               We generate qualified leads and share with select fabricators.
//             </AppText>
//           </View>

//           <View style={styles.sectionCard}>
//             <AppText weight='Inter' style={styles.sectionTitle}>DO THIS RIGHT AWAY!</AppText>
//             <AppText weight='Inter' style={styles.sectionDescription}>
//               Upload a short video (max 45 sec) showcasing your infrastructure,
//               client testimonials, installations, or showroom to build trust with
//               buyers.
//             </AppText>
//           </View>
//           <View style={styles.sectionCard2}>
//             <AppText weight='Inter' style={styles.sectionTitle}>Showcase Video</AppText>

//             {hasVideo && videoUri ? (
//               <TouchableOpacity
//                 style={styles.videoContainer}
//                 onPress={handleVideoPress}
//                 activeOpacity={0.9}>
//                 <Video
//                   ref={videoRef}
//                   source={{ uri: videoUri }}
//                   style={styles.videoPlayer}
//                   paused={!isPlaying}
//                   resizeMode="cover" 
//                   muted={false}
//                   onEnd={handleVideoEnd}
//                   onLoad={handleVideoLoad}
//                   ignoreSilentSwitch="obey"
                  
//                 />
//                 {!isPlaying && (
//                   <View style={styles.videoOverlay}>
//                     <Icon 
//                       name={videoEnded ? "replay" : "play-circle-filled"} 
//                       size={60} 
//                       color="#ffffffcc" 
//                     />
//                     <AppText weight='Inter' style={styles.videoLabel}>
//                       {videoEnded ? 'Tap to replay' : 'Tap to play video'}
//                     </AppText>
//                   </View>
//                 )}
//                 <View style={styles.videoBadge}>
//                   <Icon name="check-circle" size={16} color="#4CAF50" />
//                   <AppText weight='Inter' style={styles.videoBadgeText}>UPLOADED</AppText>
//                 </View>
//               </TouchableOpacity>
//             ) : (
//               <TouchableOpacity
//                 style={styles.uploadPlaceholder}
//                 onPress={handleUpload}
//                 disabled={isUploading}> 
//                 <View style={styles.uploadOverlay}>
//                   <Icon name="videocam" size={40} color="black" />
//                   <AppText weight='Inter' style={styles.uploadText}>
//                     {isUploading ? 'Uploading...' : 'Upload Your Video'}
//                   </AppText>
//                 </View>
//               </TouchableOpacity>
//             )}

//             <View style={styles.buttonGroup}>
//               <TouchableOpacity
//                 style={[styles.actionButton, styles.uploadButton]}
//                 onPress={handleUpload}
//                 disabled={isUploading}>
//                 <Icon name="cloud-upload" size={20} color="#fff" />
//                 <AppText weight='Inter' style={styles.buttonText}>
//                   {isUploading ? 'UPLOADING...' : hasVideo ? 'RE-UPLOAD' : 'UPLOAD'}
//                 </AppText>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </ScrollView>
//       </Animated.View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   scrollContainer: {
//     paddingBottom: 50,
//   },
//   logo: {
//     alignSelf: 'center',
//     width: 100,
//     height: 50,
//     resizeMode: 'contain',
//   },
//   headerCard: {
//     padding: 20,
//     paddingTop: 0,
//     borderRadius: 12,
//   },
//   headerTitle: {
//     fontSize: 18,
//     color: '#000',
//     lineHeight: 28,
//     textAlign: "center"
//   },
//   videoContainer: {
//     borderRadius: 12,
//     marginBottom: 16,
//     backgroundColor: '#000',
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: '100%',
//     aspectRatio: 11 / 16,
//     borderRadius: 10,
//     overflow: 'hidden',
//     marginTop: 15,
//   },
//   videoPlayer: {
//     width: '100%',
//     height: '100%',
//   },
//   videoOverlay: {
//     position: 'absolute',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   videoLabel: {
//     color: '#fff',
//     fontSize: 14,
//     marginTop: 10,
//   },
//   videoBadge: {
//     position: 'absolute',
//     top: 12,
//     right: 12,
//     backgroundColor: 'rgba(255,255,255,0.9)',
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 4,
//   },
//   videoBadgeText: {
//     fontSize: 12,
//     color: '#000',
//     marginLeft: 4,
//   },
//   uploadPlaceholder: {
//     width: '100%',
//     height: width * 1,
//     borderRadius: 12,
//     overflow: 'hidden',
//     marginBottom: 16,
//     backgroundColor: '#f0f0f0',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   thumbnailImage: {
//     width: '100%',
//     height: '100%',
//     opacity: 0.7,
//   },
//   uploadOverlay: {
//     position: 'absolute',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   uploadText: {
//     color: 'black',
//     fontSize: 16,
//     marginTop: 12,
//   },
//   buttonGroup: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   actionButton: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 16,
//     borderRadius: 8,
//     marginHorizontal: 4,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 14,
//     marginLeft: 8,
//     letterSpacing: 0.5,
//   },
//   sectionCard: {
//     backgroundColor: '#fff',
//     margin: 16,
//     padding: 20,
//     borderRadius: 16,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//     elevation: 3,
//   },
//   sectionCard2: {
//     margin: 16,
//     padding: 5,
//     borderRadius: 16,
//     marginBottom: 50,
//   },
//   sectionTitle: {
//     fontSize: 16,
//     color: '#111',
//     marginBottom: 10,
//     textTransform: 'uppercase',
//     letterSpacing: 0.5,
//     textAlign: "center"
//   },
//   sectionDescription: {
//     fontSize: 14,
//     color: '#444',
//     lineHeight: 22,
//   },
//   uploadButton: {
//     backgroundColor: '#000',
//     flexDirection: 'row',
//     padding: 12,
//     borderRadius: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 12,
//     flex: 1,
//     marginRight: 6,
//   },
// });

// export default SellerHome;

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  Animated,
  Alert,
  AppState,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Video from 'react-native-video';
import AppText from '../../components/AppText';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { launchImageLibrary } from 'react-native-image-picker';
import { useFocusEffect } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const SellerHome = () => {
  const insets = useSafeAreaInsets();
  const [hasVideo, setHasVideo] = useState(false);
  const [videoUri, setVideoUri] = useState(null); 
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const videoRef = useRef(null);
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();

    // Check if seller already has a video
    checkExistingVideo();
  }, []);

  useEffect(() => {
    // Animate progress bar when uploadProgress changes
    if (isUploading) {
      Animated.timing(progressAnim, {
        toValue: uploadProgress,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [uploadProgress, isUploading]);

  useFocusEffect(
    React.useCallback(() => {
      // Pause video when screen is focused (in case it was playing from previous focus)
      if (videoRef.current) {
        videoRef.current.seek(0);
      }
      
      return () => {
        // Pause video when screen loses focus
        if (videoRef.current) {
          videoRef.current.seek(0);
        }
      };
    }, [])
  );

  const checkExistingVideo = async () => {
    try {
      const token = await AsyncStorage.getItem('sellerToken');
      if (!token) return;

      const response = await axios.get('https://upvc-backend-oh6m.onrender.com/api/sellers', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("response data : ", response.data)
      if (response.data.success && response.data.seller.businessProfileVideo) {
        setHasVideo(true);
        setVideoUri(`https://upvc-backend-oh6m.onrender.com${response.data.seller.businessProfileVideo}`);
      }
    } catch (error) {
      console.error('Error checking existing video:', error);
    }
  };

  const selectVideo = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'video',
        videoQuality: 'medium',
        durationLimit: 45, // 45 seconds max
      });

      if (result.didCancel) return;
      if (result.errorCode) {
        Alert.alert('Error', result.errorMessage || 'Failed to select video');
        return;
      }

      const selectedVideo = result.assets[0];
      if (selectedVideo.duration > 45000) { // 45 seconds in ms
        Alert.alert('Error', 'Video must be 45 seconds or less');
        return;
      }

      return selectedVideo;
    } catch (error) {
      console.error('Error selecting video:', error);
      Alert.alert('Error', 'Failed to select video');
      return null;
    }
  };

  const handleUpload = async () => {
    try {
      const selectedVideo = await selectVideo();
      if (!selectedVideo) return;

      setIsUploading(true);
      setUploadProgress(0);
      const token = await AsyncStorage.getItem('sellerToken'); 
      if (!token) {
        Alert.alert('Please Login');
        return;
      }

      const formData = new FormData();
      formData.append('businessProfileVideo', {
        uri: selectedVideo.uri,
        type: selectedVideo.type || 'video/mp4',
        name: selectedVideo.fileName || `business-video-${Date.now()}.mp4`,
      });

      const response = await axios.post(
        'https://upvc-backend-oh6m.onrender.com/api/sellers/business-video',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          },
        }
      );

      if (response.data.success) {
        setHasVideo(true);
        setVideoUri(`https://upvc-backend-oh6m.onrender.com${response.data.videoUrl}`);
        Alert.alert('Success', 'Video uploaded successfully!');
      } else {
        throw new Error(response.data.message || 'Failed to upload video');
      }
    } catch (error) {
      console.error('Error uploading video:', error);
      Alert.alert('Error', error.message || 'Failed to upload video');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <View style={{ paddingTop: insets.top, flex: 1, backgroundColor: 'white' }}>
      <Animated.View
        style={[
          styles.container,
          { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
        ]}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Header Section */}
          <Image source={require('../../assets/logo.png')} style={styles.logo} />
          <View style={styles.headerCard}>
            <AppText weight='Inter' style={styles.headerTitle}>
              We generate qualified leads and share with select fabricators.
            </AppText>
          </View>

          <View style={styles.sectionCard}>
            <AppText weight='Inter' style={styles.sectionTitle}>DO THIS RIGHT AWAY!</AppText>
            <AppText weight='Inter' style={styles.sectionDescription}>
              Upload a short video (max 45 sec) showcasing your infrastructure,
              client testimonials, installations, or showroom to build trust with
              buyers.
            </AppText>
          </View>
          <View style={styles.sectionCard2}>
            <AppText weight='Inter' style={styles.sectionTitle}>Showcase Video</AppText>

            {hasVideo && videoUri ? (
              <View style={styles.videoContainer}>
                <Video
                  ref={videoRef}
                  source={{ uri: videoUri }}
                  style={styles.videoPlayer}
                  resizeMode="cover"
                  controls={true}
                  paused={false}
                  ignoreSilentSwitch="obey"
                />
                <View style={styles.videoBadge}>
                  <Icon name="check-circle" size={16} color="#4CAF50" />
                  <AppText weight='Inter' style={styles.videoBadgeText}>UPLOADED</AppText>
                </View>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.uploadPlaceholder}
                onPress={handleUpload}
                disabled={isUploading}> 
                <View style={styles.uploadOverlay}>
                  <Icon name="videocam" size={40} color="black" />
                  <AppText weight='Inter' style={styles.uploadText}>
                    {isUploading ? 'Uploading...' : 'Upload Your Video'}
                  </AppText>
                  
                </View>
              </TouchableOpacity>
            )}

            {isUploading && (
              <View style={styles.progressContainer}>
                <View style={styles.progressBackground}>
                  <Animated.View 
                    style={[
                      styles.progressBar,
                      {
                        width: progressAnim.interpolate({
                          inputRange: [0, 100],
                          outputRange: ['0%', '100%'],
                        }),
                      }
                    ]}
                  />
                </View>
                <AppText weight='Inter' style={styles.progressText}>
                  {uploadProgress}%
                </AppText>
              </View>
            )}
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={[styles.actionButton, styles.uploadButton]}
                onPress={handleUpload}
                disabled={isUploading}>
                <Icon name="cloud-upload" size={20} color="#fff" />
                <AppText weight='Inter' style={styles.buttonText}>
                  {isUploading ? 'UPLOADING...' : hasVideo ? 'RE-UPLOAD' : 'UPLOAD'}
                </AppText>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    paddingBottom: 50,
  },
  logo: {
    alignSelf: 'center',
    width: 100,
    height: 50,
    resizeMode: 'contain',
  },
  headerCard: {
    padding: 20,
    paddingTop: 0,
    borderRadius: 12,
  },
  headerTitle: {
    fontSize: 18,
    color: '#000',
    lineHeight: 28,
    textAlign: "center"
  },
  videoContainer: {
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    aspectRatio: 11 / 16,
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 15,
  },
  videoPlayer: {
    width: '100%',
    height: '100%',
  },
  videoBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(255,255,255,0.9)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  videoBadgeText: {
    fontSize: 12,
    color: '#000',
    marginLeft: 4,
  },
  uploadPlaceholder: {
    width: '100%',
    height: width * 1,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadOverlay: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  uploadText: {
    color: 'black',
    fontSize: 16,
    marginTop: 12,
    marginBottom: 20,
  },
  progressContainer: {
    width: '80%',
    alignItems: 'center',
    marginTop: 20,
  },
  progressBackground: {
    width: '100%',
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#000',
    borderRadius: 3,
  },
  progressText: {
    color: '#000',
    fontSize: 12,
    marginTop: 8,
    fontWeight: '600',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 8,
    letterSpacing: 0.5,
  },
  sectionCard: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  sectionCard2: {
    margin: 16,
    padding: 5,
    borderRadius: 16,
    marginBottom: 50,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#111',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    textAlign: "center"
  },
  sectionDescription: {
    fontSize: 14,
    color: '#444',
    lineHeight: 22,
  },
  uploadButton: {
    backgroundColor: '#000',
    flexDirection: 'row',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    flex: 1,
    marginRight: 6,
  },
});

export default SellerHome;