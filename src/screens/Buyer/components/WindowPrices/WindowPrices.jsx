import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Text,
} from 'react-native';
import Video from 'react-native-video';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {styles} from './styles';
import AppText from '../../../../components/AppText';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {useFocusEffect} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const {width} = Dimensions.get('window');

const WindowPrices = () => {
  const videoRef = useRef(null);
  const [videoError, setVideoError] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const [homepageData, setHomepageData] = useState(null);
  const [activeMoment, setActiveMoment] = useState(null);
  const navigation = useNavigation();
  const [paused, setPaused] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setPaused(false); // Resume when this screen is focused
      return () => {
        setPaused(true); // Pause when screen is unfocused
      };
    }, []),
  );

  useEffect(() => {
    const fetchHomepageData = async () => {
      try {
        const response = await axios.get(
          'http://10.7.10.49:9000/api/homepage',
        );
        setHomepageData(response.data.data);
      } catch (error) {
        console.error('Error fetching homepage data:', error);
      } finally {
        setLoading(false);
      }
    };

    //  const fetchHomepageData = async () => {
    //   try {
    //     const response = await axios.get(
    //       'http://10.7.10.49:9000/api/banner',
    //     );

    //     console.log(response)
    //     setHomepageData(response.data);
    //   } catch (error) {
    //     console.error('Error fetching homepage data:', error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    fetchHomepageData();
  }, []);

  // useEffect(() => {
  //   const fetchHomepageData = async () => {
  //     try {
  //       const response = await axios.get('http://10.7.10.49:9000/api/banner');

  //       if (Array.isArray(response.data) && response.data.length > 0) {
  //         // Sort banners by createdAt in descending order
  //         const sorted = response.data.sort(
  //           (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  //         );

  //         const latest = sorted[0];

  //         // Format for your UI
  //         const formatted = {
  //           title: latest.title,
  //           subtitle: latest.description,
  //           videoUrl: latest.filepath,
  //           sponsorLogo: null, // add if you have
  //           sponsorText: null, // add if you have
  //           keyMoments: latest.chapters.map(chapter => ({
  //             _id: chapter._id,
  //             title: chapter.title,
  //             timestamp: '00.00', // default since all chapters are time 0
  //             thumbnail: chapter.thumbnailFilepath,
  //           })),
  //         };

  //         setHomepageData(formatted);
  //       } else {
  //         setHomepageData(null);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching homepage data:', error);
  //       setHomepageData(null);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchHomepageData();
  // }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVideoReady(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleMomentPress = timestamp => {
    if (videoRef.current) {
      // Convert "00.00" format to seconds
      const [minutes, seconds] = timestamp.split('.').map(Number);
      const seekTime = minutes * 60 + seconds;

      videoRef.current.seek(seekTime);
      setActiveMoment(timestamp);
    }
  };

  const formatTimestamp = timestamp => {
    const [minutes, seconds] = timestamp.split('.');
    return `${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
  };

  const isMomentActive = timestamp => {
    return activeMoment === timestamp;
  };

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          {justifyContent: 'center', alignItems: 'center'},
        ]}>
        <ActivityIndicator size="large" color="#000000" />
      </View>
    );
  }

  if (!homepageData) {
    return (
      <View
        style={[
          styles.container,
          {justifyContent: 'center', alignItems: 'center'},
        ]}>
        <MaterialIcons name="error-outline" size={50} color="#000000" />
        <AppText weight="Inter" style={{marginTop: 10}}>
          Failed to load data
        </AppText>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.descriptionContainer}>
        <AppText weight="Inter" style={styles.descriptionTitle}>
          {homepageData.title}
        </AppText>
        <AppText weight="Inter" style={styles.descriptionText}>
          {homepageData.subtitle}
        </AppText>
      </View>

      {homepageData?.sponsorLogo && (
        <View style={styles.sponsorContainer}>
          <LinearGradient
                              colors={['white', 'white']}
                              style={styles.sponsorGradient}>

                              </LinearGradient>
          <View style={styles.sponsorContent}> 
            <Image
              source={{
                uri: `http://10.7.10.49:9000/${homepageData.sponsorLogo}`,
              }}
              style={styles.sponsorLogo}
              resizeMode="contain"
            />
            {homepageData.sponsorText && (
              <AppText weight="Inter" style={styles.sponsorText}>
                SPONSORED BY {homepageData.sponsorText.toUpperCase()}
              </AppText>
            )}
            
          </View>
        </View>
      )}

      {/* Video Player */}
      <View style={styles.videoContainer}>
        {!videoError ? (
          <Video
            ref={videoRef}
            source={{
              uri: `http://10.7.10.49:9000/${homepageData.videoUrl}`,
            }}
            style={styles.videoPlayer}
            paused={paused} // controlled via state
            // repeat={true}
            resizeMode="contain"
            controls={true}
            onError={() => setVideoError(true)}
            bufferConfig={{
              minBufferMs: 15000,
              maxBufferMs: 30000,
              bufferForPlaybackMs: 2500,
              bufferForPlaybackAfterRebufferMs: 5000,
            }}
          />
        ) : (
          <View style={styles.videoFallback}>
            <MaterialIcons name="error-outline" size={50} color="#FFFFFF" />
            <AppText weight="Regular" style={styles.fallbackText}>
              Video unavailable
            </AppText>
          </View>
        )}
      </View>

      {/* Key Moments Carousel */}
      {homepageData?.keyMoments && homepageData?.keyMoments?.length > 0 && (
        <View style={styles.carouselContainer}>
          <AppText weight="Inter" style={styles.carouselTitle}>
            KEY VIDEO MOMENTS
          </AppText>
          <FlatList
            horizontal
            data={homepageData.keyMoments}
            renderItem={({item}) => (
              <TouchableOpacity
                style={[
                  styles.carouselItem,
                  isMomentActive(item.timestamp) && styles.activeCarouselItem,
                ]}
                onPress={() => handleMomentPress(item.timestamp)}>
                <View style={styles.carouselContent}>
                  <Image
                    source={{
                      uri: `http://10.7.10.49:9000/${item.thumbnail}`,
                    }}
                    style={styles.thumbnailImage}
                    resizeMode="cover"
                  />
                  <View style={styles.carouselTextContainer}>
                    <AppText
                      weight="Inter"
                      style={[
                        styles.carouselText,
                        isMomentActive(item.timestamp) &&
                          styles.activeCarouselText,
                      ]}>
                      {item.title}
                    </AppText>
                    <AppText
                      weight="Inter"
                      style={[
                        styles.carouselTimestamp,
                        isMomentActive(item.timestamp) &&
                          styles.activeCarouselTimestamp,
                      ]}>
                      {formatTimestamp(item.timestamp)}
                    </AppText>
                  </View>
                  <View style={styles.playIconContainer}>
                    <MaterialIcons
                      name={
                        isMomentActive(item.timestamp)
                          ? 'play-circle'
                          : 'play-circle-outline'
                      }
                      size={24}
                      color={
                        isMomentActive(item.timestamp) ? '#000000' : '#000000'
                      }
                    />
                  </View>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={item => item._id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.carouselListContent}
            snapToInterval={width * 0.75 + 15}
            snapToAlignment="start"
            decelerationRate="fast"
          />
        </View>
      )}

      <View style={styles.buyNowContainer}>
        <TouchableOpacity
          style={styles.buyNowButton}
          onPress={() => {
            if (videoRef.current) {
              videoRef.current.pause?.(); // Safely pause video
            }
            navigation.navigate('BuyNowScreen');
          }}>
          <AppText weight="Inter" style={styles.buyNowText}>
            BUY NOW
          </AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WindowPrices;
