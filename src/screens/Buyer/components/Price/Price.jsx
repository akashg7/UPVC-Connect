import React, { useState, useEffect } from 'react';
import {
  View, 
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import Video from 'react-native-video';
import TopTabBar from '../../Dashboard/TopTabBar';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import AppText from '../../../../components/AppText';
import axios from 'axios';

const {width, height} = Dimensions.get('window');

const Price = () => {
  const [videoData, setVideoData] = useState(null);
  const [headingData, setHeadingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigation = useNavigation();  

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch video data
        const videoResponse = await axios.get('http://192.168.1.27:9000/api/pricing/video');
        if (videoResponse.data && videoResponse.data.length > 0) {
          setVideoData(videoResponse.data[0]);
        }
        
        // Fetch heading data
        const headingResponse = await axios.get('http://192.168.1.27:9000/api/pricing/heading');
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
          <AppText weight='Bold' style={styles.headerTitle}>
            {videoData?.title || 'PRICE - KNOW IT ALL'}
          </AppText>
          <AppText weight='SemiBold' style={styles.headerSubtitle}>
            {videoData?.subtitle || 'The cost is the entry fee, the value is the experience!'}
          </AppText>
          <View style={styles.videoContainer}>
            {videoData?.video ? (
              <Video
                source={{ uri: `http://192.168.1.27:9000/${videoData.video}` }}
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
        <AppText weight='SemiBold' style={styles.headerSubtitle2}>
          { 'When you are investing in uPVC windows & doors the price can vary based on several important factors- heres what goes into it:'}
        </AppText>

        {/* Updated Card Section */}
        <View style={styles.cardsContainer}>
          {headingData.map((item, index) => (
            <View key={item._id} style={styles.card}>
              {/* Card Header with Type */}
              {item.type && (
                <View style={styles.cardHeader}>
                  <AppText weight="Bold" style={styles.cardTypeText}>
                    {item.type.toUpperCase()}
                  </AppText>
                </View>
              )}
              
              {/* Card Image */}
              {item.image && (
                <Image
                  source={{ uri: `http://192.168.1.27:9000/${item.image}` }}
                  style={styles.cardImage}
                  resizeMode="cover"
                />
              )}
              
              {/* Card Data */}
              {item.data && (
                <View style={styles.cardBody}>
                  <AppText weight="Inter" style={styles.cardDataText}>
                    {item.data}
                  </AppText>
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity 
        style={styles.buyNowButton}
        onPress={() => navigation.navigate('BuyNowScreen')}
      >
        <AppText weight='SemiBold' style={styles.buyNowText}>BUY NOW</AppText>
      </TouchableOpacity>
    </View> 
  );
};


// Styles
const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
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
    fontSize: width * 0.04, 
    color: '#000000',
    paddingHorizontal: 20,
    marginBottom:10,
  },
  videoContainer: {
    width: '100%',
    aspectRatio: 9 / 16, 
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
    height: 80, 
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  backButton: {
    position: 'absolute',
    left: 10,
    top: '50%',
    transform: [{translateY: -12}],  
    padding: 5,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  }, 
  buyNowButton: {
    backgroundColor: '#000000',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 30,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buyNowText: {
    color: '#FFFFFF',
    fontSize: 18, 
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
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  cardHeader: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
  },
  cardTypeText: {
    textAlign:"center",
    fontSize: 16,
    color: '#333333',
    letterSpacing: 0.5,
  },
  cardImage: {
    width: '100%',
    height: 250,
  },
  cardBody: {
    padding: 16,
  },
  cardDataText: {
    textAlign:"center",
    fontSize: 14,
    color: '#555555',
    lineHeight: 22,
  },
});

export default Price;