import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Animated,
  Platform,
  Alert,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import AppText from '../../../components/AppText';

const { width, height } = Dimensions.get('window');

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

const QuoteRequestPage = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    whatsapp: '',
    email: '',
    projectName: '',
    projectAddress: '',
    pincode: '',
    gmapLocation: '',
    projectStage: '',
    timeline: '',
    totalSqft: '',
    category: 'ELITE CREST',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const [editingItemId, setEditingItemId] = useState(null);

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const scaleAnim = useState(new Animated.Value(1))[0];

const animateBadge = () => {
  Animated.sequence([
    Animated.timing(scaleAnim, {
      toValue: 1.2,
      duration: 100,
      useNativeDriver: true,
    }),
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }),
  ]).start();
};

  const handleSubmit = () => {
    // Validate all fields
    // for (const key in formData) {
    //   if (formData[key].trim() === '') {
    //     Alert.alert('Error', 'Please fill all the required fields');
    //     return;
    //   }
    // }

    // Form submission logic would go here
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    setIsSubmitted(true);
  };

  const handleEditItem = (itemId) => {
    setEditingItemId(itemId);
    // In a real app, you would navigate to an edit screen or show a modal
    Alert.alert('Edit Item', 'Editing functionality would be implemented here');
  };

  const handleCloseSuccess = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setIsSubmitted(false);
      navigation.navigate('BuyerMain'); // Navigate to home after animation
    });
  };

  const renderSelectedItems = () => {
    const navigation = useNavigation();
    return (
      <View style={styles.sectionContainer}>
      <View style={styles.Headercontainer}>
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={30} color="#000" />
        </TouchableOpacity>

        {/* Centered Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../../../assets/logo.png')}
            style={styles.logo}
          />
        </View>
      </View>
        <AppText weight='Bold' style={styles.sectionTopHeader}>YOUR SELECTIONS</AppText>

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
                <AppText weight='SemiBold' style={styles.serialBadgeText}>{item.id}</AppText>
              </Animated.View>
                <View style={styles.cardHeader}>
                  <AppText weight='SemiBold' style={styles.cardTitle}>{item.design}</AppText>
                  <TouchableOpacity 
                    style={styles.editButton}
                    onPress={() => handleEditItem(item.id)}
                  >
                    <Icon name="edit" size={18} color="#000" />
                  </TouchableOpacity>
                </View>
                
                <View style={styles.itemGrid}>
                  <View style={styles.itemColumn}>
                    <View style={styles.itemField}>
                      <AppText weight='Inter' style={styles.itemLabel}>COLOR</AppText>
                      <AppText weight='SemiBold' style={styles.itemValue}>{item.color}</AppText>
                    </View>
                    <View style={styles.itemField}>
                      <AppText weight='Inter' style={styles.itemLabel}>SIZE</AppText>
                      <AppText weight='SemiBold' style={styles.itemValue}>{item.size}</AppText>
                    </View>
                  </View>
                  
                  <View style={styles.itemColumn}>
                    <View style={styles.itemField}>
                      <AppText weight='Inter' style={styles.itemLabel}>LOCATION</AppText>
                      <AppText weight='SemiBold' style={styles.itemValue}>{item.where}</AppText>
                    </View>
                    <View style={styles.itemField}>
                      <AppText weight='Inter' style={styles.itemLabel}>QUANTITY</AppText>
                      <AppText weight='SemiBold' style={styles.itemValue}>{item.qty}</AppText>
                    </View>
                  </View>
                </View>
                
                <View style={styles.totalContainer}>
                  <AppText weight='Inter' style={styles.totalLabel}>TOTAL</AppText>
                  <AppText weight='SemiBold' style={styles.totalValue}>{item.total}</AppText>
                </View>
                
                {item.remarks && (
                  <View style={styles.remarksContainer}>
                    <AppText weight='SemiBold' style={styles.remarksLabel}>REMARKS</AppText>
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
              <AppText weight='SemiBold' style={styles.summaryValue}>106</AppText>
            </View>

            <View style={styles.summaryItem}>
              <Icon name="format-list-numbered" size={20} color="#000" style={styles.summaryIcon} />
              <AppText weight='Inter' style={styles.summaryLabel}>TOTAL QUANTITY</AppText>
              <AppText weight='SemiBold' style={styles.summaryValue}>6</AppText>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const renderForm = () => {
    return (
      <View style={styles.sectionContainer}>
        <View style={styles.formContainer}>
        <AppText weight='SemiBold' style={styles.sectionHeader}>PERSONAL DETAILS</AppText>
          <View style={styles.inputRow}>
            <View style={[styles.inputContainer, styles.inputWithIcon]}>
              <Icon name="person" size={20} color="#000" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                placeholderTextColor="#999"
                value={formData.name}
                onChangeText={(text) => handleInputChange('name', text)}
              />
            </View>
          </View>
          
          <View style={styles.inputRow}>
            <View style={[styles.inputContainer, styles.inputWithIcon]}>
              <Icon name="phone" size={20} color="#000" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Contact Number"
                placeholderTextColor="#999"
                keyboardType="phone-pad"
                value={formData.contact}
                onChangeText={(text) => handleInputChange('contact', text)}
              />
            </View>
            
            <View style={[styles.inputContainer, styles.inputWithIcon]}>
              <Icon name="whatsapp" size={20} color="#000" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="WhatsApp Number"
                placeholderTextColor="#999"
                keyboardType="phone-pad"
                value={formData.whatsapp}
                onChangeText={(text) => handleInputChange('whatsapp', text)}
              />
            </View>
          </View>
          
          <View style={styles.inputRow}>
            <View style={[styles.inputContainer, styles.inputWithIcon]}>
              <Icon name="email" size={20} color="#000" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Email Address"
                placeholderTextColor="#999"
                keyboardType="email-address"
                value={formData.email}
                onChangeText={(text) => handleInputChange('email', text)}
              />
            </View>
          </View>
          
          {/* <AppText weight='SemiBold' style={styles.sectionSubHeader}> DETAILS</AppText> */}
           
        <AppText weight='SemiBold' style={styles.sectionHeader}>PROJECT DETAILS</AppText>
          <View style={styles.inputRow}>
            <View style={[styles.inputContainer, styles.inputWithIcon]}>
              <Icon name="business" size={20} color="#000" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Project Name"
                placeholderTextColor="#999"
                value={formData.projectName}
                onChangeText={(text) => handleInputChange('projectName', text)}
              />
            </View>
          </View>
          
          <View style={styles.inputRow}>
            <View style={[styles.inputContainer, styles.inputWithIcon]}>
              <Icon name="location-on" size={20} color="#000" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Project Address"
                placeholderTextColor="#999"
                multiline
                value={formData.projectAddress}
                onChangeText={(text) => handleInputChange('projectAddress', text)}
              />
            </View>
          </View>
          
          <View style={styles.inputRow}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Pin Code"
                placeholderTextColor="#999"
                keyboardType="number-pad"
                value={formData.pincode}
                onChangeText={(text) => handleInputChange('pincode', text)}
              />
            </View>
            
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Google Map Link"
                placeholderTextColor="#999"
                value={formData.gmapLocation}
                onChangeText={(text) => handleInputChange('gmapLocation', text)}
              />
            </View>
          </View>
          
          <View style={styles.inputRow}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Project Stage"
                placeholderTextColor="#999"
                value={formData.projectStage}
                onChangeText={(text) => handleInputChange('projectStage', text)}
              />
            </View>
            
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Timeline"
                placeholderTextColor="#999"
                value={formData.timeline}
                onChangeText={(text) => handleInputChange('timeline', text)}
              />
            </View>
          </View>
          
          <View style={styles.inputRow}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Total Sq. Feet"
                placeholderTextColor="#999"
                keyboardType="number-pad"
                value={formData.totalSqft}
                onChangeText={(text) => handleInputChange('totalSqft', text)}
              />
            </View>
            
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Category"
                placeholderTextColor="#999"
                value={formData.category}
                onChangeText={(text) => handleInputChange('category', text)}
              />
            </View>
          </View>
          
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <LinearGradient
              colors={['#000000', '#000000']}
              style={styles.buttonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <AppText weight='SemiBold' style={styles.submitButtonText}>REQUEST QUOTE</AppText>
              <Icon name="arrow-forward" size={22} color="#fff" style={styles.buttonIcon} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderSuccessMessage = () => {
    return (
      <Animated.View style={[styles.successContainer, { opacity: fadeAnim }]}>
        <View style={styles.successOverlay} />
        <View style={styles.successCard}>
          <LinearGradient
            colors={['#ffffff', '#f9f9f9']}
            style={styles.successGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={handleCloseSuccess}
            >
              <Icon name="close" size={24} color="#000" />
            </TouchableOpacity>
            
            <View style={styles.successIconContainer}>
              <Icon name="check-circle" size={60} color="#000" />
            </View>
            
            <AppText weight='SemiBold' style={styles.successTitle}>THANK YOU!</AppText>
            
            <View style={styles.successMessageContainer}>
              <AppText weight='SemiBold' style={styles.successText}>Your quote request has been</AppText>
              <AppText weight='SemiBold' style={styles.successText}>successfully submitted</AppText>
            </View>
            
            <View style={styles.successDivider}>
              <View style={styles.dividerLine} />
              <Icon name="star" size={18} color="#000" />
              <View style={styles.dividerLine} />
            </View>
            
            <View style={styles.successFooter}>
              <AppText weight='Inter' style={styles.successFooterText}>Our team will contact you</AppText>
              <AppText weight='Inter' style={styles.successFooterText}>within 24 hours with</AppText>
              <AppText weight='Inter' style={styles.successFooterText}>competitive quotes</AppText>
            </View>
            
            <TouchableOpacity 
              style={styles.successActionButton}
              onPress={handleCloseSuccess}
            >
              <AppText weight='SemiBold' style={styles.successActionText}>BACK TO HOME</AppText>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </Animated.View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {renderSelectedItems()}
        {!isSubmitted ? renderForm() : null}
      </ScrollView>
      {isSubmitted && renderSuccessMessage()}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    paddingTop: 15,
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  sectionContainer: { 
    paddingHorizontal: 20,
  },
  Headercontainer: {
    position: 'relative', // allow absolute positioning inside
    height: 80, // adjust as needed
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },

  backButton: {
    position: 'absolute',
    left: 10,
    top: '50%',
    transform: [{translateY: -12}], // vertically center the icon
    padding: 5,
  },

  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },

  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  sectionTopHeader: {
    fontSize: 18,
    // fontWeight: '800',
    color: '#000', 
    paddingBottom:30, 
    letterSpacing: 1,
    textTransform: 'uppercase',
    textAlign:"center"
  },
  //   logo: {
  //   marginTop:15,
  //   alignSelf:"center",
  //   width: 100, 
  //   height: 100,  
  //   resizeMode: 'contain', 
  // },
  sectionHeader: {
    fontSize: 18,
    // fontWeight: '800',
    color: '#000', 
    marginBottom: 20,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  sectionSubHeader: {
    fontSize: 16,
    // fontWeight: '700',
    color: '#000',
    marginVertical: 15,
    marginTop: 25,
    letterSpacing: 0.5,
  },
  itemsContainer: {
    marginBottom: 15,
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
  serialNo: { 
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
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
    fontSize: 12,
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
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 20,
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
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  inputContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 8,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#000',
    paddingVertical: 8,
  },
  submitButton: {
    marginTop: 25,
    borderRadius: 12,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  buttonGradient: {
    paddingVertical: 16,
    paddingHorizontal: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    // fontWeight: '700',
    letterSpacing: 2,
  },
  buttonIcon: {
    marginLeft: 10,
  },
  successContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  successOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  successCard: {
    width: width - 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  successGradient: {
    padding: 30,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    padding: 5,
  },
  successIconContainer: {
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 24,
    // fontWeight: '800',
    color: '#000',
    marginBottom: 10,
    textAlign: 'center',
    letterSpacing: 1,
  },
  successMessageContainer: {
    marginBottom: 15,
  },
  successText: {
    fontSize: 16,
    // fontWeight: '500',
    color: '#000',
    textAlign: 'center',
    lineHeight: 24,
  },
  successDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
    width: '100%',
    justifyContent: 'center',
  },
  dividerLine: {
    height: 1,
    width: 40,
    backgroundColor: '#000',
    marginHorizontal: 10,
  },
  successFooter: {
    marginBottom: 25,
  },
  successFooterText: {
    fontSize: 14,
    // fontWeight: '500',
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  successActionButton: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 25,
  },
  successActionText: {
    fontSize: 14,
    // fontWeight: '700',
    color: '#000',
    letterSpacing: 0.5,
  },

       
  // Serial Number Badge
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
  fontSize: 20,
  // fontWeight: '700',
  color: '#000',
},

// Card Header modification (update from your existing style)
cardHeader: {
  flexDirection: 'row',
  alignItems: 'center', // Changed from 'space-between' to 'center'
  marginBottom: 15,
},
summaryIcon: {
  marginBottom: 5,
},
});

export default QuoteRequestPage;