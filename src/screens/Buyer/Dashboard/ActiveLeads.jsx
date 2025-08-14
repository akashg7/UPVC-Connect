import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  Animated,
  ActivityIndicator,
  Linking,
  Alert,
} from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AppText from '../../../components/AppText';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PremiumLoginModal from '../../../components/PremiumLoginModal';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('window');
const BASE_URL = 'http://192.168.1.52:9000';

const LeadsHistory = () => {
  const [leadsData, setLeadsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedLead, setExpandedLead] = useState(null);
  const [activeSellerIndices, setActiveSellerIndices] = useState({});
  const [activeVideo, setActiveVideo] = useState(null);
  const [cardLoading, setCardLoading] = useState({});
  const [showLoginModal, setShowLoginModal] = useState(false);

  const flatListRefs = useRef({});
  const scrollX = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();
  const videoRefs = useRef({});
  const navigation = useNavigation();

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const token = await AsyncStorage.getItem('buyerToken');
        if (!token) {
          setShowLoginModal(true);
          // Alert.alert('Error', 'Please login to view leads');
          return;
        }

        const response = await axios.get(`${BASE_URL}/api/buyer/leads`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          setLeadsData(response.data.leads);
        }
      } catch (error) {
        console.error('Error fetching leads:', error);
        Alert.alert('Error', 'Failed to fetch leads');
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  // const toggleLead = leadId => {
  //   setExpandedLead(expandedLead === leadId ? null : leadId);
  //   if (!activeSellerIndices[leadId]) {
  //     setActiveSellerIndices(prev => ({ ...prev, [leadId]: 0 }));
  //   }
  //   // Pause any playing video when collapsing
  //   if (expandedLead === leadId) {
  //     setActiveVideo(null);
  //   }
  // };

  const toggleLead = leadId => {
    const isExpanding = expandedLead !== leadId;

    if (isExpanding) {
      setCardLoading(prev => ({...prev, [leadId]: true}));
      setExpandedLead(leadId);
      setTimeout(() => {
        setCardLoading(prev => ({...prev, [leadId]: false}));
      }, 600); // Simulate loading delay
    } else {
      setExpandedLead(null);
      setActiveVideo(null);
    }

    if (!activeSellerIndices[leadId]) {
      setActiveSellerIndices(prev => ({...prev, [leadId]: 0}));
    }
  };

  const handleVideoRef = (ref, videoId) => {
    videoRefs.current[videoId] = ref;
  };

  const handleVideoPress = videoId => {
    if (activeVideo === videoId) {
      // Pause if already active
      setActiveVideo(null);
      if (videoRefs.current[videoId]) {
        videoRefs.current[videoId].presentFullscreenPlayer();
      }
    } else {
      // Play new video and pause others
      setActiveVideo(videoId);
    }
  };

  const handleCall = phoneNumber => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleWhatsApp = whatsappNumber => {
    Linking.openURL(`whatsapp://send?phone=${whatsappNumber}`);
  };

  const renderSellerItem = ({item, leadId}) => {
    const videoId = `${leadId}-${item.id}`;
    const isVideoActive = activeVideo === videoId;

    return (
      <View style={styles.sellerCard}>
        <View style={styles.sellerHeader}>
          <AppText weight="Inter" style={styles.brandName}>
            {item.brandName}
          </AppText>
        </View>

        <TouchableOpacity
          style={styles.videoContainer}
          onPress={() => handleVideoPress(videoId)}
          activeOpacity={0.9}>
          <Video
            ref={ref => handleVideoRef(ref, videoId)}
            source={{uri: item.video}}
            style={styles.video}
            resizeMode="cover"
            paused={!isVideoActive}
            onError={e => console.error('Video error:', e.error)}
          />
          {!isVideoActive && (
            <View style={styles.videoPlaceholder}>
              <Icon
                name="play-circle-filled"
                size={50}
                color="rgba(255,255,255,0.8)"
              />
            </View>
          )}
        </TouchableOpacity>
        <View style={styles.sellerDetails}>
          <DetailRow icon="person" text={item.name} />

          <TouchableOpacity
            style={styles.detailRow}
            onPress={() => handleCall(item.contactNo)}>
            <Icon
              name="phone"
              size={18}
              color="#555"
              style={styles.detailIcon}
            />
            <AppText weight="Inter" style={styles.detailText}>
              {item.contactNo}
            </AppText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.detailRow}
            onPress={() => handleWhatsApp(item.whatsapp)}>
            <Icon
              name="chat"
              size={18}
              color="#555"
              style={styles.detailIcon}
            />
            <AppText weight="Inter" style={styles.detailText}>
              {item.whatsapp}
            </AppText>
          </TouchableOpacity>

          <DetailRow icon="location-on" text={item.address} />
          <DetailRow
            icon="business"
            text={`${item.yearsInBusiness} years in business`}
          />
          <DetailRow icon="build" text={`Capacity: ${item.manuCap}`} />
          <DetailRow icon="people" text={`Team: ${item.teamSize}`} />

          {/* Quotes Section */}
          <View style={styles.quotesContainer}>
            <AppText weight="Inter" style={styles.sectionTitle}>
              QUOTED PRODUCTS
            </AppText>
            {item.quotes.map((quote, index) => (
              <View key={index} style={styles.quoteItem}>
                <AppText weight="Inter" style={styles.quoteTitle}>
                  {quote.productTitle} ({quote.color})
                </AppText>
                <AppText weight="Inter" style={styles.quoteDetail}>
                  Size: {quote.size} | Qty: {quote.quantity}
                </AppText>
                {quote.features.map((feature, i) => (
                  <AppText key={i} weight="Inter" style={styles.quoteFeature}>
                    • {feature}
                  </AppText>
                ))}
              </View>
            ))}
          </View>

          <View style={styles.visitingCardContainer}>
            <AppText weight="Inter" style={styles.detailLabel}>
              Visiting Card
            </AppText>
            <Image
              source={{uri: item.visitingCard}}
              style={styles.visitingCard}
              resizeMode="contain"
            />
          </View>
        </View>
      </View>
    );
  };

  const renderLeadCard = ({item}) => {
    const currentSellerIndex = activeSellerIndices[item.id] || 0;
    const hasMultipleSellers = item.sellers.length > 1;

    return (
      <View style={styles.leadCard}>
        <TouchableOpacity
          onPress={() => toggleLead(item.id)}
          activeOpacity={0.9}>
          <View style={styles.leadHeader}>
            <View style={styles.leadHeaderContent}>
              <AppText weight="Inter" style={styles.leadDate}>
                {item.date}
              </AppText>
              <AppText weight="Inter" style={styles.leadProject}>
                {item.projectName}
              </AppText>
              <AppText weight="Inter" style={styles.leadAddress}>
                {item.projectAddress}
              </AppText>
              <View style={styles.projectMeta}>
                <AppText weight="Inter" style={styles.metaText}>
                  Stage: {item.projectStage}
                </AppText>
                <AppText weight="Inter" style={styles.metaText}>
                  Timeline: {item.projectTimeline}
                </AppText>
              </View>
              <AppText weight="Inter" style={styles.leadCategory}>
                {item.category}
              </AppText>
            </View>
            <Icon
              name={expandedLead === item.id ? 'expand-less' : 'expand-more'}
              size={24}
              color="#000"
            />
          </View>
        </TouchableOpacity>

        {expandedLead === item.id && (
          <View style={styles.sellersContainer}>
            {cardLoading[item.id] ? (
              <View style={{paddingVertical: 30, alignItems: 'center'}}>
                <ActivityIndicator size="large" color="black" />
              </View>
            ) : item.sellers.length === 0 ? (
              <View style={{padding: 20, alignItems: 'center'}}>
                <Icon name="info" size={40} color="#ccc" />
                <AppText
                  weight="Inter"
                  style={{fontSize: 14, color: '#777', marginTop: 10}}>
                  No seller responses yet. Please check back later!
                </AppText>
              </View>
            ) : (
              <>
                {/* EXISTING FlatList + Dots code goes here */}
                <Animated.FlatList
                  ref={ref => (flatListRefs.current[item.id] = ref)}
                  data={item.sellers}
                  renderItem={({item: seller}) =>
                    renderSellerItem({item: seller, leadId: item.id})
                  }
                  keyExtractor={seller => seller.id}
                  horizontal
                  pagingEnabled
                  showsHorizontalScrollIndicator={false}
                  scrollEventThrottle={16}
                  onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {x: scrollX}}}],
                    {useNativeDriver: false},
                  )}
                  onMomentumScrollEnd={e => {
                    const newIndex = Math.round(
                      e.nativeEvent.contentOffset.x / (width - 40),
                    );
                    setActiveSellerIndices(prev => ({
                      ...prev,
                      [item.id]: newIndex,
                    }));
                    setActiveVideo(null);
                  }}
                  initialScrollIndex={currentSellerIndex}
                  getItemLayout={(_, index) => ({
                    length: width - 40,
                    offset: (width - 40) * index,
                    index,
                  })}
                />
                {hasMultipleSellers && (
                  <View style={styles.dotsContainer}>
                    {item.sellers.map((_, index) => {
                      const inputRange = [
                        (index - 1) * (width - 40),
                        index * (width - 40),
                        (index + 1) * (width - 40),
                      ];

                      const scale = scrollX.interpolate({
                        inputRange,
                        outputRange: [0.8, 1.2, 0.8],
                        extrapolate: 'clamp',
                      });

                      const opacity = scrollX.interpolate({
                        inputRange,
                        outputRange: [0.6, 1, 0.6],
                        extrapolate: 'clamp',
                      });

                      return (
                        <Animated.View
                          key={index}
                          style={[
                            styles.dot,
                            index === currentSellerIndex && styles.activeDot,
                            {transform: [{scale}], opacity},
                          ]}
                        />
                      );
                    })}
                  </View>
                )}
              </>
            )}
          </View>
        )}
      </View>
    );
  };

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return (
    <View style={{paddingTop: insets.top, flex: 1, backgroundColor: 'white'}}>
      {/* Removed ScrollView wrapper since FlatList is scrollable by itself */}
      <View style={styles.container}>
        <Image
          source={require('../../../assets/logo.png')}
          style={styles.logo}
        />

        {leadsData.length > 0 ? (
          <FlatList
            data={leadsData}
            renderItem={renderLeadCard}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <AppText weight="Inter" style={styles.emptyText}>
                  No leads found
                </AppText>
              </View>
            }
          />
        ) : (
          <View style={styles.emptyContainer}>
            <AppText weight="Inter" style={styles.emptyText}>
              No leads found
            </AppText>
          </View>
        )}
      </View>
      <PremiumLoginModal
        visible={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        navigation={navigation}
      />
    </View>
  );
};

const DetailRow = ({icon, text, onPress}) => (
  <TouchableOpacity style={styles.detailRow} onPress={onPress}>
    <Icon name={icon} size={18} color="#555" style={styles.detailIcon} />
    <AppText weight="Inter" style={styles.detailText}>
      {text}
    </AppText>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  logo: {
    alignSelf: 'center',
    width: 100,
    height: 50,
    marginVertical: 10,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  leadCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  leadHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  leadHeaderContent: {
    flex: 1,
    marginRight: 10,
  },
  leadDate: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  },
  leadProject: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 2,
  },
  leadAddress: {
    fontSize: 14,
    color: '#444',
    marginBottom: 8,
  },
  projectMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  metaText: {
    fontSize: 12,
    color: '#666',
  },
  leadCategory: {
    fontSize: 12,
    color: 'black',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: 4,
  },
  sellersContainer: {
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  sellerCard: {
    width: width - 32,
    paddingHorizontal: 16,
  },
  sellerHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
  },
  brandName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  videoPlaceholder: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  videoContainer: {
    width: '100%',
    height: width * 1.3,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#000',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  videoOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.03)',
  },
  sellerDetails: {
    marginTop: 10,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  detailIcon: {
    marginRight: 12,
    width: 24,
    textAlign: 'center',
  },
  detailText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  quotesContainer: {
    marginTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  quoteItem: {
    marginBottom: 12,
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 6,
  },
  quoteTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  quoteDetail: {
    fontSize: 12,
    color: '#555',
    marginBottom: 4,
  },
  quoteFeature: {
    fontSize: 12,
    color: '#666',
    marginLeft: 8,
  },
  visitingCardContainer: {
    marginTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 15,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  visitingCard: {
    width: '100%',
    height: 100,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#eee',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    paddingHorizontal: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: 'black',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
  },
});

export default LeadsHistory;
