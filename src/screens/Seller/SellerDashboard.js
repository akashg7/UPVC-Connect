import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Video from 'react-native-video';
import AppText from '../../components/AppText';

const {width} = Dimensions.get('window');

const SellerHome = () => {
  const [hasVideo, setHasVideo] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  // Dummy video data
  const dummyVideo = {
    uri: 'https://assets.mixkit.co/videos/preview/mixkit-factory-workers-2280-large.mp4',
    thumbnail: 'https://via.placeholder.com/600x400.png?text=Factory+Showcase',
  };

  React.useEffect(() => {
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
  }, []);

  const handleVideoPress = () => {
    setIsPlaying(!isPlaying);
  };

  const handleUpload = () => {
    // Simulate upload process
    setTimeout(() => {
      setHasVideo(true);
    }, 1500);
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {opacity: fadeAnim, transform: [{scale: scaleAnim}]},
      ]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header Section */}
        <Image source={require('../../assets/logo.png')} style={styles.logo} />
        <View style={styles.headerCard}>
          <AppText weight='SemiBold' style={styles.headerTitle}>
            We generate qualified leads and share with select fabricators.
          </AppText>
          <AppText weight='Inter' style={styles.headerSubtitle}>
            Only 6 fabricators will get an opportunity to buy the lead.
          </AppText>
        </View>
        
        <View style={styles.sectionCard}>
          <AppText weight='SemiBold' style={styles.sectionTitle}>DO THIS RIGHT AWAY!</AppText>
          <AppText weight='Inter' style={styles.sectionDescription}>
            Upload a short video (max 90 sec) showcasing your infrastructure,
            client testimonials, installations, or showroom to build trust with
            buyers.
          </AppText>
        </View>
        <View style={styles.sectionCard}>
          <AppText weight='SemiBold' style={styles.sectionTitle}>Showcase Video</AppText>

          {hasVideo ? (
            <TouchableOpacity
              style={styles.videoContainer}
              onPress={handleVideoPress}
              activeOpacity={0.9}>
              <Video
                source={{uri: dummyVideo.uri}}
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
              onPress={handleUpload}>
              <Image
                source={{uri: dummyVideo.thumbnail}}
                style={styles.thumbnailImage}
              />
              <View style={styles.uploadOverlay}>
                <Icon name="videocam" size={40} color="black" />
                <AppText weight='SemiBold' style={styles.uploadText}>Upload Your Video</AppText>
              </View>
            </TouchableOpacity>
          )}

          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={[styles.actionButton, styles.uploadButton]}
              onPress={handleUpload}>
              <Icon name="cloud-upload" size={20} color="#fff" />
              <AppText weight='SemiBold' style={styles.buttonText}>
                {hasVideo ? 'RE-UPLOAD' : 'UPLOAD'}
              </AppText>
            </TouchableOpacity>
            {/* 
    {hasVideo && (
      <TouchableOpacity 
        style={[styles.actionButton, styles.editButton]}
        onPress={() => console.log('Edit video')}
      >
        <Icon name="edit" size={20} color="#000" />
        <Text style={[styles.buttonText, { color: '#000' }]}>EDIT</Text>
      </TouchableOpacity>
    )} */}
          </View>
        </View>
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 30,
    paddingTop: 20,
  },
  scrollContainer: {
    paddingBottom: 40,
  },
  logo: {
    // marginTop:15,
    alignSelf: 'center',
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  headerCard: {
    // backgroundColor: '#f8f8f8',
    padding: 20,
    paddingTop: 0,
    // margin: 16,
    borderRadius: 12,
    // borderLeftWidth: 4,
    // borderLeftColor: '#000',
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.05,
    // shadowRadius: 6,
    // elevation: 2,
  },
  headerTitle: {
    fontSize: 20,
    // fontWeight: '700',
    color: '#000',
    lineHeight: 28,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    // fontWeight: '600',
    color: '#333',
    lineHeight: 24,
  },
  ctaCard: {
    // backgroundColor: '#000',
    padding: 20,
    // marginHorizontal: 16,
    // marginBottom: 24,
    borderRadius: 12,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 4 },
    // shadowOpacity: 0.2,
    // shadowRadius: 8,
    // elevation: 6,
  },
  ctaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  ctaTitle: {
    fontSize: 18,
    // fontWeight: '800',
    color: '#black',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  urgentBadge: {
    backgroundColor: '#ff5252',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  urgentText: {
    fontSize: 12,
    // fontWeight: '900',
    color: '#fff',
    letterSpacing: 1,
  },
  ctaText: {
    fontSize: 15,
    color: '#black',
    lineHeight: 22,
    marginBottom: 8,
  },
  ctaHighlight: {
    fontSize: 18,
    // fontWeight: '900',
    color: '#FFD700',
    textAlign: 'right',
    letterSpacing: 1,
  },
  videoSection: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    marginHorizontal: 16,
    fontSize: 14,
    // fontWeight: '800',
    color: '#000',
    // marginBottom: 16,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  videoContainer: {
    // aspectRatio: 18.5 / 16,
    // width: '100%',
    // height: width * 0.9,
    borderRadius: 12,
    // overflow: 'hidden',
    marginBottom: 16,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    aspectRatio: 10 / 16,
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
    // fontWeight: '600',
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
    // fontWeight: '700',
    color: '#000',
    marginLeft: 4,
  },
  uploadPlaceholder: {
    width: '100%',
    height: width * 0.8,
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
    // fontWeight: '700',
    // textShadowColor: 'rgba(0,0,0,0.5)',
    // textShadowOffset: {width: 1, height: 1},
    // textShadowRadius: 2,
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
  uploadButton: {
    backgroundColor: '#000',
  },
  editButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#000',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    // fontWeight: '700',
    marginLeft: 8,
    letterSpacing: 0.5,
  },
  statsCard: {
    backgroundColor: '#fff',
    padding: 20,
    marginHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  statsTitle: {
    fontSize: 14,
    // fontWeight: '800',
    color: '#000',
    marginBottom: 16,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    width: '48%',
    padding: 16,
    marginBottom: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 28,
    // fontWeight: '800',
    color: '#000',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    // fontWeight: '600',
    color: '#666',
    textAlign: 'center',
  },
  sectionCard: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },

  sectionTitle: {
    fontSize: 18,
    // fontWeight: '800',
    color: '#111',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  sectionDescription: {
    fontSize: 15,
    color: '#444',
    lineHeight: 22,
    // fontWeight: '500',
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

  editButton: {
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 1,
    flexDirection: 'row',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    flex: 1,
    marginLeft: 6,
  },

  // buttonText: {
  //   fontSize: 14,
  //   fontWeight: '700',
  //   marginLeft: 8,
  // },
});

export default SellerHome;
