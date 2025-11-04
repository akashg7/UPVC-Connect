import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import Video from 'react-native-video';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {styles} from './styles';
import AppText from '../../../../components/AppText';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {useFocusEffect} from '@react-navigation/native';

const {width} = Dimensions.get('window');

const WindowPrices = () => {
  const videoRef = useRef(null);
  const [videoError, setVideoError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [homepageData, setHomepageData] = useState(null);
  const [activeMoment, setActiveMoment] = useState(null);
  const navigation = useNavigation();
  const [paused, setPaused] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setPaused(false);
      return () => {
        setPaused(true);
      };
    }, []),
  );

  const fetchHomepageData = async () => {
    try {
      const response = await axios.get('https://upvc-backend-ozpc.onrender.com/api/homepage');
      setHomepageData(response.data.data);
    } catch (error) {
      console.error('Error fetching homepage data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHomepageData();
  }, []);

  const handleMomentPress = timestamp => {
    if (videoRef.current) { 
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
      <View style={[styles.container, {justifyContent: 'center', alignItems: 'center'}]}>
        <ActivityIndicator size="large" color="#000000" />
      </View>
    );
  }

  if (!homepageData) {
    return (
      <View style={[styles.container, {justifyContent: 'center', alignItems: 'center'}]}>
        <MaterialIcons name="error-outline" size={50} color="#000000" />
        <AppText weight="Inter" style={{marginTop: 10}}>Failed to load data</AppText>
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
          <View style={styles.sponsorContent}> 
            <Image
              source={{uri: `https://upvc-backend-ozpc.onrender.com/${homepageData.sponsorLogo}`}}
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
            source={{uri: `https://upvc-backend-ozpc.onrender.com/${homepageData.videoUrl}`}}
            style={styles.videoPlayer}
            paused={paused}
            resizeMode="contain"
            controls={true}
            onError={() => setVideoError(true)}
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
                    source={{uri: `https://upvc-backend-ozpc.onrender.com/${item.thumbnail}`}}
                    style={styles.thumbnailImage}
                    resizeMode="cover"
                  />
                  <View style={styles.carouselTextContainer}>
                    <AppText
                      weight="Inter"
                      style={[
                        styles.carouselText,
                        isMomentActive(item.timestamp) && styles.activeCarouselText,
                      ]}>
                      {item.title}
                    </AppText>
                    <AppText
                      weight="Inter"
                      style={[
                        styles.carouselTimestamp,
                        isMomentActive(item.timestamp) && styles.activeCarouselTimestamp,
                      ]}>
                      {formatTimestamp(item.timestamp)}
                    </AppText>
                  </View>
                  <View style={styles.playIconContainer}>
                    <MaterialIcons
                      name={isMomentActive(item.timestamp) ? 'play-circle' : 'play-circle-outline'}
                      size={24}
                      color={isMomentActive(item.timestamp) ? '#000000' : '#000000'}
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
              videoRef.current.pause?.();
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