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

        // Fetch video data
        const videoResponse = await axios.get(
          'https://upvc-backend.onrender.com/api/pricing/video',
        );
        if (videoResponse.data && videoResponse.data.length > 0) {
          setVideoData(videoResponse.data[0]);
        }

        // Fetch heading data
        const headingResponse = await axios.get(
          'https://upvc-backend.onrender.com/api/pricing/heading',
        );
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
        <AppText style={styles.errorText}>
          Error loading content: {error}
        </AppText>
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
                  source={{uri: `https://upvc-backend.onrender.com/${videoData.video}`}}
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
          </View>
          <AppText weight="Inter" style={styles.headerSubtitle2}>
            {
              'When you are investing in uPVC windows & doors the price can vary based on several important factors- heres what goes into it'
            }
          </AppText>

          {/* Card Section */}
{/* Card Section */}
<View style={styles.cardsContainer}>
  {headingData.map((item, index) => (
    <View key={item._id} style={styles.card}>
      {/* Card Image with Overlay */}
      {item.image && (
        <View style={styles.cardImageContainer}>
          <Image
            source={{uri: `https://upvc-backend.onrender.com/${item.image}`}}
            style={styles.cardImage}
            resizeMode="cover"
          />
          <View style={styles.imageOverlay} />
        </View>
      )}

      {/* Card Content */}
      <View style={styles.cardContent}>
        {/* Card Header with Type */}
        {item.type && (
          <View style={styles.cardHeader}>
            <AppText weight="SemiBold" style={styles.cardTypeText}>
              {item.type.toUpperCase()}
            </AppText>
          </View>
        )}

        {/* Card Data */}
        {item.data && (
          <View style={styles.cardBody}>
            <AppText weight="Inter" style={styles.cardDataText}>
              {item.data}
            </AppText>
          </View>
        )}

        {/* Learn More Button */}
        {/* <TouchableOpacity 
          style={styles.learnMoreButton}
          onPress={() => navigation.navigate('LearnMoreScreen', { item })}
        >
          <AppText weight="SemiBold" style={styles.learnMoreText}>
            LEARN MORE
          </AppText>
          <Icon name="arrow-forward" size={18} color="#000" />
        </TouchableOpacity> */}
      </View>
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

// Styles
const styles = StyleSheet.create({
  container: {
    // paddingTop: 15,
    flex: 1,
    backgroundColor: '#FFFFFF',
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
  headerSubtitle: {
    textAlign: 'center',
    color: 'black',
    marginTop: 5,
  },
  headerSubtitle2: {
    fontSize: 16,
    color: '#000000',
    paddingHorizontal: 20,
    marginBottom: 10,
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
  container2: {
    padding: 20,
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  bulletPoint: {
    fontSize: width * 0.05,
    color: '#000000',
    marginRight: 10,
    lineHeight: 22,
  },
  bulletText: {
    flex: 1,
    fontSize: width * 0.04,
    color: '#4A4A4A',
    lineHeight: 22,
  },
  Headercontainer: {
    position: 'relative',
    // height: 80,
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
    // paddingTop: 20,
  },
  logo: {
    width: 100,
    height: 50,
    // resizeMode: 'contain',
  },
  buyNowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
    // marginBottom: 30,
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
cardsContainer: {
  paddingHorizontal: 20,
  paddingBottom: 10,
},
card: {
  backgroundColor: '#FFFFFF',
  borderRadius: 16,
  marginBottom: 25,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.1,
  shadowRadius: 12,
  elevation: 5,
  overflow: 'hidden',
  borderWidth: 1,
  borderColor: '#F0F0F0',
},
cardImageContainer: {
  position: 'relative',
  height: 200,
},
cardImage: {
  width: '100%',
  height: '100%',
},
imageOverlay: {
  ...StyleSheet.absoluteFillObject,
  backgroundColor: 'rgba(0,0,0,0.05)',
},
cardContent: {
  // padding: 20,
},
cardHeader: {
  marginBottom: 12,
},
cardTypeText: {
  paddingTop:10,
  fontSize: 16,
  color: '#000',
  letterSpacing: 1,
  textAlign: 'center',
},
cardBody: {
  marginBottom: 10,
},
cardDataText: {
  fontSize: 14,
  color: '#333',
  lineHeight: 22,
  textAlign: 'center',
},
learnMoreButton: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: 12,
  borderTopWidth: 1,
  borderTopColor: '#F0F0F0',
  marginTop: 10,
},
learnMoreText: {
  color: '#000',
  fontSize: 14,
  letterSpacing: 0.5,
  marginRight: 8,
},
});

export default Price;
