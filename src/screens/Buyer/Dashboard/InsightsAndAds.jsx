import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
  Platform,
  Image,
} from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import TopTabBar from './TopTabBar';
import AppText from '../../../components/AppText';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const {width, height} = Dimensions.get('window');

const MarketInsights = ({navigation}) => {
  const [buyerId, setBuyerId] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('buyerToken');
        if (token) {
          setBuyerId(token);
        } 
        const categoryresponse = await axios.get(
          'http://192.168.1.27:9000/api/categories',
        ); 
        setCategories(categoryresponse?.data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };

    fetchData();
  }, []);

  // Define sections for the FlatList
  const sections = [
    {type: 'header', data: {}},
    ...categories.map(category => ({
      type: 'category',
      data: category,
    })),
  ];
 
  const handleCategorySelect = (category) => {
    navigation.navigate('QuoteRequestPage', { 
      selectedCategory: category 
    });
  };

  const renderSection = ({item}) => {
    if (item.type === 'header') {
      return (
        <View style={styles.header}>
          <AppText weight="Bold" style={styles.headerText}>
            SELECT YOUR PREFERRED CATEGORY
          </AppText>
          <AppText weight="SemiBold" style={styles.subHeaderText}>
            We've categorized uPVC windows into 3 tiers to match your style &
            requirements. Please select one category to explore the premium
            brands we offer.
          </AppText>
        </View>
      );
    } else if (item.type === 'category') {
      // console.log('item : ', item);
      const category = item.data;
      return (
        <View style={styles.categoryCard}>
          <LinearGradient
            colors={['#f8f8f8', '#ffffff']}
            style={styles.cardGradient}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}>
            <View style={styles.cardHeader}>
              <View style={styles.titleContainer}>
                <AppText weight="SemiBold" style={styles.categoryTitle}>
                  {category.name}
                </AppText>
              </View>
              <TouchableOpacity
                style={styles.selectButton}
                onPress={() => handleCategorySelect(category)}>
                <AppText weight="SemiBold" style={styles.selectButtonText}>
                  SELECT
                </AppText>
                <Icon
                  name="arrow-forward"
                  size={18}
                  color="#fff"
                  style={styles.selectIcon}
                />
              </TouchableOpacity>
            </View>
            <AppText weight="Inter" style={styles.categoryDescription}>
              {category.description}
            </AppText>
            <View style={styles.videoContainer}>
             <Video
                source={{uri: `http://192.168.1.27:9000${category.videoUrl}`}}
                style={styles.video}
                resizeMode="cover"
                paused={true}
                repeat={false}
                controls={true}
              />
              <LinearGradient
                colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0)']}
                style={styles.videoOverlay}
                start={{x: 0.5, y: 1}}
                end={{x: 0.5, y: 0}}
              />
            </View> 
          </LinearGradient>
        </View>
      );
    }
    return null;
  };

  return (
    <View style={styles.mainContainer}>
      <Image source={require('../../../assets/logo.png')} style={styles.logo} />
      <TopTabBar />
      <FlatList
        data={sections}
        renderItem={renderSection}
        keyExtractor={(item, index) => item.type + index}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
        style={styles.flatList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1, 
    backgroundColor: 'white',
  },
  container: {
    padding: 20,
  },
  logo: {
    marginTop: 15,
    alignSelf: 'center',
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  flatList: {
    backgroundColor: 'transparent',
  },
  header: {
    marginBottom: 30,
    padding: 25,
    flexDirection: 'column',
    backgroundColor: '#fff',
    borderRadius: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 6},
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  headerText: {
    fontSize: 22,
    // fontWeight: '800',
    color: '#000',
    marginBottom: 12,
    textAlign: 'center',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  subHeaderText: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  categoryCard: {
    borderRadius: 20,
    marginBottom: 25,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 6},
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  cardGradient: {
    padding: 25,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  titleContainer: {
    flex: 1,
    marginRight: 15,
  },
  categoryTitle: {
    fontSize: 20,
    // fontWeight: '700',
    color: '#000',
    letterSpacing: 0.5,
  },
  premiumNoteText: {
    fontSize: 13,
    color: '#666',
    fontStyle: 'italic',
    marginTop: 5,
  },
  categoryDescription: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
    marginBottom: 20,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
    marginVertical: 15,
  },
  selectButton: {
    backgroundColor: '#000',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    minWidth: 100,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.3,
        shadowRadius: 3,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  selectButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  selectIcon: {
    marginLeft: 5,
  },
  carouselContainer: {
    marginTop: 10,
    width: width - 40,
  },
  brandContainer: {
    width: width - 40,
    paddingRight: 10,
  },
  brandTitle: {
    fontSize: 18,
    color: '#000',
    marginBottom: 15,
    textAlign: 'center',
    letterSpacing: 1,
  },
  videoContainer: {
    width: '100%',
    borderRadius: 12,
    // marginBottom: 20,
    backgroundColor: '#000',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 6},
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
    aspectRatio: 9 / 16,
    borderRadius: 10,
    overflow: 'hidden',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  videoOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '30%',
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  featureColumn: {
    width: '48%',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  sectionIcon: {
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 16,
    // fontWeight: '600',
    color: '#000',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  featureIcon: {
    marginTop: 2,
  },
  featureText: {
    fontSize: 14,
    color: '#555',
    marginLeft: 10,
    flex: 1,
    lineHeight: 20,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 15,
    paddingRight: 50,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ddd',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#000',
    width: 12,
  },
  navButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
    // paddingHorizontal: 10,
    paddingRight: 50,
  },
  navButton: {
    padding: 12,
    borderRadius: 30,
    backgroundColor: '#f0f0f0',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  disabledNavButton: {
    opacity: 0.5,
  },
  counterText: {
    fontSize: 14,
    // fontWeight: '600',
    color: '#000',
  },
  headerTitle: {
    fontSize: 18,
    // fontWeight: 'bold',
    color: 'black',
    letterSpacing: 1,
  },
  tabScrollContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#e0e0e0',
  },
  tabButton: {
    height: 30,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: 'black',
  },
  tabText: {
    fontSize: 12,
    // fontWeight: '600',
    color: '#888',
    letterSpacing: 1,
  },
  activeTabText: {
    color: 'black',
  },
});

export default MarketInsights;
