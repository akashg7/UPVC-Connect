import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  Platform,
  Animated
} from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AppText from '../../../components/AppText';

const { width, height } = Dimensions.get('window');
 
// Dummy data for leads
const leadsData = [
  {
    id: '1',
    date: '2023-06-15',
    projectAddress: '123 Premium Towers, Mumbai',
    category: 'ELITE CREST',
    sellers: [
      {
        id: 's1',
        brandName: 'Veka',
        video: 'https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-1173-large.mp4',
        name: 'Rajesh Kumar',
        contactNo: '+91 9876543210',
        whatsapp: '+91 9876543210',
        address: 'Veka India HQ, Sector 18, Gurugram',
        yearsInBusiness: '12',
        manuCap: '5000 units/month',
        teamSize: '150',
        visitingCard: 'https://via.placeholder.com/150x90.png?text=Veka+Card',
      },
      {
        id: 's2',
        brandName: 'Aluplast',
        video: 'https://assets.mixkit.co/videos/preview/mixkit-clouds-and-blue-sky-1170-large.mp4',
        name: 'Priya Sharma',
        contactNo: '+91 8765432109',
        whatsapp: '+91 8765432109',
        address: 'Aluplast India, Whitefield, Bangalore',
        yearsInBusiness: '8',
        manuCap: '3500 units/month',
        teamSize: '90',
        visitingCard: 'https://via.placeholder.com/150x90.png?text=Aluplast+Card',
      },
    ],
  },
  {
    id: '2',
    date: '2023-06-10',
    projectAddress: '456 Luxury Apartments, Delhi',
    category: 'LUXE FRAME',
    sellers: [
      {
        id: 's3',
        brandName: 'Fenesta',
        video: 'https://assets.mixkit.co/videos/preview/mixkit-woman-walking-on-a-path-in-a-forest-1226-large.mp4',
        name: 'Amit Patel',
        contactNo: '+91 7654321098',
        whatsapp: '+91 7654321098',
        address: 'Fenesta Windows, Okhla Industrial Area, Delhi',
        yearsInBusiness: '15',
        manuCap: '6000 units/month',
        teamSize: '200',
        visitingCard: 'https://via.placeholder.com/150x90.png?text=Fenesta+Card',
      },
    ],
  },
  {
    id: '3',
    date: '2023-06-05',
    projectAddress: '789 Green Valley, Pune',
    category: 'CORE VANTAGE',
    sellers: [
      {
        id: 's4',
        brandName: 'LG Hausys',
        video: 'https://assets.mixkit.co/videos/preview/mixkit-clouds-and-blue-sky-1170-large.mp4',
        name: 'Neha Gupta',
        contactNo: '+91 6543210987',
        whatsapp: '+91 6543210987',
        address: 'LG Hausys India, Hinjewadi, Pune',
        yearsInBusiness: '10',
        manuCap: '4500 units/month',
        teamSize: '120',
        visitingCard: 'https://via.placeholder.com/150x90.png?text=LG+Hausys+Card',
      },
    ],
  },
];

const LeadsHistory = () => {
  const [expandedLead, setExpandedLead] = useState(null);
  const [activeSellerIndices, setActiveSellerIndices] = useState({});
  const flatListRefs = useRef({});
  const scrollX = useRef(new Animated.Value(0)).current;

  const toggleLead = (leadId) => {
    setExpandedLead(expandedLead === leadId ? null : leadId);
    if (!activeSellerIndices[leadId]) {
      setActiveSellerIndices(prev => ({ ...prev, [leadId]: 0 }));
    }
  };

  const onSellerScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } }}],
    { useNativeDriver: false }
  );

  const renderSellerItem = ({ item, leadId }) => (
    <View style={styles.sellerCard}>
      <View style={styles.sellerHeader}>
        <AppText weight='SemiBold' style={styles.brandName}>{item.brandName}</AppText>
        {/* <View style={styles.premiumBadge}>
          <Text style={styles.premiumBadgeText}>PREMIUM</Text>
        </View> */}
      </View>
      
      <View style={styles.videoContainer}>
        <Video
          source={{ uri: item.video }}
          style={styles.video}
          resizeMode="cover"
          repeat
          muted
          paused={false}
          controls={false}
        />
        <View style={styles.videoOverlay} />
      </View>
      
      <View style={styles.sellerDetails}>
        <DetailRow icon="person" text={item.name} />
        <DetailRow icon="phone" text={item.contactNo} />
        <DetailRow icon="chat" text={item.whatsapp} />
        <DetailRow icon="location-on" text={item.address} />
        <DetailRow icon="business" text={`${item.yearsInBusiness} years in business`} />
        <DetailRow icon="build" text={`Capacity: ${item.manuCap}`} />
        <DetailRow icon="people" text={`Team: ${item.teamSize}`} />
        
        <View style={styles.visitingCardContainer}>
          <AppText weight='SemiBold' style={styles.detailLabel}>Visiting Card</AppText>
          <Image 
            source={{ uri: "https://img.freepik.com/free-vector/royal-golden-premium-business-card-design_1017-32848.jpg" }} 
            style={styles.visitingCard} 
            resizeMode="contain"
          />
        </View>
      </View>
    </View>
  );

  const renderLeadCard = ({ item }) => {
    const currentSellerIndex = activeSellerIndices[item.id] || 0;
    const hasMultipleSellers = item.sellers.length > 1;

    return (
      <View style={styles.leadCard}>
        <TouchableOpacity 
          onPress={() => toggleLead(item.id)}
          activeOpacity={0.9}
        >
          <View style={styles.leadHeader}>
            <View style={styles.leadHeaderContent}>
              <AppText weight='Inter' style={styles.leadDate}>{item.date}</AppText>
              <AppText weight='Inter' style={styles.leadAddress}>{item.projectAddress}</AppText>
              <AppText weight='Inter' style={styles.leadCategory}>{item.category}</AppText>
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
            <Animated.FlatList
              ref={(ref) => (flatListRefs.current[item.id] = ref)}
              data={item.sellers}
              renderItem={({ item: seller }) => renderSellerItem({ item: seller, leadId: item.id })}
              keyExtractor={(seller) => seller.id}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              scrollEventThrottle={16}
              onScroll={onSellerScroll}
              onMomentumScrollEnd={(e) => {
                const newIndex = Math.round(e.nativeEvent.contentOffset.x / (width - 40));
                setActiveSellerIndices(prev => ({ ...prev, [item.id]: newIndex }));
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
                        { transform: [{ scale }], opacity }
                      ]}
                    />
                  );
                })}
              </View>
            )}
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/logo.png')}
        style={styles.logo}
      />
      
      <FlatList
        data={leadsData}
        renderItem={renderLeadCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const DetailRow = ({ icon, text }) => (
  <View style={styles.detailRow}>
    <Icon name={icon} size={18} color="#555" style={styles.detailIcon} />
    <AppText weight='Inter' style={styles.detailText}>{text}</AppText>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  logo: {
    marginTop: 20,
    marginBottom: 10,
    alignSelf: 'center',
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 30,
    paddingTop: 20,
  },
  leadCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 5,
  },
  leadHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
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
    // fontWeight: '500',
    // fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  leadAddress: {
    fontSize: 16,
    color: '#000',
    // fontWeight: '600',
    marginBottom: 4,
    // fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  leadCategory: {
    fontSize: 14,
    color: 'black',
    // fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    // fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
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
    fontSize: 20,
    // fontWeight: '700',
    color: '#000',
    letterSpacing: 0.5,
    // fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  premiumBadge: {
    backgroundColor: '#ffd700',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  premiumBadgeText: {
    fontSize: 12,
    // fontWeight: '800',
    color: '#000',
    letterSpacing: 0.5,
  },
  videoContainer: {
    width: '100%',
    height: width * 0.6,
    borderRadius: 12,
    marginBottom: 20,
    backgroundColor: '#000',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    overflow: 'hidden',
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
    marginBottom: 12,
    paddingHorizontal: 5,
  },
  detailIcon: {
    marginRight: 12,
    width: 24,
    textAlign: 'center',
    color: 'black',
  },
  detailText: {
    fontSize: 15,
    color: '#333',
    flex: 1,
    // fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  visitingCardContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 15,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    // fontWeight: '500',
    // fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  visitingCard: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
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
});

export default LeadsHistory;


  // const handleSellerSwipe = (event, leadId) => {
  //   if (event.nativeEvent.state === State.END) {
  //     const { translationX } = event.nativeEvent;
  //     const currentIndex = activeSellerIndices[leadId] || 0;
  //     const lead = leadsData.find(l => l.id === leadId);
      
  //     if (translationX > 50 && currentIndex > 0) {
  //       const newIndex = currentIndex - 1;
  //       flatListRefs.current[leadId]?.scrollToIndex({ index: newIndex, animated: true });
  //       setActiveSellerIndices(prev => ({ ...prev, [leadId]: newIndex }));
  //     } else if (translationX < -50 && currentIndex < lead.sellers.length - 1) {
  //       const newIndex = currentIndex + 1;
  //       flatListRefs.current[leadId]?.scrollToIndex({ index: newIndex, animated: true });
  //       setActiveSellerIndices(prev => ({ ...prev, [leadId]: newIndex }));
  //     }
  //   }
  // };