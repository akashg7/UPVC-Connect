import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Animated,
  Image,
  Modal,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Calendar } from 'react-native-calendars';
import { format } from 'date-fns';
import AppText from '../../components/AppText';

const { width, height } = Dimensions.get('window');

const LeadDetails = ({ navigation }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showSlotDetails, setShowSlotDetails] = useState(false);
  const [currentSlotIndex, setCurrentSlotIndex] = useState(0);
  const [showPremiumPopup, setShowPremiumPopup] = useState(false);
  const [currentLead, setCurrentLead] = useState(null);

  // Sample data for slot occupants
  const slotOccupants = [
    {
      id: '1',
      name: 'Rajesh Kumar',
      brand: 'Veka Windows',
      image: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    {
      id: '2',
      name: 'Priya Sharma',
      brand: 'Aluplast Solutions',
      image: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
    {
      id: '3',
      name: 'Amit Patel',
      brand: 'Fenesta',
      image: 'https://randomuser.me/api/portraits/men/2.jpg',
    },
    {
      id: '4',
      name: 'Neha Gupta',
      brand: 'LG Hausys',
      image: 'https://randomuser.me/api/portraits/women/2.jpg',
    },
  ];

  const allLeads = [
    {
      id: '1',
      city: 'Mumbai',
      pincode: '400001',
      area: '10 sq ft',
      timeline: 'Within 2 weeks',
      price: '₹15,000',
      date: '2025-04-12',
      specs: 'Tinted glass, sliding mechanism',
      slotsLeft: 2,
      freeLeadsLeft: 3,
      slotOccupants: slotOccupants.slice(0, 4), // First 4 occupants for this lead
    },
    {
      id: '2',
      city: 'Delhi',
      pincode: '110001',
      area: '12 sq ft',
      timeline: 'Immediate',
      price: '₹18,000',
      specs: 'Frosted glass, foldable',
      date: '2025-01-20',
      slotsLeft: 4,
      freeLeadsLeft: 2,
      slotOccupants: slotOccupants.slice(0, 2), // First 2 occupants for this lead
    },
    {
      id: '3',
      city: 'Bangalore',
      pincode: '560001',
      area: '15 sq ft',
      timeline: 'Within 1 month',
      price: '₹20,000',
      specs: 'Clear glass, fixed frame',
      date: '2025-01-12',
      slotsLeft: 1,
      freeLeadsLeft: 5,
      slotOccupants: slotOccupants.slice(0, 5), // All 5 occupants for this lead
    },
    {
      id: '4',
      city: 'Bangalore',
      pincode: '560001',
      area: '15 sq ft',
      timeline: 'Within 1 month',
      price: '₹20,000',
      specs: 'Clear glass, fixed frame',
      date: '2025-04-14',
      slotsLeft: 1,
      freeLeadsLeft: 5,
      slotOccupants: slotOccupants.slice(0, 5), // All 5 occupants for this lead
    },
    {
      id: '5',
      city: 'Bangalore',
      pincode: '560001',
      area: '15 sq ft',
      timeline: 'Within 1 month',
      price: '₹20,000',
      specs: 'Clear glass, fixed frame',
      date: '2025-04-12',
      slotsLeft: 1,
      freeLeadsLeft: 5,
      slotOccupants: slotOccupants.slice(0, 5), // All 5 occupants for this lead
    },
    {
      id: '6',
      city: 'Bangalore',
      pincode: '560001',
      area: '15 sq ft',
      timeline: 'Within 1 month',
      price: '₹20,000',
      specs: 'Clear glass, fixed frame',
      date: '2025-04-12',
      slotsLeft: 1,
      freeLeadsLeft: 5,
      slotOccupants: slotOccupants.slice(0, 5), // All 5 occupants for this lead
    },
    {
      id: '7',
      city: 'Bangalore',
      pincode: '560001',
      area: '15 sq ft',
      timeline: 'Within 1 month',
      price: '₹20,000',
      specs: 'Clear glass, fixed frame',
      date: '2025-04-12',
      slotsLeft: 1,
      freeLeadsLeft: 5,
      slotOccupants: slotOccupants.slice(0, 5), // All 5 occupants for this lead
    },
    {
      id: '8',
      city: 'Bangalore',
      pincode: '560001',
      area: '15 sq ft',
      timeline: 'Within 1 month',
      price: '₹20,000',
      specs: 'Clear glass, fixed frame',
      date: '2025-04-12',
      slotsLeft: 1,
      freeLeadsLeft: 5,
      slotOccupants: slotOccupants.slice(0, 5), // All 5 occupants for this lead
    },
  ];

  // Filter leads based on selected date
  const filteredLeads = selectedDate
    ? allLeads.filter(lead => lead.date === selectedDate)
    : allLeads;

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    setShowCalendar(false);
  };

  const clearFilter = () => {
    setSelectedDate(null);
  };

  const scaleAnim = useState(new Animated.Value(1))[0];

  const renderSlotIndicator = (lead) => {
    const totalSlots = 6;
    const slotsLeft = lead.slotsLeft;
    const slotsTaken = totalSlots - slotsLeft;
    const slotWidth = (width - 160) / totalSlots;
    
    return (
      <View style={styles.slotContainer}>
        <View style={styles.slotHeader}>
          <AppText weight='Inter' style={styles.slotText}>{slotsLeft} SLOTS LEFT ({slotsTaken}/{totalSlots})</AppText>
          {slotsTaken > 0 && (
            <TouchableOpacity 
              style={styles.viewOccupantsButton}
              onPress={() => {
                setCurrentSlotIndex(0);
                setShowSlotDetails(true);
              }}
            >
              <AppText weight='Inter' style={styles.viewOccupantsText}>View Occupants</AppText>
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
                { width: slotWidth },
                index < slotsTaken ? styles.slotEmpty : styles.slotFilled,
                index === 0 && { borderTopLeftRadius: 4, borderBottomLeftRadius: 4 },
                index === totalSlots - 1 && { borderTopRightRadius: 4, borderBottomRightRadius: 4 },
              ]}
            />
          ))}
        </View>
      </View>
    );
  };

  const renderSlotOccupant = ({ item }) => (
    <View style={styles.occupantCard}>
      {/* <Image
        source={{ uri: item.image }}
        style={styles.occupantImage}
      /> */}
      <View style={styles.occupantInfo}>
        {/* <AppText weight='SemiBold' style={styles.occupantName}>{item.name}</AppText> */}
        <AppText weight='Bold' style={styles.occupantBrand}>{item.brand}</AppText>
      </View>
    </View>
  );

  const handleBuyLead = (lead) => {
    setCurrentLead(lead);
    setShowPremiumPopup(true);
  };

  const PremiumPopup = () => (
    <Modal
      animationType="fade"
      transparent={true}
      visible={showPremiumPopup}
      onRequestClose={() => setShowPremiumPopup(false)}
    >
      <View style={styles.popupOverlay}>
        <View style={styles.popupContainer}>
          <View style={styles.popupHeader}>
            <AppText weight='Inter' style={styles.popupTitle}>Your chance</AppText>
            <AppText weight='Inter' style={styles.popupSubtitle}>of cracking the lead increases</AppText>
            <AppText weight='Inter' style={styles.popupHighlight}>by 80% when your</AppText>
            <AppText weight='Inter' style={styles.popupSubtitle}>customer sees your work and you</AppText>
          </View>
          
          {/* <Image
            source={require('../../assets/premium-badge.png')} // Add your premium badge image
            style={styles.popupBadge}
          /> */}
          
          <View style={styles.popupButtons}>
            <TouchableOpacity 
              style={[styles.popupButton, styles.primaryButton]}
              onPress={() => {
                setShowPremiumPopup(false);
                navigation.navigate('SellerDashboard');
              }}
            >
              <Icon name="videocam" size={20} color="#fff" />
              <AppText weight='SemiBold' style={styles.popupButtonText}>Upload Video</AppText>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.popupButton, styles.secondaryButton]}
              onPress={() => {
                setShowPremiumPopup(false);
                navigation.navigate('ContactBuyer', { lead: currentLead });
              }}
            >
              <AppText weight='SemiBold' style={[styles.popupButtonText, { color: '#000' }]}>Skip for now</AppText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* <View style={styles.header}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.logo}
          />
          <View style={styles.titleHead}>
            <Animated.View style={[styles.serialBadge, { transform: [{ scale: scaleAnim }] }]}>
                <AppText style={styles.serialBadgeText}>{6}</AppText>
              </Animated.View>
          <AppText weight='Regular' style={styles.tagline}>
            Only 6 window fabricants can buy the lead on first come first served basis</AppText>
          </View>
          <View style={styles.titleHead}>
          <Animated.View style={[styles.serialBadge, { transform: [{ scale: scaleAnim }] }]}>
              <AppText style={styles.serialBadgeText}>{2}</AppText>
            </Animated.View>
          <AppText weight='Regular' style={styles.tagline}>2 Only 2 fabricators of 1 listed brand allowed in 1 city</AppText>
          </View> 
          <Text style={styles.subheader}>High-intent buyers in your network</Text>
          
          
          <View style={styles.filterContainer}>
            <TouchableOpacity
              style={styles.filterButton}
              onPress={toggleCalendar}
            >
              <Icon name="filter-list" size={20} color="#000" />
              <AppText weight='Inter' style={styles.filterButtonText}>
                {selectedDate ? format(new Date(selectedDate), 'dd MMM yyyy') : 'Filter by Date'}
              </AppText>
            </TouchableOpacity>
            
            {selectedDate && (
              <TouchableOpacity
                style={styles.clearFilterButton}
                onPress={clearFilter}
              >
                <AppText weight='Inter' style={styles.clearFilterText}>Clear</AppText>
              </TouchableOpacity>
            )}
          </View>
        </View> */}
        <View style={styles.header}>
  {/* Logo */}
  <Image
    source={require('../../assets/logo.png')}
    style={styles.logo}
  />
  
  {/* Header Content */}
  <View style={styles.headerContent}>
    {/* First Rule */}
    <View style={styles.ruleContainer}>
      <Animated.View style={[styles.serialBadge, { transform: [{ scale: scaleAnim }] }]}>
        <Text weight='SemiBold' style={styles.serialBadgeText}>6</Text>
      </Animated.View>
      <AppText weight='Regular' style={styles.tagline}>
        Only 6 window fabricants can buy the lead on first come first served basis
      </AppText>
    </View>
    
    {/* Second Rule */}
    <View style={styles.ruleContainer}>
      <Animated.View style={[styles.serialBadge, { transform: [{ scale: scaleAnim }] }]}>
        <Text weight='SemiBold' style={styles.serialBadgeText}>2</Text>
      </Animated.View>
      <AppText weight='Regular' style={styles.tagline}>
        Only 2 fabricators of 1 listed brand allowed in 1 city
      </AppText>
    </View>
    
    {/* Subheader */}
    <AppText weight='Regular' style={styles.subheader}>High-intent buyers in your network</AppText>
    
    {/* Filter Controls */}
    <View style={styles.filterContainer}>
      <TouchableOpacity
        style={styles.filterButton}
        onPress={toggleCalendar}
      >
        <Icon name="filter-list" size={20} color="#000" />
        <AppText weight='Regular' style={styles.filterButtonText}>
          {selectedDate ? format(new Date(selectedDate), 'dd MMM yyyy') : 'Filter by Date'}
        </AppText>
      </TouchableOpacity>
      
      {selectedDate && (
        <TouchableOpacity
          style={styles.clearFilterButton}
          onPress={clearFilter}
        >
          <AppText weight='Regular' style={styles.clearFilterText}>Clear</AppText>
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
                [selectedDate]: {selected: true, selectedColor: '#000'}
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
          filteredLeads.map((lead) => (
            <Animated.View 
              key={lead.id} 
              style={[styles.card, styles.cardElevation]}
              entering={Animated.spring(
                new Animated.Value(0),
                {
                  toValue: 1,
                  friction: 6,
                  useNativeDriver: true,
                }
              )}
            >
              {/* Lead Basic Info */}
              <View style={styles.cardHeader}>
                <View style={styles.locationTag}>
                  <Icon name="location-on" size={16} color="#000" />
                  <AppText weight='Regular' style={styles.locationText}>{lead.city} • {lead.pincode}</AppText>
                </View>
                <View style={styles.locationTag}>
                  <Icon name="date-range" size={16} color="#000" />
                  <AppText weight='Regular' style={styles.locationText}>
                    {format(new Date(lead.date), 'dd/MM/yy')}
                  </AppText>
                </View>
              </View>

              {/* Lead Details */}
              <View style={styles.detailsGrid}>
                <View style={styles.detailItem}>
                  <AppText weight='Regular' style={styles.detailLabel}>AREA</AppText>
                  <AppText weight='Regular' style={styles.detailValue}>{lead.area}</AppText>
                </View>
                
                <View style={styles.detailItem}>
                  <AppText weight='Regular' style={styles.detailLabel}>TIMELINE</AppText>
                  <AppText weight='Regular' style={styles.detailValue}>{lead.timeline}</AppText>
                </View>

                <View style={styles.detailItem}>
                  <AppText weight='Regular' style={styles.detailLabel}>SPECS</AppText>
                  <AppText weight='Regular' style={styles.detailValue}>{lead.specs}</AppText>
                </View>
              </View>

              {/* Slot Indicator */}
              {renderSlotIndicator(lead)}

              {/* Price & CTA */}
              <View style={styles.priceContainer}>
                <View>
                  <AppText weight='Regular' style={styles.priceLabel}>LEAD PRICE</AppText> 
                  <AppText weight='Regular' style={styles.priceValue}>₹350 + Tax</AppText>
                </View>
                
                <TouchableOpacity
                  style={styles.buyButton}
                  onPress={() => handleBuyLead(lead)}
                >
                  <AppText weight='SemiBold' style={styles.buyButtonText}>Buy Lead</AppText>
                  <Icon name="arrow-forward" size={18} color="#fff" />
                </TouchableOpacity>
              </View>
            </Animated.View>
          ))
        ) : (
          <View style={styles.noResultsContainer}>
            <Icon name="info-outline" size={30} color="#666" />
            <AppText weight='SemiBold' style={styles.noResultsText}>No leads found for selected date</AppText>
            <TouchableOpacity onPress={clearFilter}>
              <AppText weight='Regular' style={styles.clearFilterLink}>Clear filter</AppText>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Slot Occupants Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showSlotDetails}
        onRequestClose={() => setShowSlotDetails(false)}
      >
        <View style={styles.occupantsOverlay}>
          <View style={styles.occupantsContainer}>
            <View style={styles.occupantsHeader}>
              <AppText weight='SemiBold' style={styles.occupantsTitle}>Slot Occupants ({allLeads[0]?.slotOccupants.length}/6)</AppText>
              <TouchableOpacity onPress={() => setShowSlotDetails(false)}>
                <Icon name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={allLeads[0]?.slotOccupants || []} // Using first lead's occupants for demo
              renderItem={renderSlotOccupant}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.occupantsList}
            />
             
          </View>
        </View>
      </Modal>

      {/* Premium Popup */}
      <PremiumPopup />
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
  header: {
    marginBottom: 25,
    paddingHorizontal: 5,
  },
  titleHead:{
    flexDirection:"row",
    alignItems:"center",
    // paddingHorizontal:15,

  },
  logo: {
    alignSelf: 'center',
    width: 100, 
    height: 100,  
    resizeMode: 'contain', 
  },
  tagline: {
  fontSize: 14,
  color: '#000',
  flex: 1,
  lineHeight: 20,
   paddingHorizontal:12
  },
serialBadge: {
  backgroundColor: '#000',
  width: 24,
  height: 24,
  borderRadius: 12,
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: 10,
  marginBottom: 10,
},
serialBadgeText: {
  color: '#fff',
  // fontWeight: 'bold',
  fontSize: 18,
},
  headline: {
    fontSize: 26,
    // fontWeight: '800',
    color: '#000',
    marginBottom: 4,
    letterSpacing: 1,
  },
  subheader: {
    fontSize: 15,
    color: '#555',
    // fontWeight: '500',
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
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
  },
  filterButtonText: {
    fontSize: 14,
    // fontWeight: '600',
    color: '#000',
    marginLeft: 8,
  },
  clearFilterButton: {
    padding: 10,
  },
  clearFilterText: {
    fontSize: 14,
    // fontWeight: '600',
    color: '#000',
    textDecorationLine: 'underline',
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  cardHeader: {
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between'
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
    // fontWeight: '600',
    color: '#000',
    marginLeft: 5,
  },
  slotContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  slotText: {
    fontSize: 12,
    // fontWeight: '700',
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
    // fontWeight: '800',
    color: '#666',
    marginBottom: 4,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  detailValue: {
    fontSize: 16,
    // fontWeight: '600',
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
    // fontWeight: '800',
    color: '#666',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  priceValue: {
    fontSize: 20,
    // fontWeight: '700',
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 15,
    // fontWeight: '600',
    marginRight: 6,
    letterSpacing: 0.3,
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
    // fontWeight: '600',
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
    // fontWeight: '600',
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
    // fontWeight: '800',
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
  occupantImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  occupantInfo: {
    flex: 1,
  },
  occupantName: {
    fontSize: 16,
    // fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  occupantBrand: {
    fontSize: 14,
    color: '#666',
  },
  occupantsNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  navButton: {
    padding: 10,
  },
  occupantsCount: {
    fontSize: 14,
    // fontWeight: '600',
    color: '#000',
  },
  popupOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    width: width * 0.85,
    padding: 25,
    alignItems: 'center',
  },
  popupHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  popupTitle: {
    fontSize: 28,
    // fontWeight: '800',
    color: '#000',
    marginBottom: 5,
  },
  popupSubtitle: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
  },
  popupHighlight: {
    fontSize: 22,
    // fontWeight: '800',
    color: '#000',
    marginVertical: 10,
  },
  popupBadge: {
    width: 100,
    height: 100,
    marginVertical: 20,
  },
  popupButtons: {
    width: '100%',
    marginTop: 20,
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
    fontSize: 16,
    // fontWeight: '600',
    color: '#fff',
    marginLeft: 10,
  },
  header: {
  marginBottom: 25,
  paddingHorizontal: 5,
},
headerContent: {
  marginTop: 10,
},
logo: {
  alignSelf: 'center',
  width: 100, 
  height: 100,  
  resizeMode: 'contain',
},
ruleContainer: {
  flexDirection: 'row',
  alignItems: 'flex-start',
  marginBottom: 12,
},
serialBadge: {
  backgroundColor: '#000',
  width: 24,
  height: 24,
  borderRadius: 12,
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: 10,
  marginTop: 2, // Adjust for better alignment with text
},
serialBadgeText: {
  color: '#fff',
  fontWeight: 'bold',
  fontSize: 14,
},
tagline: {
  fontSize: 14,
  color: '#000',
  flex: 1,
  lineHeight: 20,
},
subheader: {
  fontSize: 16,
  color: '#555',
  marginTop: 8,
  marginBottom: 15,
  fontWeight: '500',
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
  fontWeight: '500',
},
clearFilterButton: {
  padding: 10,
},
clearFilterText: {
  fontSize: 14,
  color: '#000',
  fontWeight: '500',
  textDecorationLine: 'underline',
},
});


export default LeadDetails;