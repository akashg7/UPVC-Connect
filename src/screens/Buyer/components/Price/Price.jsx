import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Video from 'react-native-video';
import TopTabBar from '../../Dashboard/TopTabBar';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import AppText from '../../../../components/AppText';
import axios from 'axios';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('window');

const Price = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const [videoData, setVideoData] = useState(null);
  const [headingData, setHeadingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const videoResponse = await axios.get('http://192.168.1.40:9000/api/pricing/video');
        if (videoResponse.data && videoResponse.data.length > 0) {
          setVideoData(videoResponse.data[0]);
        }

        const headingResponse = await axios.get('http://192.168.1.40:9000/api/pricing/heading');
        if (headingResponse.data) {
          setHeadingData(headingResponse.data);
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <AppText style={styles.errorText}>Error loading content: {error}</AppText>
      </View>
    );
  }

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
        </View>
        <TopTabBar />
        <ScrollView contentContainerStyle={styles.scrollContent}>
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
                  source={{uri: `http://192.168.1.40:9000/${videoData.video}`}}
                  style={styles.video}
                  resizeMode="cover"
                  repeat
                  muted
                  paused={false}
                  controls={false}
                />
              ) : (
                <Video
                  source={require('../../../../assets/dummy.mp4')}
                  style={styles.video}
                  resizeMode="cover"
                  repeat
                  muted
                  paused={false}
                  controls={false}
                />
              )}
            </View>
            {videoData?.sponsorLogo && (
              <View style={styles.premiumSponsorContainer}>
                <View style={styles.premiumSponsorContent}>
                  <View style={styles.sponsorDivider} />
                  <Image
                    source={{ uri: `http://192.168.1.40:9000/${videoData.sponsorLogo}` }}
                    style={styles.premiumSponsorLogo}
                    resizeMode="contain"
                  />
                  {videoData.sponsorText && (
                    <AppText weight="Inter" style={styles.premiumSponsorText}>
                      {videoData.sponsorText.toUpperCase()}
                    </AppText>
                  )}
                  <View style={styles.sponsorDivider} />
                </View>
              </View>
            )}
          </View>
          <AppText weight="Inter" style={styles.headerSubtitle2}>
            {'When you are investing in uPVC windows & doors the price can vary based on several important factors- heres what goes into it'}
          </AppText>

          {/* Premium Content Blocks with Images */}
          <View style={styles.premiumContainer}>
            {headingData.map((item, index) => (
              <View key={item._id} style={styles.premiumBlock}>
                {/* Background Image with Overlay */}
                {item.image && (
                  <Image
                    source={{uri: `http://192.168.1.40:9000/${item.image}`}}
                    style={styles.blockBackgroundImage}
                    blurRadius={2}
                  />
                )}
                <LinearGradient
                  colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.5)']}
                  style={styles.imageOverlay}
                />
                
                <View style={styles.glassCard}>
                  <View style={styles.premiumHeader}>
                    <View style={styles.premiumBadge}>
                      <AppText weight="Bold" style={styles.premiumBadgeText}>
                        {item.type?.toUpperCase() || 'PREMIUM'}
                      </AppText>
                    </View>
                    <View style={styles.premiumNumber}>
                      <AppText weight="Bold" style={styles.premiumNumberText}>
                        {index + 1}
                      </AppText>
                    </View>
                  </View>
                  
                  <View style={styles.premiumContent}>
                  </View>
                  
                  <View style={styles.premiumFooter}>
                    <AppText weight="Medium" style={styles.premiumText}>
                      {item.data}
                    </AppText>
                    {/* <TouchableOpacity style={styles.premiumButton}>
                      <AppText weight="SemiBold" style={styles.premiumButtonText}>
                        EXPLORE
                      </AppText>
                      <Icon name="arrow-forward" size={18} color="#fff" />
                    </TouchableOpacity> */}
                  </View>
                </View>
                
                {/* Floating decorative elements */}
                <View style={[styles.floatingCircle, {right: 20, top: 20}]} />
                <View style={[styles.floatingCircle, {left: 30, bottom: 30}]} />
              </View>
            ))}
          </View>

          <View style={styles.buyNowContainer}>
            <TouchableOpacity
                style={styles.buyNowButton}
                onPress={() => navigation.navigate('BuyNowScreen')}
              >
                <AppText weight="Inter" style={styles.buyNowText}>BUY NOW</AppText>
              </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

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
    position: 'relative', 
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  backButton: {
    position: 'absolute',
    left: 10,
    top: '30%',
    transform: [{translateY: -12}],
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
  premiumSponsorContainer: {
    width: '100%',
    paddingVertical: 20,
    backgroundColor: '#fff',
  },
  premiumSponsorContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  premiumSponsorText: {
    fontSize: 10,
    color: '#999',
    letterSpacing: 1,
    marginHorizontal: 12,
    fontWeight: '500',
  },
  premiumSponsorLogo: {
    width: 100,
    height: 40,
  },
  sponsorDivider: {
    flex: 1,
    height: 1,
    backgroundColor: '#eee',
  },
  
  // Premium Content Styles with Images
  premiumContainer: {
    paddingHorizontal: 20,
    marginBottom: 20, 
  },
  premiumBlock: {
    marginBottom: 25,
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
    height: 480, // Fixed height for consistency
    position: 'relative',
  },
  blockBackgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  glassCard: {
    padding: 25,
    borderRadius: 24,
    backgroundColor: 'rgba(254, 254, 254, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    height: '100%',
    justifyContent: 'space-between',
  },
  premiumHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  premiumBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  premiumBadgeText: {
    fontSize: 12,
    color: '#fff',
    letterSpacing: 1,
  },
  premiumNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  premiumNumberText: {
    fontSize: 16,
    color: '#fff',
  },
  premiumContent: {
    marginBottom: 20,
    flex: 1,
    justifyContent: 'center',
  },
  premiumText: {
    fontSize: 16,
    color: '#fff',
    lineHeight: 24,
    letterSpacing: 0.3,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
  },
  premiumFooter: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
    paddingTop: 20,
  },
  premiumButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  premiumButtonText: {
    color: '#fff',
    fontSize: 14,
    marginRight: 10,
    letterSpacing: 1,
  },
  floatingCircle: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.03)',
    zIndex: -1,
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
  cartIcon: {
    marginLeft: 5,
  },
});

export default Price;