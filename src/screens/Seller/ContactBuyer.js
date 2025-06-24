import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Linking,
  Share,
  Alert,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LottieView from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';

const ContactBuyer = ({ route, navigation }) => {
  const buyerDetails = {
    personal: {
      fullName: 'Rajesh Kumar',
      contactNumber: '+91 9876543210',
      whatsappNumber: '+91 9876543210',
      email: 'rajesh.kumar@example.com',
    },
    project: {
      name: 'Premium Towers',
      address: '123 Business District, Mumbai',
      pinCode: '400001',
      stage: 'New Construction',
      timeline: 'Within 4 weeks',
      totalSqFt: '1500 sq ft',
      category: 'ELITE CREST',
    },
  };

  const handleCall = () => {
    Linking.openURL(`tel:${buyerDetails.personal.contactNumber}`);
  };

  const handleWhatsApp = () => {
    const message = `Hi ${buyerDetails.personal.fullName}, I saw your request for ${buyerDetails.project.name} on UPVC Connect. Here's my quote:`;
    Linking.openURL(`whatsapp://send?phone=${buyerDetails.personal.whatsappNumber}&text=${encodeURIComponent(message)}`);
  };

  const handleShare = async () => {
    try {
      const shareContent = {
        message: `Buyer Details:
        Name: ${buyerDetails.personal.fullName}
        Contact: ${buyerDetails.personal.contactNumber}
        Project: ${buyerDetails.project.name}
        Address: ${buyerDetails.project.address}, ${buyerDetails.project.pinCode}
        Timeline: ${buyerDetails.project.timeline}`,
      };
      await Share.share(shareContent);
    } catch (error) {
      Alert.alert('Error', 'Failed to share details');
    }
  };

  const handlePrint = () => {
    Alert.alert('Print', 'Print functionality would connect to a printer in production');
  };

  const handleDownload = () => {
    Alert.alert('Download', 'Details would be downloaded as PDF in production');
  };

  const openMap = () => {
    Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(buyerDetails.project.address)}`);
  };

  // Static data for selected items
const selectedItems = [
  {
    id: 1,
    design: 'Sliding Window',
    color: 'White',
    size: '5ft x 4ft',
    where: 'Living Room',
    qty: 2,
    total: '40 sq ft',
    remarks: 'Frosted glass'
  },
  {
    id: 2,
    design: 'Casement Window',
    color: 'Wooden Finish',
    size: '3ft x 5ft',
    where: 'Bedroom',
    qty: 3,
    total: '45 sq ft',
    remarks: 'Double glazing'
  },
  {
    id: 3,
    design: 'French Door',
    color: 'Black',
    size: '7ft x 3ft',
    where: 'Balcony',
    qty: 1,
    total: '21 sq ft',
    remarks: 'With mosquito net'
  },
];
  const scaleAnim = useState(new Animated.Value(1))[0];
  const [editingItemId, setEditingItemId] = useState(null);
    const handleEditItem = (itemId) => {
      setEditingItemId(itemId); 
      Alert.alert('Edit Item', 'Editing functionality would be implemented here');
    };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* Logo Header */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
 
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headline}>LEAD UNLOCKED</Text>
        <Text style={styles.subheader}>Full buyer details now available</Text>
          <Text style={styles.viewTitle} onPress={() => navigation.navigate("SellerMain", { screen: "SellerAccount" })}>View in History</Text>

          {/* <Text style={styles.viewTitle} onPress={()=>navigation.navigate("SellerAccountPage")}>View in History</Text> */}
      </View>

              <View style={styles.itemsContainer}>
                {selectedItems.map((item) => (
                  <View key={item.id} style={styles.itemCard}>
                    <LinearGradient
                      colors={['#f5f5f5', '#ffffff']}
                      style={styles.cardGradient}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                    >
                    {/* <Text style={styles.serialNo}>{item.id}</Text> */}
                    <Animated.View style={[styles.serialBadge, { transform: [{ scale: scaleAnim }] }]}>
                      <Text style={styles.serialBadgeText}>{item.id}</Text>
                    </Animated.View>
                      {/* <View style={styles.cardHeader}>
                        <Text style={styles.cardTitle}>{item.design}</Text>
                        <TouchableOpacity
                          style={styles.editButton}
                          onPress={() => handleEditItem(item.id)}
                        >
                          <Icon name="edit" size={18} color="#000" />
                        </TouchableOpacity>
                      </View> */}
                      
                      <View style={styles.itemGrid}>
                        <View style={styles.itemColumn}>
                          <View style={styles.itemField}>
                            <Text style={styles.itemLabel}>COLOR</Text>
                            <Text style={styles.itemValue}>{item.color}</Text>
                          </View>
                          <View style={styles.itemField}>
                            <Text style={styles.itemLabel}>SIZE</Text>
                            <Text style={styles.itemValue}>{item.size}</Text>
                          </View>
                        </View>
                        
                        <View style={styles.itemColumn}>
                          <View style={styles.itemField}>
                            <Text style={styles.itemLabel}>LOCATION</Text>
                            <Text style={styles.itemValue}>{item.where}</Text>
                          </View>
                          <View style={styles.itemField}>
                            <Text style={styles.itemLabel}>QUANTITY</Text>
                            <Text style={styles.itemValue}>{item.qty}</Text>
                          </View>
                        </View>
                      </View>
                      
                      <View style={styles.totalContainer}>
                        <Text style={styles.totalLabel}>TOTAL</Text>
                        <Text style={styles.totalValue}>{item.total}</Text>
                      </View>
                      
                      {item.remarks && (
                        <View style={styles.remarksContainer}>
                          <Text style={styles.remarksLabel}>REMARKS</Text>
                          <Text style={styles.remarksValue}>{item.remarks}</Text>
                        </View>
                      )}
                    </LinearGradient>
                  </View>
                ))}
                <View style={styles.summaryCard}>
                  <View style={styles.summaryItem}>
                    <Icon name="straighten" size={20} color="#000" style={styles.summaryIcon} />
                    <Text style={styles.summaryLabel}>TOTAL SQ FT</Text>
                    <Text style={styles.summaryValue}>106</Text>
                  </View>
      
                  <View style={styles.summaryItem}>
                    <Icon name="format-list-numbered" size={20} color="#000" style={styles.summaryIcon} />
                    <Text style={styles.summaryLabel}>TOTAL QUANTITY</Text>
                    <Text style={styles.summaryValue}>6</Text>
                  </View>
                </View>
              </View>

      {/* Buyer Details Card */}
      <View style={styles.card}>
        {/* Personal Details Section */}
        <View style={styles.cardHeader}>
          <Text style={styles.sectionTitle}>PERSONAL DETAILS</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Icon name="person" size={20} color="#000" style={styles.icon} />
          <View>
            <Text style={styles.detailLabel}>Full Name</Text>
            <Text style={styles.detailValue}>{buyerDetails.personal.fullName}</Text>
          </View>
        </View>

        <View style={styles.detailRow}>
          <Icon name="phone" size={20} color="#000" style={styles.icon} />
          <View>
            <Text style={styles.detailLabel}>Contact Number</Text>
            <Text style={styles.detailValue}>{buyerDetails.personal.contactNumber}</Text>
          </View>
        </View>

        <View style={styles.detailRow}>
          <Icon name="chat" size={20} color="#000" style={styles.icon} />
          <View>
            <Text style={styles.detailLabel}>WhatsApp Number</Text>
            <Text style={styles.detailValue}>{buyerDetails.personal.whatsappNumber}</Text>
          </View>
        </View>

        <View style={styles.detailRow}>
          <Icon name="email" size={20} color="#000" style={styles.icon} />
          <View>
            <Text style={styles.detailLabel}>Email Address</Text>
            <Text style={styles.detailValue}>{buyerDetails.personal.email}</Text>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Project Details Section */}
        <Text style={styles.sectionTitle}>PROJECT DETAILS</Text>
        
        <View style={styles.detailRow}>
          <Icon name="business" size={20} color="#000" style={styles.icon} />
          <View>
            <Text style={styles.detailLabel}>Project Name</Text>
            <Text style={styles.detailValue}>{buyerDetails.project.name}</Text>
          </View>
        </View>

        <View style={styles.detailRow}>
          <Icon name="location-on" size={20} color="#000" style={styles.icon} />
          <View>
            <Text style={styles.detailLabel}>Project Address</Text>
            <Text style={styles.detailValue}>{buyerDetails.project.address}</Text>
          </View>
        </View>

        <View style={styles.detailRow}>
          <Icon name="map" size={20} color="#000" style={styles.icon} />
          <View>
            <Text style={styles.detailLabel}>Pin Code</Text>
            <View style={styles.inlineContainer}>
              <Text style={styles.detailValue}>{buyerDetails.project.pinCode}</Text>
              <TouchableOpacity onPress={openMap} style={styles.mapLink}>
                <Text style={styles.linkText}>View on Map</Text>
                <Icon name="open-in-new" size={16} color="#000" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.detailRow}>
          <Icon name="schedule" size={20} color="#000" style={styles.icon} />
          <View>
            <Text style={styles.detailLabel}>Project Stage</Text>
            <View style={styles.inlineContainer}>
              <Text style={styles.detailValue}>{buyerDetails.project.stage}</Text>
              <Text style={styles.timeline}>{buyerDetails.project.timeline}</Text>
            </View>
          </View>
        </View>

        <View style={styles.detailRow}>
          <Icon name="straighten" size={20} color="#000" style={styles.icon} />
          <View>
            <Text style={styles.detailLabel}>Total Sq. Feet</Text>
            <View style={styles.inlineContainer}>
              <Text style={styles.detailValue}>{buyerDetails.project.totalSqFt}</Text>
              <Text style={styles.category}>{buyerDetails.project.category}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
          <Icon name="share" size={24} color="#000" />
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={handlePrint}>
          <Icon name="print" size={24} color="#000" />
          <Text style={styles.actionText}>Print</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={handleDownload}>
          <Icon name="cloud-download" size={24} color="#000" />
          <Text style={styles.actionText}>Download</Text>
        </TouchableOpacity>
      </View>

      {/* Contact Buttons */}
      {/* <TouchableOpacity 
        style={[styles.contactButton, styles.callButton]}
        onPress={handleCall}
      >
        <Icon name="call" size={24} color="#fff" />
        <Text style={styles.contactButtonText}>Call Buyer</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.contactButton, styles.whatsappButton]}
        onPress={handleWhatsApp}
      >
        <Icon name="chat" size={24} color="#fff" />
        <Text style={styles.contactButtonText}>WhatsApp Buyer</Text>
      </TouchableOpacity> */}
 
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40, 

  },
  scrollContent: {
    paddingBottom: 50,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 160,
    height: 90,
  },
  animation: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 10,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  headline: {
    fontSize: 24,
    fontWeight: '900',
    color: '#000',
    letterSpacing: 1,
    marginBottom: 5,
  },
  subheader: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  cardHeader:{
    flexDirection:'row',
    alignItems:"center",
    justifyContent:"space-between"
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    letterSpacing: 0.5,
  },
  editButton: {
    padding: 5,
  },
  itemGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  itemColumn: {
    width: '48%',
  },
  itemField: {
    marginBottom: 12,
  },
  itemLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginBottom: 2,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  itemValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
    textTransform: 'uppercase',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#000',
  },
  remarksContainer: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  remarksLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginBottom: 2,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  remarksValue: {
    fontSize: 13,
    fontWeight: '500',
    color: '#000',
    fontStyle: 'italic',
  },
// Summary Card
summaryCard: {
  backgroundColor:"white",
  flexDirection:"row",
  padding:20,
  borderWidth: 1,
  borderColor: 'rgba(0,0,0,0.05)',
  marginTop: 20,
  borderRadius: 12,
  overflow: 'hidden',
  ...Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
    },
    android: {
      elevation: 4,
    },
  }),
},
summaryGradient: {
  padding: 15,
},
summaryRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
},
summaryItem: {
  flex: 1,
  alignItems: 'center',
},
summaryDivider: {
  width: 1,
  height: 40,
  backgroundColor: 'rgba(0,0,0,0.1)',
},
summaryLabel: {
  fontSize: 12,
  fontWeight: '600',
  color: '#666',
  letterSpacing: 0.5,
  textTransform: 'uppercase',
  marginBottom: 5,
},
summaryValue: {
  fontSize: 20,
  fontWeight: '700',
  color: '#000',
},
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 25,
    marginHorizontal: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#000',
    marginBottom: 20,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  viewTitle: { 
    backgroundColor:"black",
    color: 'white',
    padding:10,
    marginTop: 20,
    marginHorizontal:10,
    paddingHorizontal:15,
    textDecorationLine:"underline",
    // borderBottomWidth:1,
    // borderBottomColor:"black",
    // borderBottomColor:'black', 
    borderRadius:20,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  icon: {
    marginRight: 15,
    marginTop: 3,
  },
  detailLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#666',
    marginBottom: 3,
    letterSpacing: 0.5,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 20,
  },
  inlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mapLink: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
  },
  linkText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginRight: 5,
    textDecorationLine: 'underline',
  },
  timeline: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginLeft: 15,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
  },
  category: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
    marginLeft: 15,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 20,
    marginBottom: 25,
  },
  actionButton: {
    alignItems: 'center',
    padding: 10,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginTop: 5,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 15,
  },
  callButton: {
    backgroundColor: '#000',
  },
  whatsappButton: {
    backgroundColor: '#000',
  },
  contactButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    marginLeft: 10,
    letterSpacing: 0.5,
  },
  tipBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 15,
    marginHorizontal: 20,
    marginTop: 10,
  },
  tipText: {
    fontSize: 14,
    color: '#000',
    marginLeft: 10,
    flex: 1,
  },
  itemsContainer: {
    marginBottom: 15,
    padding:20,
  },
    itemCard: {
      borderRadius: 14,
      marginBottom: 15,
      overflow: 'hidden',
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
        },
        android: {
          elevation: 6,
        },
      }),
    },
    cardGradient: {
    padding: 20,
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
  fontWeight: 'bold',
  fontSize: 12,
},
});

export default ContactBuyer;