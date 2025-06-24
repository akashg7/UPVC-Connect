import React, { useRef, useState } from 'react';
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

const { width, height } = Dimensions.get('window');

// Enhanced dummy data for categories
const categories = [
  {
    id: 1,
    title: 'ELITE CREST',
    description: 'Exquisite uPVC windows crafted with top-tier globally sourced profiles and designs, engineered for unmatched durability & elegance. Backed by comprehensive warranties, they deliver cutting-edge performance and timeless sophistication.',
    note: 'Curated brands chosen exclusively for you',
    brands: [
      {
        id: 1,
        name: 'Veka',
        // video: 'https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-1173-large.mp4',
        video: 'https://www.w3schools.com/html/mov_bbb.mp4',
        featured: ['German Engineering', 'UV Protection', 'Thermal Insulation'],
        benefits: ['15-Year Warranty', 'Burglar Proof', 'Custom Colors'],
      },
      {
        id: 2,
        name: 'Aluplast',
        video: 'https://assets.mixkit.co/videos/preview/mixkit-clouds-and-blue-sky-1170-large.mp4',
        featured: ['Eco-Friendly', 'Superior Glazing', 'Weatherproof'],
        benefits: ['20-Year Warranty', 'Energy Saving', 'Noise Reduction'],
      },
      {
        id: 3,
        name: 'Schüco',
        video: 'https://assets.mixkit.co/videos/preview/mixkit-woman-walking-on-a-path-in-a-forest-1226-large.mp4',
        featured: ['Premium Quality', 'Sleek Design', 'Durability'],
        benefits: ['Lifetime Warranty', 'High Security', 'Custom Designs'],
      },
    ],
  },
  {
    id: 2,
    title: 'LUXE FRAME',
    description: 'Superior uPVC windows featuring high quality precision-engineered profiles. Supported by robust warranties, they offer enduring performance. Manufactured with Indian-made profiles and tailor-made for Indian climates.',
    brands: [
      {
        id: 1,
        name: 'Fenesta',
        video: 'https://assets.mixkit.co/videos/preview/mixkit-woman-walking-on-a-path-in-a-forest-1226-large.mp4',
        featured: ['Weather Resistance', 'Energy Efficient', 'Noise Reduction'],
        benefits: ['10-Year Warranty', 'Premium Materials', 'Custom Designs'],
      },
      {
        id: 2,
        name: 'Aparna Venster',
        video: 'https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-1173-large.mp4',
        featured: ['Durable', 'Low Maintenance', 'Aesthetic'],
        benefits: ['12-Year Warranty', 'Secure', 'Weatherproof'],
      },
    ],
  },
  {
    id: 3,
    title: 'CORE VANTAGE',
    description: 'Affordable uPVC windows manufactured with Chinese profiles, designed to meet budget-conscious needs. Offers basic functionality but may yellow (discolour) over time in areas with high UV radiation.',
    brands: [
      {
        id: 1,
        name: 'LG Hausys',
        video: 'https://assets.mixkit.co/videos/preview/mixkit-clouds-and-blue-sky-1170-large.mp4',
        featured: ['Cost Effective', 'Basic Functionality', 'Standard Designs'],
        benefits: ['5-Year Warranty', 'Weather Resistant', 'Low Maintenance'],
      },
    ],
  },
];

// Define sections for the FlatList
const sections = [
  { type: 'header', data: {} },
  ...categories.map((category) => ({
    type: 'category',
    data: category,
  })),
];

const MarketInsights = ({navigation}) => {
  const flatListRefs = useRef({});
  
  const [activeIndices, setActiveIndices] = useState(
    categories.reduce((acc, category) => {
      acc[category.id] = 0;
      return acc;
    }, {})
  );
  
  const handleCategorySelect = (category) => {
    console.log(`Selected category: ${category.title}`);
    // Add navigation or other logic here
    navigation.navigate("QuoteRequestPage")
  };
 
  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const { item, index } = viewableItems[0];
      const categoryId = item.categoryId;
      setActiveIndices(prev => ({ ...prev, [categoryId]: index }));
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
    minimumViewTime: 300,
  }).current;

  const renderBrandItem = ({ item, category }) => (
    <View style={styles.brandContainer}>
      <AppText weight='SemiBold' style={styles.brandTitle}>{item.name}</AppText>
      <View style={styles.videoContainer}>
        <Video
          source={{ uri: item.video }}
          style={styles.video}
          resizeMode="cover"
          // repeat
          // muted
          paused={false}
          // controls={false} 
          repeat={true}
          // resizeMode="cover"
          controls={true}
        />
        <LinearGradient
          colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0)']}
          style={styles.videoOverlay}
          start={{ x: 0.5, y: 1 }}
          end={{ x: 0.5, y: 0 }}
        />
      </View>
      <View style={styles.featuresContainer}>
        <View style={styles.featureColumn}>
          <View style={styles.sectionHeader}>
            <Icon name="featured-play-list" size={20} color="#000" style={styles.sectionIcon} />
            <AppText weight='SemiBold' style={styles.sectionTitle}>FEATURES</AppText>
          </View>
          {item.featured.map((feature, index) => (
            <View key={`feature-${index}`} style={styles.featureItem}>
              <Icon name="check-circle" size={18} color="#000" style={styles.featureIcon} />
              <AppText weight='Inter' style={styles.featureText}>{feature}</AppText>
            </View>
          ))}
        </View>
        <View style={styles.featureColumn}>
          <View style={styles.sectionHeader}>
            <Icon name="stars" size={20} color="#000" style={styles.sectionIcon} />
            <AppText weight='SemiBold' style={styles.sectionTitle}>BENEFITS</AppText>
          </View>
          {item.benefits.map((benefit, index) => (
            <View key={`benefit-${index}`} style={styles.featureItem}>
              <Icon name="star" size={18} color="#000" style={styles.featureIcon} />
              <AppText weight='Inter' style={styles.featureText}>{benefit}</AppText>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  const renderBrandCarousel = (category) => {
    const currentIndex = activeIndices[category.id] || 0;

    return ( 
        <View style={styles.carouselContainer}> 
           
              <FlatList
                ref={(ref) => (flatListRefs.current[category.id] = ref)}
                data={category.brands.map(brand => ({ ...brand, categoryId: category.id }))}
                renderItem={({ item }) => renderBrandItem({ item, category })}
                keyExtractor={(item) => `${item.categoryId}-${item.id}`}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={viewabilityConfig}
                initialScrollIndex={0}
                getItemLayout={(data, index) => ({
                  length: width - 40,
                  offset: (width - 40) * index,
                  index,
                })}
                scrollEnabled={true}
              /> 

          {/* Navigation Dots */}
          <View style={styles.dotsContainer}>
            {category.brands.map((_, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  flatListRefs.current[category.id]?.scrollToIndex({ index, animated: true });
                  setActiveIndices(prev => ({ ...prev, [category.id]: index }));
                }}
              >
                <View
                  style={[
                    styles.dot,
                    index === currentIndex && styles.activeDot,
                  ]}
                />
              </TouchableOpacity>
            ))}
          </View>

          {/* Navigation Buttons */}
          {category.brands.length > 1 && (
            <View style={styles.navButtons}>
              <TouchableOpacity
                style={[
                  styles.navButton,
                  currentIndex === 0 && styles.disabledNavButton,
                ]}
                onPress={() => {
                  if (currentIndex > 0) {
                    const newIndex = currentIndex - 1;
                    flatListRefs.current[category.id]?.scrollToIndex({
                      index: newIndex,
                      animated: true,
                    });
                    setActiveIndices(prev => ({ ...prev, [category.id]: newIndex }));
                  }
                }}
                disabled={currentIndex === 0}
              >
                <Icon name="chevron-left" size={24} color="#000" />
              </TouchableOpacity>
              <AppText weight='Inter' style={styles.counterText}>
                {currentIndex + 1} / {category.brands.length}
              </AppText>
              <TouchableOpacity
                style={[
                  styles.navButton,
                  currentIndex === category.brands.length - 1 && styles.disabledNavButton,
                ]}
                onPress={() => {
                  if (currentIndex < category.brands.length - 1) {
                    const newIndex = currentIndex + 1;
                    flatListRefs.current[category.id]?.scrollToIndex({
                      index: newIndex,
                      animated: true,
                    });
                    setActiveIndices(prev => ({ ...prev, [category.id]: newIndex }));
                  }
                }}
                disabled={currentIndex === category.brands.length - 1}
              >
                <Icon name="chevron-right" size={24} color="#000" />
              </TouchableOpacity>
            </View>
          )}
        </View> 
    );
  };

  const renderSection = ({ item }) => {
    if (item.type === 'header') {
      return (
        <View style={styles.header}>
          <AppText weight='Bold' style={styles.headerText}>SELECT YOUR PREFERRED CATEGORY</AppText>
          <AppText weight='SemiBold' style={styles.subHeaderText}>
            We've categorized uPVC windows into 3 tiers to match your style & requirements. Please select one category to explore the premium brands we offer.
          </AppText>
        </View>
      );
    } else if (item.type === 'category') {
      const category = item.data;
      return (
        <View style={styles.categoryCard}>
          <LinearGradient 
            colors={['#f8f8f8', '#ffffff']} 
            style={styles.cardGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.cardHeader}>
              <View style={styles.titleContainer}>
                <AppText weight='SemiBold' style={styles.categoryTitle}>{category.title}</AppText>
                {category.note && (
                  <AppText weight='Inter' style={styles.premiumNoteText}>{category.note}</AppText>
                )}
              </View>
              <TouchableOpacity
                style={styles.selectButton}
                onPress={() => handleCategorySelect(category)}
              >
                <AppText weight='SemiBold' style={styles.selectButtonText}>SELECT</AppText>
                <Icon name="arrow-forward" size={18} color="#fff" style={styles.selectIcon} />
              </TouchableOpacity>
            </View>
            <AppText weight='Inter' style={styles.categoryDescription}>{category.description}</AppText>
            <View style={styles.divider} />
            {renderBrandCarousel(category)}
          </LinearGradient>
        </View>
      );
    }
    return null;
  }; 

  return (
    <View style={styles.mainContainer}>
        
       <Image
                  source={require('../../../assets/logo.png')}
                  style={styles.logo}
                />
                        {/* <ScrollView
                          horizontal
                          showsHorizontalScrollIndicator={false}
                          contentContainerStyle={styles.tabScrollContainer}>
                          {tabs.map((tab, index) => (
                            <TouchableOpacity
                              key={index}
                              style={[
                                styles.tabButton,
                                // activeTab === index && styles.activeTab,
                              ]}
                              onPress={() => setActiveTab(index)}
                              activeOpacity={0.7}>
                              <Text
                                style={[
                                  styles.tabText,
                                  // activeTab === index && styles.activeTabText,
                                ]}>
                                {tab}
                              </Text>
                            </TouchableOpacity>
                          ))}
                        </ScrollView> */}
                          
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
    // flexDirection:"col",
    backgroundColor: 'white',
  },
  container: {
    padding: 20, 
  },
  logo: {
    marginTop:15,
    alignSelf:"center",
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
    flexDirection:"column",
    backgroundColor: '#fff',
    borderRadius: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
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
        shadowOffset: { width: 0, height: 6 },
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
        shadowOffset: { width: 0, height: 2 },
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
     width: width - 40
  },
  brandContainer: {
    width: width - 40,
    paddingRight: 10,
  },
  brandTitle: {
    fontSize: 18,
    // fontWeight: '700',
    color: '#000',
    marginBottom: 15,
    textAlign: 'center',
    letterSpacing: 1,
  },
  videoContainer: {
    width: '88%', 
    borderRadius: 12, 
    marginBottom: 20,
    backgroundColor: '#000',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
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
        shadowOffset: { width: 0, height: 2 },
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
    flexDirection:"row",
    justifyContent:"space-between", 
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