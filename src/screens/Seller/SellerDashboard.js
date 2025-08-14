// import React, {useState, useRef} from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   Dimensions,
//   Image,
//   Animated,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import Video from 'react-native-video';
// import AppText from '../../components/AppText';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';

// const {width} = Dimensions.get('window');

// const SellerHome = () => {

//   const insets = useSafeAreaInsets();

//   const [hasVideo, setHasVideo] = useState(false);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const fadeAnim = useRef(new Animated.Value(0)).current;
//   const scaleAnim = useRef(new Animated.Value(0.9)).current;

//   // Dummy video data
//   const dummyVideo = {
//     uri: 'https://assets.mixkit.co/videos/preview/mixkit-factory-workers-2280-large.mp4',
//     thumbnail: 'https://via.placeholder.com/600x400.png?text=Factory+Showcase',
//   };

//   React.useEffect(() => {
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
//   }, []);

//   const handleVideoPress = () => {
//     setIsPlaying(!isPlaying);
//   };

//   const handleUpload = () => {
//     // Simulate upload process
//     setTimeout(() => {
//       setHasVideo(true);
//     }, 1500);
//   };

//   return (
//     <View style={{paddingTop: insets.top, flex: 1, backgroundColor: 'white'}}>
//       <Animated.View
//         style={[
//           styles.container,
//           {opacity: fadeAnim, transform: [{scale: scaleAnim}]},
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
//               Upload a short video (max 90 sec) showcasing your infrastructure,
//               client testimonials, installations, or showroom to build trust with
//               buyers.
//             </AppText>
//           </View>
//           <View style={styles.sectionCard2}>
//             <AppText weight='Inter' style={styles.sectionTitle}>Showcase Video</AppText>

//             {hasVideo ? (
//               <TouchableOpacity
//                 style={styles.videoContainer}
//                 onPress={handleVideoPress}
//                 activeOpacity={0.9}>
//                 <Video
//                   source={{uri: dummyVideo.uri}}
//                   style={styles.videoPlayer}
//                   paused={!isPlaying}
//                   resizeMode="cover"
//                   repeat
//                   muted={false}
//                 />
//                 {!isPlaying && (
//                   <View style={styles.videoOverlay}>
//                     <Icon name="play-circle-filled" size={60} color="#ffffffcc" />
//                     <AppText weight='Inter' style={styles.videoLabel}>Tap to play your video</AppText>
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
//                 onPress={handleUpload}>
//                 <Image
//                   source={{uri: dummyVideo.thumbnail}}
//                   style={styles.thumbnailImage}
//                 />
//                 <View style={styles.uploadOverlay}>
//                   <Icon name="videocam" size={40} color="black" />
//                   <AppText weight='Inter' style={styles.uploadText}>Upload Your Video</AppText>
//                 </View>
//               </TouchableOpacity>
//             )}

//             <View style={styles.buttonGroup}>
//               <TouchableOpacity
//                 style={[styles.actionButton, styles.uploadButton]}
//                 onPress={handleUpload}>
//                 <Icon name="cloud-upload" size={20} color="#fff" />
//                 <AppText weight='Inter' style={styles.buttonText}>
//                   {hasVideo ? 'RE-UPLOAD' : 'UPLOAD'}
//                 </AppText>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </ScrollView>
//       </Animated.View>
//     </View>
//   );
// };

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
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Video from 'react-native-video';
import AppText from '../../components/AppText';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { launchImageLibrary } from 'react-native-image-picker';

const { width } = Dimensions.get('window');

const SellerHome = () => {
  const insets = useSafeAreaInsets();
  const [hasVideo, setHasVideo] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoUri, setVideoUri] = useState(null);
  const [videoThumbnail, setVideoThumbnail] = useState('https://via.placeholder.com/600x400.png?text=Factory+Showcase');
  const [isUploading, setIsUploading] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

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

  const checkExistingVideo = async () => {
    try {
      const token = await AsyncStorage.getItem('sellerToken');
      if (!token) return;

      const response = await axios.get('http://192.168.1.52:9000/api/sellers', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("response data : ", response.data)
      if (response.data.success && response.data.seller.businessProfileVideo) {
        setHasVideo(true);
        setVideoUri(`http://192.168.1.52:9000${response.data.seller.businessProfileVideo}`);
      }
    } catch (error) {
      console.error('Error checking existing video:', error);
    }
  };

  const handleVideoPress = () => {
    setIsPlaying(!isPlaying);
  };

  const selectVideo = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'video',
        videoQuality: 'medium',
        durationLimit: 90, // 90 seconds max
      });

      if (result.didCancel) return;
      if (result.errorCode) {
        Alert.alert('Error', result.errorMessage || 'Failed to select video');
        return;
      }

      const selectedVideo = result.assets[0];
      if (selectedVideo.duration > 90000) { // 90 seconds in ms
        Alert.alert('Error', 'Video must be 90 seconds or less');
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
      const token = await AsyncStorage.getItem('sellerToken');
      // if (!token) {
      //   throw new Error('Please Login');
      if (!token) {
        Alert.alert('Please Login');
        return;
      }
      console.log("selectedVideo.fileName : ", selectedVideo)
      const formData = new FormData();
      formData.append('businessProfileVideo', {
        uri: selectedVideo.uri,
        type: selectedVideo.type || 'video/mp4',
        name: selectedVideo.fileName || `business-video-${Date.now()}.mp4`,
      });

      const response = await axios.post(
        'http://192.168.1.52:9000/api/sellers/business-video',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("response.data : ", response.data)
      if (response.data.success) {
        setHasVideo(true);
        setVideoUri(`http://192.168.1.52:9000${response.data.videoUrl}`);
        Alert.alert('Success', 'Video uploaded successfully!');
      } else {
        throw new Error(response.data.message || 'Failed to upload video');
      }
    } catch (error) {
      console.error('Error uploading video:', error);
      Alert.alert('Error', error.message || 'Failed to upload video');
    } finally {
      setIsUploading(false);
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
              Upload a short video (max 90 sec) showcasing your infrastructure,
              client testimonials, installations, or showroom to build trust with
              buyers.
            </AppText>
          </View>
          <View style={styles.sectionCard2}>
            <AppText weight='Inter' style={styles.sectionTitle}>Showcase Video</AppText>

            {hasVideo && videoUri ? (
              <TouchableOpacity
                style={styles.videoContainer}
                onPress={handleVideoPress}
                activeOpacity={0.9}>
                <Video
                  source={{ uri: videoUri }}
                  style={styles.videoPlayer}
                  paused={!isPlaying}
                  resizeMode="cover"
                  repeat
                  muted={false}
                />
                {!isPlaying && (
                  <View style={styles.videoOverlay}>
                    <Icon name="play-circle-filled" size={60} color="#ffffffcc" />
                    <AppText weight='Inter' style={styles.videoLabel}>Tap to play your video</AppText>
                  </View>
                )}
                <View style={styles.videoBadge}>
                  <Icon name="check-circle" size={16} color="#4CAF50" />
                  <AppText weight='Inter' style={styles.videoBadgeText}>UPLOADED</AppText>
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.uploadPlaceholder}
                onPress={handleUpload}
                disabled={isUploading}>
                <Image
                  source={{ uri: videoThumbnail }}
                  style={styles.thumbnailImage}
                />
                <View style={styles.uploadOverlay}>
                  <Icon name="videocam" size={40} color="black" />
                  <AppText weight='Inter' style={styles.uploadText}>
                    {isUploading ? 'Uploading...' : 'Upload Your Video'}
                  </AppText>
                </View>
              </TouchableOpacity>
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
  videoOverlay: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoLabel: {
    color: '#fff',
    fontSize: 14,
    marginTop: 10,
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
  thumbnailImage: {
    width: '100%',
    height: '100%',
    opacity: 0.7,
  },
  uploadOverlay: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadText: {
    color: 'black',
    fontSize: 16,
    marginTop: 12,
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
