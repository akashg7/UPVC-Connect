import React, { useRef, useState, useEffect } from 'react';
import { View, Text, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import Video from 'react-native-video';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { styles } from './styles'; 
import AppText from '../../../../components/AppText';

const { width } = Dimensions.get('window');

const WindowPrices = () => {
  const videoRef = useRef(null);
  const [videoError, setVideoError] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVideoReady(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const videoKeyMoments = [
    { id: 1, title: 'Material Selection', time: 0, timestamp: '00:00' },
    { id: 2, title: 'Customization Options', time: 30, timestamp: '00:30' },
    { id: 3, title: 'Installation Process', time: 60, timestamp: '01:00' },
    { id: 4, title: 'Quality Check', time: 90, timestamp: '01:30' },
  ];

  const renderCarouselItem = ({ item }) => (
    <TouchableOpacity
      style={styles.carouselItem}
      onPress={() => videoRef.current?.seek(item.time)}
    >
      <View style={styles.carouselContent}>
        <View style={styles.carouselTextContainer}>
          <AppText weight="SemiBold" style={styles.carouselText}>{item.title}</AppText>
          <AppText  weight="SemiBold" style={styles.carouselTimestamp}>{item.timestamp}</AppText>
        </View>
        <View style={styles.playIconContainer}>
          <MaterialIcons name="play-circle-outline" size={24} color="#000000" />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Description */}
       {/* <TopTabBar /> */}
      <View style={styles.descriptionContainer}>
        <AppText weight="Bold" style={styles.descriptionTitle}>Buying UPVC Windows & Doors!</AppText>
        <AppText weight="SemiBold" style={styles.descriptionText}>
          Watch this exclusive video on the entire process from extension of frames to installation, to understand what sets high-quality windows apart.
        </AppText>
      </View>

      {/* Video Player */}
      <View style={styles.videoContainer}>
        {!videoError ? (
          <Video
            ref={videoRef}
            // source={{ uri: 'https://www.w3schools.com/html/mov_bbb.mp4' }} // Placeholder URL
            source={require('../../../../assets/dummy.mp4')} // Uncomment if using a local video
            style={styles.videoPlayer}
            paused={false}
            repeat={true}
            resizeMode="cover"
            controls={true}
            onError={() => setVideoError(true)}
          />
        ) : (
          <View style={styles.videoFallback}>
            <MaterialIcons name="error-outline" size={50} color="#FFFFFF" />
            <AppText weight='Regular' style={styles.fallbackText}>Video unavailable</AppText>
          </View>
        )}
      </View>

      {/* Key Moments Carousel */}
      <View style={styles.carouselContainer}>
        <AppText weight="SemiBold" style={styles.carouselTitle}>KEY VIDEO MOMENTS</AppText>
        <FlatList
          horizontal
          data={videoKeyMoments}
          renderItem={renderCarouselItem}
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.carouselContent}
          snapToInterval={width * 0.75 + 15} // Adjusted for marginRight
          snapToAlignment="start"
          decelerationRate="fast"
        />
      </View>
      <TouchableOpacity 
        style={styles.buyNowButton}
        onPress={() => navigation.navigate('BuyNowScreen')}
      >
        <AppText weight="SemiBold" style={styles.buyNowText}>BUY NOW</AppText>
      </TouchableOpacity>

    </View>
  );
};

export default WindowPrices;