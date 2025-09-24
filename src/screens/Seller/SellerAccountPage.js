import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Modal,
  TextInput,
  Alert,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AppText from '../../components/AppText';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import axios from 'axios';
import Toast from 'react-native-toast-message';

const SellerAccountPage = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('purchase');
  const [isEditing, setIsEditing] = useState(false);
  const [invoiceVisible, setInvoiceVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState(null);

  // Seller information
  const [sellerInfo, setSellerInfo] = useState({
    company: '',
    address: '',
    city: '',
    pinCode: '',
    email: '',
    gst: '',
    contactPerson: '',
    contactNumber: '',
    brandProfile: '',
    yearsInBusiness: '',
    website: ''
  });

  // Purchase history
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [token, setToken] = useState(null);

  useEffect(() => {
    fetchSellerData();
  }, []);

  const fetchSellerData = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('sellerToken');
      setToken(storedToken);
      if (!storedToken) {
        return;
      }
      const response = await axios.get('http://10.7.10.49:9000/api/sellers', {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });
      if (response.data.success) {
        const seller = response.data.seller;
        setSellerInfo({
          company: seller.companyName || '',
          address: seller.address || '',
          city: seller.city || '',
          pinCode: seller.pinCode || '',
          email: seller.email || '',
          gst: seller.gstNumber || '',
          contactPerson: seller.contactPerson || '',
          contactNumber: seller.phoneNumber || '',
          brandProfile: seller.brandOfProfileUsed || '',
          yearsInBusiness: seller.yearsInBusiness?.toString() || '',
          website: seller.website || ''
        });

        // Format purchase history from leads
        if (seller.leads && seller.leads.length > 0) {
          const formattedPurchases = seller.leads
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map(lead => ({
              id: lead._id,
              rawData: lead,
              date: new Date(lead.createdAt).toISOString().split('T')[0],
              customerName: lead.contactInfo.name,
              amount: lead.price,
              details: {
                personal: {
                  fullName: lead.contactInfo.name,
                  contactNumber: lead.contactInfo.contactNumber,
                  whatsappNumber: lead.contactInfo.whatsappNumber,
                  email: lead.contactInfo.email,
                },
                project: {
                  name: lead.projectInfo.name,
                  address: lead.projectInfo.address,
                  pinCode: lead.projectInfo.pincode,
                  stage: lead.projectInfo.stage,
                  timeline: lead.projectInfo.timeline,
                  totalSqFt: `${lead.totalSqft} sq ft`,
                  category: lead.category?.name || 'Not specified',
                },
              }
            }));
          setPurchaseHistory(formattedPurchases);
        }
      }
    } catch (error) {
      console.error('Error fetching seller data:', error);
      Alert.alert('Error', 'Failed to fetch seller data');
    } finally {
      setIsLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    setIsLoading(true);
    await fetchSellerData();
    setRefreshing(false);
  };

  const handleInputChange = (field, value) => {
    setSellerInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveChanges = async () => {
    try {
      setIsLoading(true);
      const token = await AsyncStorage.getItem('sellerToken');
      if (!token) {
        Alert.alert("Please Login");
        return;
      }

      const updateData = {
        companyName: sellerInfo.company,
        address: sellerInfo.address,
        city: sellerInfo.city,
        pinCode: sellerInfo.pinCode,
        email: sellerInfo.email,
        gstNumber: sellerInfo.gst,
        contactPerson: sellerInfo.contactPerson,
        phoneNumber: sellerInfo.contactNumber,
        brandOfProfileUsed: sellerInfo.brandProfile,
        yearsInBusiness: parseInt(sellerInfo.yearsInBusiness) || 0,
        website: sellerInfo.website
      };
      alert("Your request for verification has been submited");
      setIsEditing(false);
      return;
      const response = await axios.put(
        'http://10.7.10.49:9000/api/sellers',
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        Alert.alert('Success', 'Profile updated successfully');
        setIsEditing(false);
      } else {
        throw new Error(response.data.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating seller profile:', error);
      Alert.alert('Error', error.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const hasBusinessInfo = Object.values(sellerInfo).some(val => val !== '');

  const renderPersonalDetails = () => {
    if (!hasBusinessInfo) {
      return <AppText style={styles.noPurchasesText}>No business information available</AppText>;
    }
    return (
      <View style={styles.section}>
        <AppText style={styles.sectionTitle}>BUSINESS INFORMATION</AppText>

        <View style={styles.inputGroup}>
          <AppText style={styles.label}>Company*</AppText>
          <View style={styles.inputContainer}>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={sellerInfo.company}
                onChangeText={(text) => handleInputChange('company', text)}
              />
            ) : (
              <AppText style={styles.valueText}>{sellerInfo.company}</AppText>
            )}
          </View>
        </View>

        <View style={styles.inputGroup}>
          <AppText style={styles.label}>Address*</AppText>
          <View style={styles.inputContainer}>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={sellerInfo.address}
                onChangeText={(text) => handleInputChange('address', text)}
              />
            ) : (
              <AppText style={styles.valueText}>{sellerInfo.address}</AppText>
            )}
          </View>
        </View>

        <View style={styles.inputRow}>
          <View style={[styles.inputGroup, { flex: 0.7 }]}>
            <AppText style={styles.label}>City*</AppText>
            <View style={styles.inputContainer}>
              {isEditing ? (
                <TextInput
                  style={styles.input}
                  value={sellerInfo.city}
                  onChangeText={(text) => handleInputChange('city', text)}
                />
              ) : (
                <AppText style={styles.valueText}>{sellerInfo.city}</AppText>
              )}
            </View>
          </View>
          <View style={[styles.inputGroup, { flex: 0.3, marginLeft: 10 }]}>
            <AppText style={styles.label}>PIN Code*</AppText>
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
                <AppText style={styles.valueText}>{sellerInfo.pinCode}</AppText>
              )}
            </View>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <AppText style={styles.label}>Years in Business</AppText>
          <View style={styles.inputContainer}>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={sellerInfo.yearsInBusiness}
                onChangeText={(text) => handleInputChange('yearsInBusiness', text)}
                keyboardType="number-pad"
              />
            ) : (
              <AppText style={styles.valueText}>{sellerInfo.yearsInBusiness}</AppText>
            )}
          </View>
        </View>

        <AppText style={styles.sectionTitle}>CONTACT INFORMATION</AppText>

        <View style={styles.inputGroup}>
          <AppText style={styles.label}>Email*</AppText>
          <View style={styles.inputContainer}>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={sellerInfo.email}
                onChangeText={(text) => handleInputChange('email', text)}
                keyboardType="email-address"
              />
            ) : (
              <AppText style={styles.valueText}>{sellerInfo.email}</AppText>
            )}
          </View>
        </View>

        <View style={styles.inputGroup}>
          <AppText style={styles.label}>Website</AppText>
          <View style={styles.inputContainer}>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={sellerInfo.website}
                onChangeText={(text) => handleInputChange('website', text)}
              />
            ) : (
              <AppText style={styles.valueText}>{sellerInfo.website || 'Not specified'}</AppText>
            )}
          </View>
        </View>

        <View style={styles.inputGroup}>
          <AppText style={styles.label}>GST Number*</AppText>
          <View style={styles.inputContainer}>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={sellerInfo.gst}
                onChangeText={(text) => handleInputChange('gst', text)}
              />
            ) : (
              <AppText style={styles.valueText}>{sellerInfo.gst}</AppText>
            )}
          </View>
        </View>

        <View style={styles.inputGroup}>
          <AppText style={styles.label}>Contact Person*</AppText>
          <View style={styles.inputContainer}>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={sellerInfo.contactPerson}
                onChangeText={(text) => handleInputChange('contactPerson', text)}
              />
            ) : (
              <AppText style={styles.valueText}>{sellerInfo.contactPerson}</AppText>
            )}
          </View>
        </View>

        <View style={styles.inputGroup}>
          <AppText style={styles.label}>Contact Number*</AppText>
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
              <AppText style={styles.valueText}>{sellerInfo.contactNumber}</AppText>
            )}
          </View>
        </View>

        <View style={styles.inputGroup}>
          <AppText style={styles.label}>Brand of Profile Used</AppText>
          <View style={styles.inputContainer}>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={sellerInfo.brandProfile}
                editable={false}
                placeholder="e.g., Veka, Aluplast"
              />
            ) : (
              <AppText style={styles.valueText}>{sellerInfo.brandProfile || 'Not specified'}</AppText>
            )}
          </View>
        </View>

        <TouchableOpacity
          style={styles.editButton}
          onPress={() => isEditing ? handleSaveChanges() : setIsEditing(true)}
          disabled={isLoading}
        >
          <AppText style={styles.editButtonText}>
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
  };

  const renderPurchaseHistory = () => (
    <View style={styles.section}>
      {purchaseHistory.length > 0 ? (
        purchaseHistory.map((purchase) => (
          <View key={purchase.id} style={styles.purchaseCard}>
            <View style={styles.purchaseHeader}>
              <AppText style={styles.purchaseDate}>{purchase.date}</AppText>
            </View>
            <AppText style={styles.purchaseCustomer}>{purchase.customerName}</AppText>

            <View style={styles.purchaseDetails}>
              <AppText style={styles.detailLabel}>Project: {purchase.details.project.name}</AppText>
              <AppText style={styles.detailLabel}>Location: {purchase.details.project.address}</AppText>
              <AppText style={styles.detailLabel}>Area: {purchase.details.project.totalSqFt}</AppText>
            </View>

            <TouchableOpacity
              style={styles.invoiceButton}
              onPress={() => {
                setSelectedPurchase(purchase);
                setInvoiceVisible(true);
              }}
            >
              <AppText style={styles.invoiceButtonText}>VIEW INVOICE</AppText>
              <Icon name="receipt" size={20} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => navigation.navigate('ContactBuyer', { lead: purchase })}
            >
              <AppText style={styles.invoiceButtonText}>VIEW DETAILS</AppText>
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <AppText style={styles.noPurchasesText}>No purchase history available</AppText>
      )}
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
          {/* Header */}
          <View style={styles.invoiceHeader}>
            <AppText style={styles.invoiceTitle}>INVOICE</AppText>
            <View style={styles.logoContainer}>
              <Image
                source={require('../../assets/logo.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
            <View style={styles.headerActions}>
              <TouchableOpacity onPress={() => alert('Downloading invoice...')}>
                <Icon name="get-app" size={24} color="#000" style={{ marginRight: 16 }} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setInvoiceVisible(false)}>
                <Icon name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>
          </View>

          {/* From: UPVC Connect */}
          {/* <View style={styles.invoiceSection}>
            <AppText style={styles.invoiceSectionTitle}>From</AppText>
            <AppText style={styles.invoiceText}>UPVC Connect</AppText>
            <AppText style={styles.invoiceText}>13,
K No 214, Bank Avenue
1st Main Road,
Babusapalya
Bengaluru
Bengaluru Urban
Karnataka
560043 </AppText>
            <AppText style={styles.invoiceText}>GST: 29AKWPS1667B1ZL</AppText>
            <AppText style={styles.invoiceText}>Email: contact@upvcconnect.com</AppText>
          </View> */}
{/* From: UPVC Connect */}
<View style={styles.invoiceSection}>
  <AppText style={styles.invoiceSectionTitle}>From</AppText>
  <AppText style={[styles.invoiceText, { fontWeight: 'bold', marginBottom: 4 }]}>
    UPVC Connect
  </AppText>
  <View style={{ marginLeft: 8, marginBottom: 4 }}>
    <AppText style={styles.invoiceText}>14, 1st Main Road, Bank Avenue</AppText>
    {/* <AppText style={styles.invoiceText}>, Babusapalya</AppText> */}
    <AppText style={styles.invoiceText}>Bengaluru - 560043</AppText>
  </View>
  <AppText style={[styles.invoiceText, { marginBottom: 2 }]}>
    GST: 29AKWPS1667B1ZL
  </AppText>
  <AppText style={styles.invoiceText}>
    Email: contact@upvcconnect.com
  </AppText>
</View>

          {/* Billed To */}
          <View style={styles.invoiceSection}>
            <AppText style={styles.invoiceSectionTitle}>Billed To</AppText>
            <AppText style={styles.invoiceText}>{sellerInfo.company}</AppText>
            <AppText style={styles.invoiceText}>{sellerInfo.address}, {sellerInfo.city}</AppText>
            <AppText style={styles.invoiceText}>GST: {sellerInfo.gst}</AppText>
          </View>

          {/* Invoice Details */}
          <View style={styles.invoiceSection}>
            <AppText style={styles.invoiceSectionTitle}>Invoice Details</AppText>
            <View style={styles.invoiceRow}>
              <AppText style={styles.invoiceLabel}>Invoice #:</AppText>
              <AppText style={styles.invoiceValue}>
                INV-{new Date().getFullYear()}-{Math.floor(1000 + Math.random() * 9000)}
              </AppText>
            </View>
            <View style={styles.invoiceRow}>
              <AppText style={styles.invoiceLabel}>Date:</AppText>
              <AppText style={styles.invoiceValue}>{selectedPurchase?.date || new Date().toISOString().split('T')[0]}</AppText>
            </View>
          </View>

          {/* Item Details */}
          {/* <View style={styles.invoiceSection}>
            <AppText style={styles.invoiceSectionTitle}>Item Details</AppText>
            <View style={styles.invoiceRow}>
              <AppText style={styles.invoiceLabel}>Lead for Project:</AppText>
              <AppText style={styles.invoiceValue}>{selectedPurchase?.details.project.name}</AppText>
            </View>
            <View style={styles.invoiceRow}>
              <AppText style={styles.invoiceLabel}>Customer:</AppText>
              <AppText style={styles.invoiceValue}>{selectedPurchase?.customerName}</AppText>
            </View>
            <View style={styles.invoiceRow}>
              <AppText style={styles.invoiceLabel}>Amount (Inclusive of 18% GST):</AppText>
              <AppText style={styles.invoiceValue}>₹{selectedPurchase?.amount?.toFixed(2) || '0.00'}</AppText>
            </View>
          </View> */}

          {/* Total */}
          <View style={styles.invoiceTotal}>
            <AppText style={styles.invoiceTotalLabel}>TOTAL</AppText>
            <AppText style={styles.invoiceTotalValue}>₹{selectedPurchase?.amount?.toFixed(2) || '0.00'}</AppText>
          </View>

          {/* Footer */}
          <View style={styles.invoiceFooter}>
            <AppText style={styles.invoiceFooterText}>Thank you for your business!</AppText>
          </View>
        </View>
      </View>
    </Modal>
  );

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Logged out',
        text2: 'You have been logged out successfully',
        visibilityTime: 1000,
        onHide: () => {
          navigation.replace('SellerMain');
        }
      });
    } catch (error) {
      console.error('Error during logout:', error);
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Logout Failed',
        text2: 'Something went wrong while logging out',
        visibilityTime: 1000,
      });
    }
  };

  if (isLoading) {
    return (
      <View style={{ paddingTop: insets.top, flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
        <AppText>Loading...</AppText>
      </View>
    );
  }

  if (!token) {
    return (
      <View style={styles.loginPromptContainer}>
        <View style={styles.loginCard}>
          <Icon name="lock" size={40} color="#333" style={{ marginBottom: 10 }} />
          <AppText style={styles.loginTitle}>
            Login Required
          </AppText>
          <AppText style={styles.loginMessage}>
            Please log in to view your details and purchase history.
          </AppText>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate('SellerLoginScreen')}
          >
            <AppText style={styles.loginButtonText}>
              GO TO LOGIN
            </AppText>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom, flex: 1, backgroundColor: 'white' }}>
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
            style={[styles.tabButton, activeTab === 'purchase' && styles.activeTab]}
            onPress={() => setActiveTab('purchase')}
          >
            <AppText style={[styles.tabText, activeTab === 'purchase' && styles.activeTabText]}>
              PURCHASE HISTORY
            </AppText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'personal' && styles.activeTab]}
            onPress={() => setActiveTab('personal')}
          >
            <AppText style={[styles.tabText, activeTab === 'personal' && styles.activeTabText]}>
              BUSINESS INFORMATION
            </AppText>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <ScrollView
          style={styles.contentContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {activeTab === 'personal' ? (
            <>
              {renderPersonalDetails()}

              {/* Additional Sections */}
              <TouchableOpacity style={styles.menuItem}>
                <AppText style={styles.menuText}>TERMS & CONDITIONS</AppText>
                <Icon name="chevron-right" size={24} color="#000" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem}>
                <AppText style={styles.menuText}>ABOUT US</AppText>
                <Icon name="chevron-right" size={24} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem}>
                <AppText style={styles.menuText}>CONTACT US</AppText>
                <Icon name="chevron-right" size={24} color="#000" />
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.menuItem, styles.logoutItem]}
                onPress={handleLogout}
              >
                <AppText style={[styles.menuText, styles.logoutText]}>LOGOUT</AppText>
                <Icon name="exit-to-app" size={24} color="#f44336" />
              </TouchableOpacity>
            </>
          ) : (
            renderPurchaseHistory()
          )}
        </ScrollView>

        {renderInvoiceModal()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 100,
  },
  header: {
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 50,
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
    fontSize: 12,
    color: '#666',
    letterSpacing: 1
  },
  activeTabText: {
    color: '#000',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 14,
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
    fontSize: 12,
    color: '#333',
    marginBottom: 8,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 14,
    backgroundColor: '#f9f9f9',
  },
  input: {
    fontSize: 14,
    color: '#000',
  },
  valueText: {
    fontSize: 14,
    color: '#000',
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
    fontSize: 14,
    color: '#000',
    marginRight: 10,
    letterSpacing: 2,
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
  },
  purchaseCustomer: {
    fontSize: 15,
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
    fontSize: 12,
    color: '#000',
    marginRight: 8,
    letterSpacing: 2
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
    fontSize: 14,
    color: '#000',
    letterSpacing: 2,
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
    // height: '95%',
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
  headerActions: {
    flexDirection: 'row',
  },
  invoiceTitle: {
    fontSize: 20,
    color: '#000',
    letterSpacing: 1,
  },
  invoiceSection: {
    marginBottom: 20,
  },
  invoiceSectionTitle: {
    fontSize: 16,
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
    width: 150,
  },
  invoiceValue: {
    fontSize: 14,
    color: '#000',
    flex: 1,
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
    color: '#000',
  },
  invoiceTotalValue: {
    fontSize: 18,
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
  noPurchasesText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
  loginPromptContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loginCard: {
    backgroundColor: '#f9f9f9',
    padding: 25,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    width: '90%',
  },
  loginTitle: {
    fontSize: 20,
    color: '#222',
    marginBottom: 10,
  },
  loginMessage: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 14,
    letterSpacing: 2,
  },
  logoContainer: {
    alignItems: 'center',
  },
});

export default SellerAccountPage;
