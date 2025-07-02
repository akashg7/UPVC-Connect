import React, {useState, useEffect} from 'react';
import {
  View, 
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Animated,
  Image,
  Modal,
  FlatList,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Calendar} from 'react-native-calendars';
import {format} from 'date-fns';
import AppText from '../../components/AppText';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const {width, height} = Dimensions.get('window');

const LeadDetails = ({navigation}) => {
  const insets = useSafeAreaInsets();

  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showSlotDetails, setShowSlotDetails] = useState(false);
  const [currentSlotIndex, setCurrentSlotIndex] = useState(0);
  const [showPremiumPopup, setShowPremiumPopup] = useState(false);
  const [currentLead, setCurrentLead] = useState(null);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showSlotModal, setShowSlotModal] = useState(false);
  const [maxSlots, setMaxSlots] = useState(6); 

  const fetchLeads = async () => {
    try {
      const response = await axios.get('https://upvc-backend.onrender.com/api/seller/lead');
      if (response.data.success) {
        const formattedLeads = response.data.leads.map(lead => ({
          id: lead._id,
          city: lead.projectInfo.address,
          pincode: lead.projectInfo.pincode,
          area: `${lead.totalSqft} sq ft`,
          timeline: lead.projectInfo.timeline,
          price: `₹${Math.round(lead.pricePerSqft * lead.totalSqft)}`,
          date: format(new Date(lead.createdAt), 'yyyy-MM-dd'),
          specs: lead.quotes.map(q => q.product.title).join(', '),
          slotsLeft: lead.availableSlots,
          freeLeadsLeft: 3, // Keeping this as in original
          slotOccupants: lead?.seller?.map(s => ({ 
            id: s.sellerId?._id,
            name: s.sellerId?.name,
            brand: s.sellerId?.brandOfProfileUsed
          })),
          rawData: lead,
        }));
        setLeads(formattedLeads);
      }
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // Filter leads based on selected date
  const filteredLeads = selectedDate
    ? leads.filter(lead => lead.date === selectedDate)
    : leads;

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const handleDayPress = day => {
    setSelectedDate(day.dateString);
    setShowCalendar(false);
  };

  const clearFilter = () => {
    setSelectedDate(null);
  };
 
  const renderSlotIndicator = lead => { 
    const totalSlots = 6;
    const slotsLeft = lead.slotsLeft;
    const slotsTaken = totalSlots - slotsLeft;
    const slotWidth = (width - 160) / totalSlots;

    return (
      <View style={styles.slotContainer}>
        <View style={styles.slotHeader}>
          <AppText weight="Inter" style={styles.slotText}>
            {slotsLeft} SLOTS LEFT ({slotsTaken}/{totalSlots})
          </AppText>
          {slotsTaken > 0 && (
            <TouchableOpacity
              style={styles.viewOccupantsButton}
              onPress={() => {
                setCurrentLead(lead);
                setCurrentSlotIndex(0);
                setShowSlotDetails(true);
              }}>
              <AppText weight="Inter" style={styles.viewOccupantsText}>
                View Occupants
              </AppText>
              <Icon name="chevron-right" size={16} color="#000" />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.slotBar}>
          {[...Array(totalSlots)].map((_, index) => (
            <View
              key={index}
              style={[
                styles.slot,
                {width: slotWidth},
                index < slotsTaken ? styles.slotEmpty : styles.slotFilled,
                index === 0 && {
                  borderTopLeftRadius: 4,
                  borderBottomLeftRadius: 4,
                },
                index === totalSlots - 1 && {
                  borderTopRightRadius: 4,
                  borderBottomRightRadius: 4,
                },
              ]}
            />
          ))}
        </View>
      </View>
    );
  };

  const renderSlotOccupant = ({item}) => (
    <View style={styles.occupantCard}> 
      <View style={styles.occupantInfo}> 
        <AppText weight="Inter" style={styles.occupantBrand}>
          {item.brand}
        </AppText>
      </View>
    </View>
  );

  const checkExistingVideo = async () => {
    try {
      const token = await AsyncStorage.getItem('sellerToken');
      if (!token) return;
      console.log("token : " , token)
      const response = await axios.get('https://upvc-backend.onrender.com/api/sellers', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }); 
      if (response.data.success && response.data.seller.businessProfileVideo) {
        return true
      } else{
        return false
      }
    } catch (error) {
      console.error('Error checking existing video:', error);
    }
  };

  // const handleBuyLead = lead => {
  //   setCurrentLead(lead);
  //   if (!checkExistingVideo()){
  //     setShowPremiumPopup(true);
  //   }else{
  //     navigation.navigate('ContactBuyer', {lead: currentLead})
  //   }
  // };

  const handleBuyLead = async (lead) => {
    const token = await AsyncStorage.getItem('sellerToken');
      if (!token) {
        Alert.alert('Please Login');
        return;
      }
    setCurrentLead(lead);
    setMaxSlots(lead.slotsLeft)
    const hasVideo = await checkExistingVideo();

    if (!hasVideo) {
      setShowPremiumPopup(true);
    } else {
      setMaxSlots(lead.slotsLeft);
      setShowSlotModal(true);
    }
  };

  const handlePurchaseLead = async (slotsToBuy) => {
    try {
      const token = await AsyncStorage.getItem('sellerToken');
      if (!token || !currentLead) return; 
      const response = await axios.post(
        'https://upvc-backend.onrender.com/api/seller/lead/purchase',
        {
          leadId: currentLead.rawData._id, 
          slotsToBuy
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        setShowSlotModal(false);
        fetchLeads();
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Success',
          text2: response.data.message || 'OTP verified successfully',
        });
        navigation.navigate('ContactBuyer', {lead: currentLead});
      } else {
        Toast.show({
          type: 'error',
          text1: 'Purchase failed',
          text2: response.data.message
        });
      }
    } catch (error) {
      console.error('Error purchasing lead:', error);
      Toast.show({
        type: 'error',
        text1: 'Purchase failed',
        text2: error?.response?.data?.message || error.message
      });
    }
  };

  const PremiumPopup = () => (
    <Modal
      animationType="fade"
      transparent={true}
      visible={showPremiumPopup}
      onRequestClose={() => setShowPremiumPopup(false)}>
      <View style={styles.popupOverlay2}>
        <View style={styles.popupContainer}>
          <View style={styles.popupHeader}>
            <AppText weight="Inter" style={styles.popupTitle}>
              Your chance
            </AppText>
            <AppText weight="Inter" style={styles.popupSubtitle}>
              of cracking the lead increases
            </AppText>
            <AppText weight="Inter" style={styles.popupHighlight}>
              by 80% when your
            </AppText>
            <AppText weight="Inter" style={styles.popupSubtitle}>
              customer sees your work and you
            </AppText>
          </View>
 
          <View style={styles.popupButtons}>
            <TouchableOpacity
              style={[styles.popupButton, styles.primaryButton]}
              onPress={() => {
                setShowPremiumPopup(false);
                navigation.navigate('SellerDashboard');
              }}>
              <Icon name="videocam" size={20} color="#fff" />
              <AppText weight="Inter" style={styles.popupButtonText}>
                Upload Video
              </AppText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.popupButton, styles.secondaryButton]}
              onPress={() => {
                setShowPremiumPopup(false);
                // setMaxSlots(lead.slotsLeft);
                setShowSlotModal(true) 
                // navigation.navigate('ContactBuyer', {lead: currentLead});
              }}>
              <AppText
                weight="Inter"
                style={[styles.popupButtonText, {color: '#000'}]}>
                Skip for now
              </AppText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <AppText>Loading leads...</AppText>
      </View>
    );
  }
  // console.log("currentLead?.slotOccupants : " , currentLead?.slotOccupants)
  return (
    <View style={{paddingTop: insets.top, flex: 1, backgroundColor: 'white'}}>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Image
              source={require('../../assets/logo.png')}
              style={styles.logo}
            />

            <View style={styles.headerContent}>
              <AppText weight="Inter" style={styles.subheader}>
                High-intent buyers in your network
              </AppText>

              {/* Filter Controls */}
              <View style={styles.filterContainer}>
                <TouchableOpacity
                  style={styles.filterButton}
                  onPress={toggleCalendar}>
                  <Icon name="filter-list" size={20} color="#000" />
                  <AppText weight="Inter" style={styles.filterButtonText}>
                    {selectedDate
                      ? format(new Date(selectedDate), 'dd MMM yyyy')
                      : 'Filter by Date'}
                  </AppText>
                </TouchableOpacity>

                {selectedDate && (
                  <TouchableOpacity
                    style={styles.clearFilterButton}
                    onPress={clearFilter}>
                    <AppText weight="Inter" style={styles.clearFilterText}>
                      Clear
                    </AppText>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>

          {/* Calendar Dropdown */}
          {showCalendar && (
            <View style={styles.calendarContainer}>
              <Calendar
                onDayPress={handleDayPress}
                markedDates={{
                  [selectedDate]: {selected: true, selectedColor: '#000'},
                }}
                theme={{
                  backgroundColor: '#ffffff',
                  calendarBackground: '#ffffff',
                  textSectionTitleColor: '#000',
                  selectedDayBackgroundColor: '#000',
                  selectedDayTextColor: '#ffffff',
                  todayTextColor: '#000',
                  dayTextColor: '#000',
                  textDisabledColor: '#d9d9d9',
                  dotColor: '#000',
                  selectedDotColor: '#ffffff',
                  arrowColor: '#000',
                  monthTextColor: '#000',
                  indicatorColor: '#000',
                  textDayFontWeight: '500',
                  textMonthFontWeight: '600',
                  textDayHeaderFontWeight: '600',
                  textDayFontSize: 14,
                  textMonthFontSize: 16,
                  textDayHeaderFontSize: 12,
                }}
              />
            </View>
          )}

          {/* Leads List */}
          {filteredLeads.length > 0 ? (
            filteredLeads.map(lead => (
              <Animated.View
                key={lead.id}
                style={[styles.card, styles.cardElevation]}
                entering={Animated.spring(new Animated.Value(0), {
                  toValue: 1,
                  friction: 6,
                  useNativeDriver: true,
                })}>
                {/* Lead Basic Info */}
                <View style={styles.cardHeader}>
                  <View style={styles.locationTag}>
                    <Icon name="location-on" size={16} color="#000" />
                    <AppText weight="Inter" style={styles.locationText}>
                      {lead.city} • {lead.pincode}
                    </AppText>
                  </View>
                  <View style={styles.locationTag}>
                    <Icon name="date-range" size={16} color="#000" />
                    <AppText weight="Inter" style={styles.locationText}>
                      {format(new Date(lead.date), 'dd/MM/yy')}
                    </AppText>
                  </View>
                </View>

                {/* Lead Details */}
                <View style={styles.detailsGrid}>
                  <View style={styles.detailItem}>
                    <AppText weight="Inter" style={styles.detailLabel}>
                      AREA
                    </AppText>
                    <AppText weight="Inter" style={styles.detailValue}>
                      {lead.area}
                    </AppText>
                  </View>

                  <View style={styles.detailItem}>
                    <AppText weight="Inter" style={styles.detailLabel}>
                      TIMELINE
                    </AppText>
                    <AppText weight="Inter" style={styles.detailValue}>
                      {lead.timeline}
                    </AppText>
                  </View>

                  <View style={styles.detailItem}>
                    <AppText weight="Inter" style={styles.detailLabel}>
                      SPECS
                    </AppText>
                    <AppText weight="Inter" style={styles.detailValue}>
                      {lead.specs}
                    </AppText>
                  </View>
                </View>

                {/* Slot Indicator */}
                {renderSlotIndicator(lead)}

                {/* Price & CTA */}
                <View style={styles.priceContainer}>
                  <View>
                    <AppText weight="Inter" style={styles.priceLabel}>
                      LEAD PRICE
                    </AppText>
                    <AppText weight="Inter" style={styles.priceValue}>
                      {lead.price}
                    </AppText>
                  </View>

                  <TouchableOpacity
                    style={styles.buyButton}
                    onPress={() => handleBuyLead(lead)}>
                    <AppText weight="Inter" style={styles.buyButtonText}>
                       BUY LEAD
                    </AppText>
                    <Icon name="arrow-forward" size={18} color="#fff" />
                  </TouchableOpacity>
                </View>
              </Animated.View>
            ))
          ) : (
            <View style={styles.noResultsContainer}>
              <Icon name="info-outline" size={30} color="#666" />
              <AppText weight="Inter" style={styles.noResultsText}>
                No leads found for selected date
              </AppText>
              <TouchableOpacity onPress={clearFilter}>
                <AppText weight="Inter" style={styles.clearFilterLink}>
                  Clear filter
                </AppText>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>

        {/* Slot Occupants Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={showSlotDetails}
          onRequestClose={() => setShowSlotDetails(false)}>
          <View style={styles.occupantsOverlay}>
            <View style={styles.occupantsContainer}>
              <View style={styles.occupantsHeader}>
                <AppText weight="Inter" style={styles.occupantsTitle}>
                  Slot Occupants ({currentLead?.slotOccupants?.length || 0}/6)
                </AppText>
                <TouchableOpacity onPress={() => setShowSlotDetails(false)}>
                  <Icon name="close" size={24} color="#000" />
                </TouchableOpacity>
              </View>

              <FlatList
                data={currentLead?.slotOccupants || []}
                renderItem={renderSlotOccupant}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.occupantsList}
              />
            </View>
          </View>
        </Modal>

          {/* Buy different solts */}
          <Modal
            animationType="fade"
            transparent={true}
            visible={showSlotModal}
            onRequestClose={() => setShowSlotModal(false)}
          >
            <View style={styles.popupOverlay}>
              <View style={styles.popupContainer}>
                <View style={styles.popupContainer2}>
                  <AppText weight='Inter' style={styles.popupTitle}>Select Slot(s)</AppText>
                  <TouchableOpacity onPress={() => setShowSlotModal(false)}>
                    <Icon name="close" size={24} color="#000" />
                  </TouchableOpacity>
                </View>
                <AppText weight='Inter' style={styles.popupSubtitle}>Choose how many slots you want to buy:</AppText>
                
                {[1, 2, 3, 4, 5, 6].map(num => {
                  const price = 1042 * num;
                  const disabled = num > currentLead?.slotsLeft;
                  const isRefundable = num === 6;
                  return (
                    <TouchableOpacity
                      key={num}
                      disabled={disabled}
                      style={[
                        styles.slotOption,
                        disabled ? {opacity: 0.4} : {},
                      ]}
                      onPress={() => handlePurchaseLead(num)}
                    >
                      <AppText weight='Inter' style={styles.slotOptionText}>
                        {num} slot - ₹{price}{isRefundable ? ' (Refundable)' : ''}
                      </AppText>
                      <AppText weight='SemiBold' style={styles.buyNowText}>BUY NOW</AppText>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </Modal>

        {/* Premium Popup */}
        <PremiumPopup />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  }, 
  calendarContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    overflow: 'hidden',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    position: 'relative',
  },
  cardElevation: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  cardHeader: {
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  locationTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  locationText: {
    fontSize: 14, 
    color: '#000',
    marginLeft: 5,
  },
  slotContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  slotText: {
    fontSize: 12, 
    color: '#555',
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  slotBar: {
    flexDirection: 'row',
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    width: '100%',
  },
  slot: {
    height: '100%',
    marginRight: 2,
  },
  slotEmpty: {
    backgroundColor: '#000',
  },
  slotFilled: {
    backgroundColor: '#e0e0e0',
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  detailItem: {
    width: '48%',
    marginBottom: 15,
  },
  detailLabel: {
    fontSize: 11, 
    color: '#666',
    marginBottom: 4,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  detailValue: {
    fontSize: 16, 
    color: '#000',
    lineHeight: 22,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  priceLabel: {
    fontSize: 11, 
    color: '#666',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  priceValue: {
    fontSize: 20, 
    color: '#000',
    marginTop: 2,
  },
  buyButton: {
    backgroundColor: '#000',
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 13, 
    marginRight: 6,
    letterSpacing: 2,
  },
  noResultsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  noResultsText: {
    fontSize: 16,
    color: '#666',
    marginTop: 15,
    marginBottom: 20,
    textAlign: 'center',
  },
  clearFilterLink: {
    fontSize: 14,
    color: '#000', 
    textDecorationLine: 'underline',
  },
  slotHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  viewOccupantsButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewOccupantsText: {
    fontSize: 12, 
    color: '#000',
    marginRight: 4,
  },
  occupantsOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  occupantsContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    width: width * 0.9,
    maxHeight: height * 0.7,
    padding: 20,
  },
  occupantsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  occupantsTitle: {
    fontSize: 20, 
    color: '#000',
  },
  occupantsList: {
    paddingBottom: 20,
  },
  occupantCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    marginBottom: 12,
  }, 
  occupantInfo: {
    flex: 1,
  }, 
  occupantBrand: {
    fontSize: 14,
    color: '#666',
  },  
  popupOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupOverlay2: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center', 
  },
  popupContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    width: width *0.9,
    padding: 25, 
  },
  popupContainer2: {
    // backgroundColor: '#fff',
    // borderRadius: 20,
    // width: width * 0.85,
    // padding: 25,
    alignItems: 'center',
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center"
  },
  popupHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  popupTitle: {
    fontSize: 20, 
    color: '#000',
    marginBottom: 5,
  },
  popupSubtitle: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
  },
  popupHighlight: {
    fontSize: 20,  
    color: '#000',
    marginVertical: 10,
  }, 
  popupButtons: {
    width: '100%',
    marginTop: 20,
    flexDirection:"column",
    alignItems:"center",
    justifyContent:"center"
  },
  popupButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  primaryButton: {
    backgroundColor: '#000',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#000',
  },
  popupButtonText: {
    fontSize: 14, 
    color: '#fff',
    marginLeft: 10,
  },
  header: {
    marginBottom: 25,
    paddingHorizontal: 5,
  }, 
  logo: {
    alignSelf: 'center',
    width: 100,
    height: 30, 
  },   
  subheader: {
    fontSize: 16,
    color: '#555',
    marginTop: 8,
    marginBottom: 15, 
    textAlign: 'center',
    color: 'black',
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    flex: 1,
    marginRight: 10,
  },
  filterButtonText: {
    fontSize: 14,
    color: '#000',
    marginLeft: 8, 
  },
  clearFilterButton: {
    padding: 10,
  },
  clearFilterText: {
    fontSize: 14,
    color: '#000', 
    textDecorationLine: 'underline',
  },
  slotOption: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 12,
    marginVertical: 8,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff', 
  },
  slotOptionText: {
    color: '#000',
    fontSize: 16, 
  },
  buyNowText: {
    color: '#000',
  }
});

export default LeadDetails;
