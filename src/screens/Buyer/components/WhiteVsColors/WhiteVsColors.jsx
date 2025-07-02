import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
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
import { useNavigation } from '@react-navigation/native';
import AppText from '../../../../components/AppText';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

const WhiteVsColor = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [video, setVideo] = useState(null);
  const [difference, setDifference] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [videoResponse, differenceResponse] = await Promise.all([
          axios.get("https://upvc-backend.onrender.com/api/color/video"),
          axios.get("https://upvc-backend.onrender.com/api/color/comparisons"),
        ]);

        if (videoResponse.data.length > 0) {
          setVideo(videoResponse.data[0]);
        }
        setDifference(differenceResponse.data);
      } catch (err) {
        console.error("Error fetching White vs Color Data:", err);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const renderRow = (type) => {
    const item = difference.find(d => d.type === type);
    if (!item) return null;

    return (
      <View>
        <AppText weight="Inter" style={styles.category}>{type}</AppText>
        <View style={styles.tableRow}>
          <View style={styles.cell}>
            <AppText weight="Inter" style={styles.description}>{item.white}</AppText>
          </View>
          <View style={styles.cell}>
            <AppText weight="Inter" style={styles.description}>{item.lam}</AppText>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{ paddingTop: insets.top, flex: 1, backgroundColor: 'white' }}>
      <View style={styles.container}>
        <View style={styles.Headercontainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
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

        {loading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#000" />
          </View>
        ) : error ? (
          <View style={{ padding: 20 }}>
            <Text style={{ color: 'red' }}>{error}</Text>
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.header}>
              <AppText weight="Inter" style={styles.headerTitle}>WHITE VS COLOR</AppText>
              <View style={styles.videoContainer}>
                <Video
                  source={{ uri: `https://upvc-backend.onrender.com${video.src}` }}
                  style={styles.video}
                  resizeMode="cover"
                  repeat
                  muted
                  paused={false}
                  controls={false}
                />
              </View>
            </View>

            <View style={styles.tableContainer}>
              <View style={styles.tableHeader}>
                <AppText weight="Inter" style={[styles.tableHeaderText, { textAlign: 'left' }]}>WHITE</AppText>
                <AppText weight="Inter" style={[styles.tableHeaderText, { textAlign: 'right' }]}>LAMINATED</AppText>
              </View>

              {[
                "APPEARANCE",
                "COST",
                "UV RESISTANCE & FADING",
                "MAINTENANCE",
                "HEAT RESISTANCE",
                "SCRATCH VISIBILITY",
                "AVAILABILITY"
              ].map(type => renderRow(type))}
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
  Headercontainer: {},
  backButton: {
    position: 'absolute',
    left: 10,
    top: '30%',
    transform: [{ translateY: -12 }],
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buyNowText: {
    color: '#FFFFFF',
    fontSize: 16,
    letterSpacing: 1,
  },
});

export default WhiteVsColor;
