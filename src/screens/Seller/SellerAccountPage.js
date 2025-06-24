import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Modal,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AppText from '../../components/AppText';

const SellerAccountPage = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [invoiceVisible, setInvoiceVisible] = useState(false);
  
  // Seller information
  const [sellerInfo, setSellerInfo] = useState({
    company: 'Premium UPVC Solutions',
    address: '123 Industrial Area',
    city: 'Mumbai',
    pinCode: '400001',
    email: 'contact@premiumupvc.com',
    gst: '22AAAAA0000A1Z5',
    contactPerson: 'Rahul Sharma',
    contactNumber: '+91 9876543210',
    brandProfile: 'Veka, Aluplast'
  });

  // Purchase history
  const purchaseHistory = [
    {
      id: '1',
      date: '2023-06-15',
      customerName: 'Rajesh Kumar',
      amount: '₹350',
      details: {
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
      }
    },
    {
      id: '2',
      date: '2023-06-10',
      customerName: 'Neha Patel',
      amount: '₹350',
      details: {
        personal: {
          fullName: 'Neha Patel',
          contactNumber: '+91 8765432109',
          whatsappNumber: '+91 8765432109',
          email: 'neha.patel@example.com',
        },
        project: {
          name: 'Luxury Apartments',
          address: '456 High Street, Delhi',
          pinCode: '110001',
          stage: 'Renovation',
          timeline: 'Within 2 weeks',
          totalSqFt: '1200 sq ft',
          category: 'LUXE FRAME',
        },
      }
    }
  ];

  const handleInputChange = (field, value) => {
    setSellerInfo(prev => ({ ...prev, [field]: value }));
  };

  const renderPersonalDetails = () => (
    <View style={styles.section}>
      <AppText weight='SemiBold' style={styles.sectionTitle}>BUSINESS INFORMATION</AppText>
      
      <View style={styles.inputGroup}>
        <AppText weight='SemiBold' style={styles.label}>Company*</AppText>
        <View style={styles.inputContainer}>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={sellerInfo.company}
              onChangeText={(text) => handleInputChange('company', text)}
            />
          ) : (
            <AppText weight='Inter' style={styles.valueText}>{sellerInfo.company}</AppText>
          )}
        </View>
      </View>

      <View style={styles.inputGroup}>
        <AppText weight='SemiBold' style={styles.label}>Address*</AppText>
        <View style={styles.inputContainer}>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={sellerInfo.address}
              onChangeText={(text) => handleInputChange('address', text)}
            />
          ) : (
            <AppText weight='Inter' style={styles.valueText}>{sellerInfo.address}</AppText>
          )}
        </View>
      </View>

      <View style={styles.inputRow}>
        <View style={[styles.inputGroup, { flex: 0.7 }]}>
          <AppText weight='SemiBold' style={styles.label}>City*</AppText>
          <View style={styles.inputContainer}>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={sellerInfo.city}
                onChangeText={(text) => handleInputChange('city', text)}
              />
            ) : (
              <AppText weight='Inter' style={styles.valueText}>{sellerInfo.city}</AppText>
            )}
          </View>
        </View>
        <View style={[styles.inputGroup, { flex: 0.3, marginLeft: 10 }]}>
          <AppText weight='SemiBold' style={styles.label}>PIN Code*</AppText>
          <View style={styles.inputContainer}>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={sellerInfo.pinCode}
                onChangeText={(text) => handleInputChange('pinCode', text)}
                keyboardType="number-pad"
                maxLength={6}
              />
            ) : (
              <AppText weight='Inter' style={styles.valueText}>{sellerInfo.pinCode}</AppText>
            )}
          </View>
        </View>
      </View>

      <AppText weight='SemiBold' style={styles.sectionTitle}>CONTACT INFORMATION</AppText>

      <View style={styles.inputGroup}>
        <AppText weight='SemiBold' style={styles.label}>Email*</AppText>
        <View style={styles.inputContainer}>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={sellerInfo.email}
              onChangeText={(text) => handleInputChange('email', text)}
              keyboardType="email-address"
            />
          ) : (
            <AppText weight='Inter' style={styles.valueText}>{sellerInfo.email}</AppText>
          )}
        </View>
      </View>

      <View style={styles.inputGroup}>
        <AppText weight='SemiBold' style={styles.label}>GST Number*</AppText>
        <View style={styles.inputContainer}>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={sellerInfo.gst}
              onChangeText={(text) => handleInputChange('gst', text)}
            />
          ) : (
            <AppText weight='Inter' style={styles.valueText}>{sellerInfo.gst}</AppText>
          )}
        </View>
      </View>

      <View style={styles.inputGroup}>
        <AppText weight='SemiBold' style={styles.label}>Contact Person*</AppText>
        <View style={styles.inputContainer}>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={sellerInfo.contactPerson}
              onChangeText={(text) => handleInputChange('contactPerson', text)}
            />
          ) : (
            <AppText weight='Inter' style={styles.valueText}>{sellerInfo.contactPerson}</AppText>
          )}
        </View>
      </View>

      <View style={styles.inputGroup}>
        <AppText weight='SemiBold' style={styles.label}>Contact Number*</AppText>
        <View style={styles.inputContainer}>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={sellerInfo.contactNumber}
              onChangeText={(text) => handleInputChange('contactNumber', text)}
              keyboardType="phone-pad"
              maxLength={10}
            />
          ) : (
            <AppText weight='Inter' style={styles.valueText}>{sellerInfo.contactNumber}</AppText>
          )}
        </View>
      </View>

      <View style={styles.inputGroup}>
        <AppText weight='SemiBold' style={styles.label}>Brand of Profile Used</AppText>
        <View style={styles.inputContainer}>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={sellerInfo.brandProfile}
              onChangeText={(text) => handleInputChange('brandProfile', text)}
              placeholder="e.g., Veka, Aluplast"
            />
          ) : (
            <AppText weight='Inter' style={styles.valueText}>{sellerInfo.brandProfile || 'Not specified'}</AppText>
          )}
        </View>
      </View>

      <TouchableOpacity
        style={styles.editButton}
        onPress={() => setIsEditing(!isEditing)}
      >
        <AppText weight='SemiBold' style={styles.editButtonText}>
          {isEditing ? 'SAVE CHANGES' : 'EDIT DETAILS'}
        </AppText>
        <Icon 
          name={isEditing ? 'save' : 'edit'} 
          size={20} 
          color="#000" 
          style={styles.editIcon} 
        />
      </TouchableOpacity>
    </View>
  );

  const renderPurchaseHistory = () => (
    <View style={styles.section}>
      {purchaseHistory.map((purchase) => (
        <View key={purchase.id} style={styles.purchaseCard}>
          <View style={styles.purchaseHeader}>
            <AppText weight='Inter' style={styles.purchaseDate}>{purchase.date}</AppText>
            <AppText weight='Inter' style={styles.purchaseAmount}>{purchase.amount}</AppText>
          </View>
          <AppText  weight='Regular'style={styles.purchaseCustomer}>{purchase.customerName}</AppText>
          
          <View style={styles.purchaseDetails}>
            <AppText weight='Inter' style={styles.detailLabel}>Project: {purchase.details.project.name}</AppText>
            <AppText weight='Inter' style={styles.detailLabel}>Location: {purchase.details.project.address}</AppText>
            <AppText weight='Inter' style={styles.detailLabel}>Area: {purchase.details.project.totalSqFt}</AppText>
          </View>
          
          <TouchableOpacity 
            style={styles.invoiceButton}
            onPress={() => setInvoiceVisible(true)}
          >
            <AppText  weight='SemiBold' style={styles.invoiceButtonText}>VIEW INVOICE</AppText>
            <Icon name="receipt" size={20} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.detailsButton} 
            onPress={() => navigation.navigate('ContactBuyer')}
          >
            <AppText  weight='SemiBold' style={styles.invoiceButtonText}>VIEW DETAILS</AppText> 
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );

  const renderInvoiceModal = () => (
    <Modal
      visible={invoiceVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setInvoiceVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.invoiceContainer}>
          {/* <View
            style={styles.invoicelogocontainer}
          >
            <Image
              source={require('../../assets/logo.png')}
              style={styles.invoicelogo}
              resizeMode="contain"
            />
          </View> */}
          <View style={styles.invoiceHeader}>
            <AppText weight='SemiBold'  style={styles.invoiceTitle}>INVOICE</AppText>
            <TouchableOpacity onPress={() => setInvoiceVisible(false)}>
              <Icon name="close" size={24} color="#000" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.invoiceSection}>
            <AppText weight='SemiBold' style={styles.invoiceSectionTitle}>Seller Information</AppText>
            <AppText weight='Inter' style={styles.invoiceText}>{sellerInfo.company}</AppText>
            <AppText weight='Inter' style={styles.invoiceText}>{sellerInfo.address}, {sellerInfo.city}</AppText>
            <AppText weight='Inter' style={styles.invoiceText}>GST: {sellerInfo.gst}</AppText>
          </View>
          
          <View style={styles.invoiceSection}>
            <AppText weight='SemiBold' style={styles.invoiceSectionTitle}>Invoice Details</AppText>
            <View style={styles.invoiceRow}>
              <AppText weight='Inter' style={styles.invoiceLabel}>Invoice #:</AppText>
              <AppText weight='Inter' style={styles.invoiceValue}>INV-2023-001</AppText>
            </View>
            <View style={styles.invoiceRow}>
              <AppText weight='Inter' style={styles.invoiceLabel}>Date:</AppText>
              <AppText weight='Inter' style={styles.invoiceValue}>2023-06-15</AppText>
            </View>
          </View>
          
          <View style={styles.invoiceSection}>
            <AppText weight='SemiBold' style={styles.invoiceSectionTitle}>Lead Purchase</AppText>
            <View style={styles.invoiceRow}>
              <AppText weight='Inter' style={styles.invoiceLabel}>Customer:</AppText>
              <AppText weight='Inter' style={styles.invoiceValue}>Rajesh Kumar</AppText>
            </View>
            <View style={styles.invoiceRow}>
              <AppText weight='Inter' style={styles.invoiceLabel}>Project:</AppText>
              <AppText weight='Inter' style={styles.invoiceValue}>Premium Towers</AppText>
            </View>
            <View style={styles.invoiceRow}>
              <AppText weight='Inter' style={styles.invoiceLabel}>Lead Price:</AppText>
              <AppText weight='Inter' style={styles.invoiceValue}>₹350</AppText>
            </View>
          </View>
          
          <View style={styles.invoiceTotal}>
            <AppText weight='SemiBold' style={styles.invoiceTotalLabel}>TOTAL</AppText>
            <AppText weight='SemiBold' style={styles.invoiceTotalValue}>₹350</AppText>
          </View>
          
          <View style={styles.invoiceFooter}>
            <AppText weight='Inter'style={styles.invoiceFooterText}>Thank you for your business!</AppText>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        /> 
      </View>
      
      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'personal' && styles.activeTab]}
          onPress={() => setActiveTab('personal')}
        >
          <AppText weight='SemiBold' style={[styles.tabText, activeTab === 'personal' && styles.activeTabText]}>
            Personal Details
          </AppText>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'purchase' && styles.activeTab]}
          onPress={() => setActiveTab('purchase')}
        >
          <AppText weight='SemiBold' style={[styles.tabText, activeTab === 'purchase' && styles.activeTabText]}>
            Purchase History
          </AppText>
        </TouchableOpacity>
      </View>
      
      {/* Content */}
      <ScrollView style={styles.contentContainer}>
        {activeTab === 'personal' ? renderPersonalDetails() : renderPurchaseHistory()}
        
        {/* Additional Sections */}
        {activeTab === 'personal' && (
          <>
            <TouchableOpacity style={styles.menuItem}>
              <AppText weight='SemiBold' style={styles.menuText}>Terms & Conditions</AppText>
              <Icon name="chevron-right" size={24} color="#000" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.menuItem}>
              <AppText weight='SemiBold' style={styles.menuText}>About Us</AppText>
              <Icon name="chevron-right" size={24} color="#000" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.menuItem}>
              <AppText weight='SemiBold' style={styles.menuText}>Contact Us</AppText>
              <Icon name="chevron-right" size={24} color="#000" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.menuItem, styles.logoutItem]} 
            >
              <AppText weight='SemiBold' style={[styles.menuText, styles.logoutText]}>Logout</AppText>
              <Icon name="exit-to-app" size={24} color="#f44336" />
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
      
      {renderInvoiceModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop:30,
    paddingBottom:100,
  },
  header: {
    alignItems: 'center',
    paddingTop: 20, 
  },
  logo: {
    width: 120,
    height: 60, 
  },
  invoicelogo: {
    width: 120,
    height: 60,  
    // display:"flex",
    // flexDirection:"row",
    // alignItems:"center",
    // justifyContent:"center"
  },
  invoicelogocontainer: {
    width: 120,
    height: 60,  
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center"
  },
  headerTitle: {
    fontSize: 22,
    // fontWeight: '800',
    color: '#000',
    letterSpacing: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  tabText: {
    fontSize: 16,
    // fontWeight: '600',
    color: '#666',
  },
  activeTabText: {
    color: '#000',
    // fontWeight: '700',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 16,
    // fontWeight: '800',
    color: '#000',
    marginBottom: 20,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    // fontWeight: '600',
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 14,
    backgroundColor: '#f9f9f9',
  },
  input: {
    fontSize: 16,
    color: '#000',
  },
  valueText: {
    fontSize: 16,
    color: '#000',
    // fontWeight: '500',
  },
  editButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 14,
    borderRadius: 8,
    marginTop: 20,
  },
  editButtonText: {
    fontSize: 16,
    // fontWeight: '700',
    color: '#000',
    marginRight: 10,
  },
  editIcon: {
    marginTop: 2,
  },
  purchaseCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  purchaseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  purchaseDate: {
    fontSize: 14,
    color: '#666',
    // fontWeight: '500',
  },
  purchaseAmount: {
    fontSize: 16,
    // fontWeight: '700',
    color: '#000',
  },
  purchaseCustomer: {
    fontSize: 18,
    // fontWeight: '700',
    color: '#000',
    marginBottom: 12,
  },
  purchaseDetails: {
    marginBottom: 16,
  },
  detailLabel: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  invoiceButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
  },
  detailsButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
  },
  invoiceButtonText: {
    fontSize: 14,
    // fontWeight: '700',
    color: '#000',
    marginRight: 8,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuText: {
    fontSize: 16,
    color: '#000',
    // fontWeight: '500',
  },
  logoutItem: {
    marginTop: 20,
    borderBottomWidth: 0,
  },
  logoutText: {
    color: '#f44336',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  invoiceContainer: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
  },
  invoiceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 16,
  },
  invoiceTitle: {
    fontSize: 20,
    // fontWeight: '800',
    color: '#000',
    letterSpacing: 1,
  },
  invoiceSection: {
    marginBottom: 20,
  },
  invoiceSectionTitle: {
    fontSize: 16,
    // fontWeight: '700',
    color: '#000',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 8,
  },
  invoiceText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 6,
  },
  invoiceRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  invoiceLabel: {
    fontSize: 14,
    color: '#666',
    width: 100,
  },
  invoiceValue: {
    fontSize: 14,
    color: '#000',
    // fontWeight: '500',
  },
  invoiceTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#000',
  },
  invoiceTotalLabel: {
    fontSize: 16,
    // fontWeight: '700',
    color: '#000',
  },
  invoiceTotalValue: {
    fontSize: 18,
    // fontWeight: '800',
    color: '#000',
  },
  invoiceFooter: {
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    alignItems: 'center',
  },
  invoiceFooterText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
});

export default SellerAccountPage;