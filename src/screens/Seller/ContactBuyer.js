// import React, { useState } from 'react';
// import {
//   View, 
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   Image,
//   Linking,
//   Share,
//   Alert,
//   Animated,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons'; 
// import LinearGradient from 'react-native-linear-gradient';
// import AppText from '../../components/AppText';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';

// const ContactBuyer = ({ route, navigation }) => {
//   console.log("rooute params: " , route.params)
//   const insets = useSafeAreaInsets();

//   const buyerDetails = {
//     personal: {
//       fullName: 'Rajesh Kumar',
//       contactNumber: '+91 9876543210',
//       whatsappNumber: '+91 9876543210',
//       email: 'rajesh.kumar@example.com',
//     },
//     project: {
//       name: 'Premium Towers',
//       address: '123 Business District, Mumbai',
//       pinCode: '400001',
//       stage: 'New Construction',
//       timeline: 'Within 4 weeks',
//       totalSqFt: '1500 sq ft',
//       category: 'ELITE CREST',
//     },
//   };

//   const handleShare = async () => {
//     try {
//       const shareContent = {
//         message: `Buyer Details:
//         Name: ${buyerDetails.personal.fullName}
//         Contact: ${buyerDetails.personal.contactNumber}
//         Project: ${buyerDetails.project.name}
//         Address: ${buyerDetails.project.address}, ${buyerDetails.project.pinCode}
//         Timeline: ${buyerDetails.project.timeline}`,
//       };
//       await Share.share(shareContent);
//     } catch (error) {
//       Alert.alert('Error', 'Failed to share details');
//     }
//   };

//   const handlePrint = () => {
//     Alert.alert('Print', 'Print functionality would connect to a printer in production');
//   };

//   const handleDownload = () => {
//     Alert.alert('Download', 'Details would be downloaded as PDF in production');
//   };

//   const openMap = () => {
//     Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(buyerDetails.project.address)}`);
//   };

//   // Static data for selected items
//   const selectedItems = [
//     {
//       id: 1,
//       design: 'Sliding Window',
//       color: 'White',
//       size: '5ft x 4ft',
//       where: 'Living Room',
//       qty: 2,
//       total: '40 sq ft',
//       remarks: 'Frosted glass'
//     },
//     {
//       id: 2,
//       design: 'Casement Window',
//       color: 'Wooden Finish',
//       size: '3ft x 5ft',
//       where: 'Bedroom',
//       qty: 3,
//       total: '45 sq ft',
//       remarks: 'Double glazing'
//     }, 
//   ];

//   const scaleAnim = useState(new Animated.Value(1))[0];
  
//   return (
//     <View style={{paddingTop: insets.top, flex: 1, backgroundColor: 'white'}}>
//       <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
//         {/* Logo Header */}
//         <View style={styles.logoContainer}>
//           <Image
//             source={require('../../assets/logo.png')}
//             style={styles.logo}
//             resizeMode="contain"
//           />
//         </View>
  
//         {/* Header */}
//         <View style={styles.header}>
//           <AppText weight='Inter' style={styles.headline}>LEAD UNLOCKED</AppText>
//           <AppText weight='Inter'style={styles.subheader}>Full buyer details now available</AppText>
//             <AppText weight='Inter'style={styles.viewTitle} onPress={() => navigation.navigate("SellerMain", { screen: "SellerAccount" })}>View in History</AppText>
//         </View>

//                 <View style={styles.itemsContainer}>
//                   {selectedItems.map((item) => (
//                     <View key={item.id} style={styles.itemCard}>
//                       <LinearGradient
//                         colors={['#f5f5f5', '#ffffff']}
//                         style={styles.cardGradient}
//                         start={{ x: 0, y: 0 }}
//                         end={{ x: 1, y: 1 }}
//                       > 
//                       <Animated.View style={[styles.serialBadge, { transform: [{ scale: scaleAnim }] }]}>
//                         <AppText weight='Inter'style={styles.serialBadgeText}>{item.id}</AppText>
//                       </Animated.View> 
//                         <View style={styles.itemGrid}>
//                           <View style={styles.itemColumn}>
//                             <View style={styles.itemField}>
//                               <AppText weight='Inter'style={styles.itemLabel}>COLOR</AppText>
//                               <AppText weight='Inter'style={styles.itemValue}>{item.color}</AppText>
//                             </View>
//                             <View style={styles.itemField}>
//                               <AppText weight='Inter'style={styles.itemLabel}>SIZE</AppText>
//                               <AppText weight='Inter'style={styles.itemValue}>{item.size}</AppText>
//                             </View>
//                           </View>
                          
//                           <View style={styles.itemColumn}>
//                             <View style={styles.itemField}>
//                               <AppText weight='Inter'style={styles.itemLabel}>LOCATION</AppText>
//                               <AppText weight='Inter'style={styles.itemValue}>{item.where}</AppText>
//                             </View>
//                             <View style={styles.itemField}>
//                               <AppText weight='Inter'style={styles.itemLabel}>QUANTITY</AppText>
//                               <AppText weight='Inter'style={styles.itemValue}>{item.qty}</AppText>
//                             </View>
//                           </View>
//                         </View>
                        
//                         <View style={styles.totalContainer}>
//                           <AppText weight='Inter'style={styles.totalLabel}>TOTAL</AppText>
//                           <AppText weight='Inter'style={styles.totalValue}>{item.total}</AppText>
//                         </View>
                        
//                         {item.remarks && (
//                           <View style={styles.remarksContainer}>
//                             <AppText weight='Inter'style={styles.remarksLabel}>REMARKS</AppText>
//                             <AppText weight='Inter'style={styles.remarksValue}>{item.remarks}</AppText>
//                           </View>
//                         )}
//                       </LinearGradient>
//                     </View>
//                   ))}
//                   <View style={styles.summaryCard}>
//                     <View style={styles.summaryItem}>
//                       <Icon name="straighten" size={20} color="#000" style={styles.summaryIcon} />
//                       <AppText weight='Inter'style={styles.summaryLabel}>TOTAL SQ FT</AppText>
//                       <AppText weight='Inter'style={styles.summaryValue}>106</AppText>
//                     </View>
        
//                     <View style={styles.summaryItem}>
//                       <Icon name="format-list-numbered" size={20} color="#000" style={styles.summaryIcon} />
//                       <AppText weight='Inter'style={styles.summaryLabel}>TOTAL QUANTITY</AppText>
//                       <AppText weight='Inter'style={styles.summaryValue}>6</AppText>
//                     </View>
//                   </View>
//                 </View>

//         {/* Buyer Details Card */}
//         <View style={styles.card}>
//           {/* Personal Details Section */}
//           <View style={styles.cardHeader}>
//             <AppText weight='Inter'style={styles.sectionTitle}>PERSONAL DETAILS</AppText>
//           </View>
          
//           <View style={styles.detailRow}>
//             <Icon name="person" size={20} color="#000" style={styles.icon} />
//             <View>
//               <AppText weight='Inter'style={styles.detailLabel}>Full Name</AppText>
//               <AppText weight='Inter'style={styles.detailValue}>{buyerDetails.personal.fullName}</AppText>
//             </View>
//           </View>

//           <View style={styles.detailRow}>
//             <Icon name="phone" size={20} color="#000" style={styles.icon} />
//             <View>
//               <AppText weight='Inter'style={styles.detailLabel}>Contact Number</AppText>
//               <AppText weight='Inter'style={styles.detailValue}>{buyerDetails.personal.contactNumber}</AppText>
//             </View>
//           </View>

//           <View style={styles.detailRow}>
//             <Icon name="chat" size={20} color="#000" style={styles.icon} />
//             <View>
//               <AppText weight='Inter'style={styles.detailLabel}>WhatsApp Number</AppText>
//               <AppText weight='Inter'style={styles.detailValue}>{buyerDetails.personal.whatsappNumber}</AppText>
//             </View>
//           </View>

//           <View style={styles.detailRow}>
//             <Icon name="email" size={20} color="#000" style={styles.icon} />
//             <View>
//               <AppText weight='Inter'style={styles.detailLabel}>Email Address</AppText>
//               <AppText weight='Inter'style={styles.detailValue}>{buyerDetails.personal.email}</AppText>
//             </View>
//           </View>

//           {/* Divider */}
//           <View style={styles.divider} />

//           {/* Project Details Section */}
//           <AppText weight='Inter'style={styles.sectionTitle}>PROJECT DETAILS</AppText>
          
//           <View style={styles.detailRow}>
//             <Icon name="business" size={20} color="#000" style={styles.icon} />
//             <View>
//               <AppText weight='Inter'style={styles.detailLabel}>Project Name</AppText>
//               <AppText weight='Inter'style={styles.detailValue}>{buyerDetails.project.name}</AppText>
//             </View>
//           </View>

//           <View style={styles.detailRow}>
//             <Icon name="location-on" size={20} color="#000" style={styles.icon} />
//             <View>
//               <AppText weight='Inter'style={styles.detailLabel}>Project Address</AppText>
//               <AppText weight='Inter'style={styles.detailValue}>{buyerDetails.project.address}</AppText>
//             </View>
//           </View>

//           <View style={styles.detailRow}>
//             <Icon name="map" size={20} color="#000" style={styles.icon} />
//             <View>
//               <AppText weight='Inter'style={styles.detailLabel}>Pin Code</AppText>
//               <View style={styles.inlineContainer}>
//                 <AppText weight='Inter'style={styles.detailValue}>{buyerDetails.project.pinCode}</AppText>
//                 <TouchableOpacity onPress={openMap} style={styles.mapLink}>
//                   <AppText weight='Inter'style={styles.linkText}>View on Map</AppText>
//                   <Icon name="open-in-new" size={16} color="#000" />
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>

//           <View style={styles.detailRow}>
//             <Icon name="schedule" size={20} color="#000" style={styles.icon} />
//             <View>
//               <AppText weight='Inter'style={styles.detailLabel}>Project Stage</AppText>
//               <View style={styles.inlineContainer}>
//                 <AppText weight='Inter'style={styles.detailValue}>{buyerDetails.project.stage}</AppText>
//                 <AppText weight='Inter'style={styles.timeline}>{buyerDetails.project.timeline}</AppText>
//               </View>
//             </View>
//           </View>

//           <View style={styles.detailRow}>
//             <Icon name="straighten" size={20} color="#000" style={styles.icon} />
//             <View>
//               <AppText weight='Inter'style={styles.detailLabel}>Total Sq. Feet</AppText>
//               <View style={styles.inlineContainer}>
//                 <AppText weight='Inter'style={styles.detailValue}>{buyerDetails.project.totalSqFt}</AppText>
//                 <AppText weight='Inter'style={styles.category}>{buyerDetails.project.category}</AppText>
//               </View>
//             </View>
//           </View>
//         </View>

//         {/* Action Buttons */}
//         <View style={styles.actionRow}>
//           <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
//             <Icon name="share" size={24} color="#000" />
//             <AppText weight='Inter'style={styles.actionText}>Share</AppText>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.actionButton} onPress={handlePrint}>
//             <Icon name="print" size={24} color="#000" />
//             <AppText weight='Inter'style={styles.actionText}>Print</AppText>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.actionButton} onPress={handleDownload}>
//             <Icon name="cloud-download" size={24} color="#000" />
//             <AppText weight='Inter'style={styles.actionText}>Download</AppText>
//           </TouchableOpacity>
//         </View> 
//       </ScrollView>
//     </View>
//   );
// };

import React, { useState, useEffect } from 'react';
import {
  View, 
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
import LinearGradient from 'react-native-linear-gradient';
import AppText from '../../components/AppText';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ContactBuyer = ({ route, navigation }) => {
  const insets = useSafeAreaInsets();
  const { lead } = route.params;
  console.log("Lead : " , lead)
  
  const scaleAnim = useState(new Animated.Value(1))[0];

  // Extract buyer details from the lead data
  const buyerDetails = {
    personal: {
      fullName: lead.rawData.contactInfo.name,
      contactNumber: lead.rawData.contactInfo.contactNumber,
      whatsappNumber: lead.rawData.contactInfo.whatsappNumber,
      email: lead.rawData.contactInfo.email,
    },
    project: {
      name: lead.rawData.projectInfo.name,
      address: lead.rawData.projectInfo.address,
      pinCode: lead.rawData.projectInfo.pincode,
      stage: lead.rawData.projectInfo.stage,
      timeline: lead.rawData.projectInfo.timeline,
      totalSqFt: `${lead.rawData.totalSqft} sq ft`,
      category: lead.rawData.category?.name || 'Window',
      googleMapLink: lead.rawData.projectInfo.googleMapLink,
    },
  };

  // Format quotes as selected items
  const selectedItems = lead.rawData.quotes.map((quote, index) => ({
    id: index + 1,
    design: quote.product.title,
    color: quote.color,
    size: `${quote.width}ft x ${quote.height}ft`,
    where: quote.installationLocation.replace(/_/g, ' '),
    qty: quote.quantity,
    total: `${quote.sqft} sq ft`,
    remarks: quote.remark || 'No remarks',
  }));

  // Calculate totals
  const totalSqFt = lead.rawData.totalSqft;
  const totalQuantity = lead.rawData.totalQuantity;

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
    const mapUrl = buyerDetails.project.googleMapLink || 
                  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(buyerDetails.project.address)}`;
    Linking.openURL(mapUrl);
  };

  return (
    <View style={{paddingTop: insets.top, flex: 1, backgroundColor: 'white'}}>
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
          <AppText weight='Inter' style={styles.headline}>LEAD UNLOCKED</AppText>
          <AppText weight='Inter' style={styles.subheader}>Full buyer details now available</AppText>
          <AppText weight='Inter' style={styles.viewTitle} onPress={() => navigation.navigate("SellerMain", { screen: "SellerAccount" })}>
            View in History
          </AppText>
        </View>

        {/* Selected Items */}
        <View style={styles.itemsContainer}>
          {selectedItems.map((item) => (
            <View key={item.id} style={styles.itemCard}>
              <LinearGradient
                colors={['#f5f5f5', '#ffffff']}
                style={styles.cardGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              > 
                <Animated.View style={[styles.serialBadge, { transform: [{ scale: scaleAnim }] }]}>
                  <AppText weight='Inter' style={styles.serialBadgeText}>{item.id}</AppText>
                </Animated.View> 
                <View style={styles.itemGrid}>
                  <View style={styles.itemColumn}>
                    <View style={styles.itemField}>
                      <AppText weight='Inter' style={styles.itemLabel}>COLOR</AppText>
                      <AppText weight='Inter' style={styles.itemValue}>{item.color}</AppText>
                    </View>
                    <View style={styles.itemField}>
                      <AppText weight='Inter' style={styles.itemLabel}>SIZE</AppText>
                      <AppText weight='Inter' style={styles.itemValue}>{item.size}</AppText>
                    </View>
                  </View>
                  
                  <View style={styles.itemColumn}>
                    <View style={styles.itemField}>
                      <AppText weight='Inter' style={styles.itemLabel}>LOCATION</AppText>
                      <AppText weight='Inter' style={styles.itemValue}>{item.where}</AppText>
                    </View>
                    <View style={styles.itemField}>
                      <AppText weight='Inter' style={styles.itemLabel}>QUANTITY</AppText>
                      <AppText weight='Inter' style={styles.itemValue}>{item.qty}</AppText>
                    </View>
                  </View>
                </View>
                
                <View style={styles.totalContainer}>
                  <AppText weight='Inter' style={styles.totalLabel}>TOTAL</AppText>
                  <AppText weight='Inter' style={styles.totalValue}>{item.qty} x {item.total}</AppText>
                </View>
                
                {item.remarks && (
                  <View style={styles.remarksContainer}>
                    <AppText weight='Inter' style={styles.remarksLabel}>REMARKS</AppText>
                    <AppText weight='Inter' style={styles.remarksValue}>{item.remarks}</AppText>
                  </View>
                )}
              </LinearGradient>
            </View>
          ))}
          
          <View style={styles.summaryCard}>
            <View style={styles.summaryItem}>
              <Icon name="straighten" size={20} color="#000" style={styles.summaryIcon} />
              <AppText weight='Inter' style={styles.summaryLabel}>TOTAL SQ FT</AppText>
              <AppText weight='Inter' style={styles.summaryValue}>{totalSqFt}</AppText>
            </View>
    
            <View style={styles.summaryItem}>
              <Icon name="format-list-numbered" size={20} color="#000" style={styles.summaryIcon} />
              <AppText weight='Inter' style={styles.summaryLabel}>TOTAL QUANTITY</AppText>
              <AppText weight='Inter' style={styles.summaryValue}>{totalQuantity}</AppText>
            </View>
          </View>
        </View>

        {/* Buyer Details Card */}
        <View style={styles.card}>
          {/* Personal Details Section */}
          <View style={styles.cardHeader}>
            <AppText weight='Inter' style={styles.sectionTitle}>PERSONAL DETAILS</AppText>
          </View>
          
          <View style={styles.detailRow}>
            <Icon name="person" size={20} color="#000" style={styles.icon} />
            <View>
              <AppText weight='Inter' style={styles.detailLabel}>Full Name</AppText>
              <AppText weight='Inter' style={styles.detailValue}>{buyerDetails.personal.fullName}</AppText>
            </View>
          </View>

          <View style={styles.detailRow}>
            <Icon name="phone" size={20} color="#000" style={styles.icon} />
            <View>
              <AppText weight='Inter' style={styles.detailLabel}>Contact Number</AppText>
              <AppText weight='Inter' style={styles.detailValue}>{buyerDetails.personal.contactNumber}</AppText>
            </View>
          </View>

          <View style={styles.detailRow}>
            <Icon name="chat" size={20} color="#000" style={styles.icon} />
            <View>
              <AppText weight='Inter' style={styles.detailLabel}>WhatsApp Number</AppText>
              <AppText weight='Inter' style={styles.detailValue}>{buyerDetails.personal.whatsappNumber}</AppText>
            </View>
          </View>

          <View style={styles.detailRow}>
            <Icon name="email" size={20} color="#000" style={styles.icon} />
            <View>
              <AppText weight='Inter' style={styles.detailLabel}>Email Address</AppText>
              <AppText weight='Inter' style={styles.detailValue}>{buyerDetails.personal.email}</AppText>
            </View>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Project Details Section */}
          <AppText weight='Inter' style={styles.sectionTitle}>PROJECT DETAILS</AppText>
          
          <View style={styles.detailRow}>
            <Icon name="business" size={20} color="#000" style={styles.icon} />
            <View>
              <AppText weight='Inter' style={styles.detailLabel}>Project Name</AppText>
              <AppText weight='Inter' style={styles.detailValue}>{buyerDetails.project.name}</AppText>
            </View>
          </View>

          <View style={styles.detailRow}>
            <Icon name="location-on" size={20} color="#000" style={styles.icon} />
            <View>
              <AppText weight='Inter' style={styles.detailLabel}>Project Address</AppText>
              <AppText weight='Inter' style={styles.detailValue}>{buyerDetails.project.address}</AppText>
            </View>
          </View>

          <View style={styles.detailRow}>
            <Icon name="map" size={20} color="#000" style={styles.icon} />
            <View>
              <AppText weight='Inter' style={styles.detailLabel}>Pin Code</AppText>
              <View style={styles.inlineContainer}>
                <AppText weight='Inter' style={styles.detailValue}>{buyerDetails.project.pinCode}</AppText>
                <TouchableOpacity onPress={openMap} style={styles.mapLink}>
                  <AppText weight='Inter' style={styles.linkText}>View on Map</AppText>
                  <Icon name="open-in-new" size={16} color="#000" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.detailRow}>
            <Icon name="schedule" size={20} color="#000" style={styles.icon} />
            <View>
              <AppText weight='Inter' style={styles.detailLabel}>Project Stage</AppText>
              <View style={styles.inlineContainer}>
                <AppText weight='Inter' style={styles.detailValue}>{buyerDetails.project.stage}</AppText>
                <AppText weight='Inter' style={styles.timeline}>{buyerDetails.project.timeline}</AppText>
              </View>
            </View>
          </View>

          <View style={styles.detailRow}>
            <Icon name="straighten" size={20} color="#000" style={styles.icon} />
            <View>
              <AppText weight='Inter' style={styles.detailLabel}>Total Sq. Feet</AppText>
              <View style={styles.inlineContainer}>
                <AppText weight='Inter' style={styles.detailValue}>{buyerDetails.project.totalSqFt}</AppText>
                <AppText weight='Inter' style={styles.category}>{buyerDetails.project.category}</AppText>
              </View>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
            <Icon name="share" size={24} color="#000" />
            <AppText weight='Inter' style={styles.actionText}>Share</AppText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={handlePrint}>
            <Icon name="print" size={24} color="#000" />
            <AppText weight='Inter' style={styles.actionText}>Print</AppText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={handleDownload}>
            <Icon name="cloud-download" size={24} color="#000" />
            <AppText weight='Inter' style={styles.actionText}>Download</AppText>
          </TouchableOpacity>
        </View> 
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', 
  }, 
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 50,
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
    fontSize: 18,
    // fontWeight: '900',
    color: '#000',
    letterSpacing: 1,
    marginBottom: 5,
  },
  subheader: {
    fontSize: 14,
    color: '#666',
    // fontWeight: '500',
  },
  cardHeader:{
    flexDirection:'row',
    alignItems:"center",
    justifyContent:"space-between"
  },
  cardTitle: {
    fontSize: 16,
    // fontWeight: '700',
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
    fontSize: 10,
    // fontWeight: '600',
    color: '#666',
    marginBottom: 2,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  itemValue: {
    fontSize: 14,
    // fontWeight: '500',
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
    // fontWeight: '700',
    color: '#000',
    textTransform: 'uppercase',
  },
  totalValue: {
    fontSize: 16,
    // fontWeight: '800',
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
    // fontWeight: '600',
    color: '#666',
    marginBottom: 2,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  remarksValue: {
    fontSize: 13,
    // fontWeight: '500',
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
  // fontWeight: '600',
  color: '#666',
  letterSpacing: 0.5,
  textTransform: 'uppercase',
  marginBottom: 5,
},
summaryValue: {
  fontSize: 18,
  // fontWeight: '700',
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
    // fontWeight: '800',
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
    // fontWeight: '700',
    color: '#666',
    marginBottom: 3,
    letterSpacing: 0.5,
  },
  detailValue: {
    fontSize: 14,
    // fontWeight: '600',
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
    // fontWeight: '600',
    color: '#000',
    marginRight: 5,
    textDecorationLine: 'underline',
  },
  timeline: {
    fontSize: 14,
    // fontWeight: '600',
    color: '#000',
    marginLeft: 15,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
  },
  category: {
    fontSize: 14,
    // fontWeight: '700',
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
    // fontWeight: '600',
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
    // fontWeight: '700',
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
  // fontWeight: 'bold',
  fontSize: 12,
},
});

export default ContactBuyer;