import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Animated,
  Platform,
  Alert,
  Image,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import AppText from '../../../components/AppText';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';
import EditQuoteModal from './EditQuoteModal';

const {width, height} = Dimensions.get('window');

const QuoteRequestPage = ({navigation, route}) => {
  const [quotes, setQuotes] = useState([]);
  const [user, setUser] = useState(null);
  const {selectedCategory} = route.params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('buyerToken');
        if (!token) {
          Alert.alert('Please Login');
          return;
        }

        const responseQuotes = await axios.get(
          'http://192.168.1.27:9000/api/quotes/buyer',
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          },
        );

        const userRes = await axios.get(
          'http://192.168.1.27:9000/api/buyer',
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          },
        ); 
        setQuotes(responseQuotes?.data);
        setUser(userRes?.data?.user);
        console.log("user : " , user)
        setFormData(prev => ({
          ...prev,
          totalSqft: responseQuotes?.data?.totalSqft,
          contact: userRes?.data?.user?.mobileNumber,
        }));
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, []);

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
    category: selectedCategory?.name || 'Please select category',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const [editingItemId, setEditingItemId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // State for dropdowns
  const [stageOpen, setStageOpen] = useState(false);
  const [stageValue, setStageValue] = useState(null);
  const [stageItems, setStageItems] = useState([
    {label: 'Planning', value: 'planning'},
    {label: 'Under Construction', value: 'under construction'},
    {label: 'Ready to Move', value: 'ready to move'},
    {label: 'Other', value: 'other'},
  ]);

  const [timelineOpen, setTimelineOpen] = useState(false);
  const [timelineValue, setTimelineValue] = useState(null);
  const [timelineItems, setTimelineItems] = useState([
    {label: 'Immediate', value: 'immediate'},
    {label: '1-3 Months', value: '1-3 months'},
    {label: '3-6 Months', value: '3-6 months'},
    {label: '6+ Months', value: '6+ months'},
  ]);

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      projectStage: stageValue,
      timeline: timelineValue,
    }));
  }, [stageValue, timelineValue]);

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  }; 

  const handleSubmit = async () => { 
    const requiredFields = [
      'name',
      'contact',
      'email',
      'projectName',
      'projectAddress',
      'pincode',
      'gmapLocation',
      'whatsapp'
    ];
    for (const field of requiredFields) {
      if (!formData[field] || formData[field].trim() === '') {
        Alert.alert('Error', `Please fill in the ${field} field`);
        return;
      }
    }

    if (!quotes?.quotes || quotes.quotes.length === 0) {
      Alert.alert('Error', 'Please add at least one product to your quote');
      return;
    }
    try {
      setIsLoading(true);
      const token = await AsyncStorage.getItem('buyerToken');
      const leadData = {
        quotes: quotes.quotes.map(q => ({
          productType: q.productType,
          product: q.product?._id,
          color: q.color,
          installationLocation: q.installationLocation,
          height: q.height,
          width: q.width,
          quantity: q.quantity,
          remark: q.remark || '',
          sqft: q.sqft,
        })),
        contactInfo: {
          name: formData.name,
          contactNumber: formData.contact,
          whatsappNumber: formData.whatsapp || formData.contact,
          email: formData.email,
        },
        projectInfo: {
          name: formData.projectName,
          address: formData.projectAddress,
          pincode: formData.pincode,
          googleMapLink: formData.gmapLocation,
          stage: formData.projectStage,
          timeline: formData.timeline,
        },
        totalSqft: parseFloat(formData.totalSqft),
        categoryId: selectedCategory._id,
      };

      // console.log('Submitting lead data:', leadData);

      const response = await axios.post(
        'http://192.168.1.27:9000/api/seller/lead',
        leadData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      setIsSubmitted(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
    setIsLoading(false);
      // if (response.status === 201) { 
      //   setIsSubmitted(true);
      // }
    } catch (error) {
      console.error(
        'Error creating lead:',
        error.response?.data || error.message,
      );
      setIsLoading(false);
      Alert.alert(
        'Error',
        error.response?.data?.message ||
          'Failed to submit lead. Please try again.',
      );
    }
  };

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // Replace your existing handleEditItem with this:
  const handleEditItem = (quote) => {
    setCurrentQuote(quote);
    setIsEditModalVisible(true);
  };

  const handleUpdateQuote = async (updatedQuote) => {
    try {
      setIsUpdating(true);
      const token = await AsyncStorage.getItem('buyerToken');
      
      const response = await axios.put(
        `http://192.168.1.27:9000/api/quotes/${updatedQuote._id}`,
        updatedQuote,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) { 
        setIsEditModalVisible(false);
        const updatedQuotes = await axios.get(
          'http://192.168.1.27:9000/api/quotes/buyer',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setQuotes(updatedQuotes?.data); 
        Alert.alert('Success', 'Quote updated successfully');
      }
    } catch (error) {
      console.error('Error updating quote:', error);
      Alert.alert('Error', 'Failed to update quote');
    } finally{
        setIsUpdating(false);
    }
  };

  // const handleEditItem = itemId => {
  //   setEditingItemId(itemId);
  //   // In a real app, you would navigate to an edit screen or show a modal
  //   Alert.alert('Edit Item', 'Editing functionality would be implemented here');
  // };

  const handleDeleteItem = async quoteId => {
    try {
      const token = await AsyncStorage.getItem('buyerToken');
      await axios.delete(`http://192.168.1.27:9000/api/quotes/${quoteId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Refresh quotes after deletion
      const response = await axios.get(
        'http://192.168.1.27:9000/api/quotes/buyer',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setQuotes(response?.data);

      Alert.alert('Success', 'Quote deleted successfully');
    } catch (error) {
      console.error('Error deleting quote:', error);
      Alert.alert('Error', 'Failed to delete quote');
    }
  };

  const handleCloseSuccess = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setIsSubmitted(false);
      // navigation.navigate('BuyerMain');
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
        <AppText weight="SemiBold" style={styles.sectionTopHeader}>
          YOUR SELECTIONS
        </AppText>
        <View style={styles.itemsContainer}>
          {quotes?.quotes?.map((item, ind) => (
            <View key={ind} style={styles.itemCard}>
              <LinearGradient
                colors={['#f5f5f5', '#ffffff']}
                style={styles.cardGradient}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}>
                <View style={styles.cardHeader}>
                  <View style={styles.serialBadge}>
                    <AppText weight="SemiBold" style={styles.serialBadgeText}>
                      {ind + 1}
                    </AppText>
                  </View>
                  <View style={styles.cardActions}>
                    <TouchableOpacity
                      style={styles.editButton}
                      onPress={() => handleEditItem(item)}>
                      <Icon name="edit" size={18} color="#000" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => handleDeleteItem(item._id)}>
                      <Icon name="delete" size={18} color="#ff0000" />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.cardHeader}>
                  <AppText weight="Inter" style={styles.cardTitle}>
                    {item?.product?.title}
                  </AppText> 
                </View>

                <View style={styles.itemGrid}>
                  <View style={styles.itemColumn}>
                    <View style={styles.itemField}>
                      <AppText weight="Inter" style={styles.itemLabel}>
                        COLOR
                      </AppText>
                      <AppText weight="SemiBold" style={styles.itemValue}>
                        {item.color}
                      </AppText>
                    </View>
                    <View style={styles.itemField}>
                      <AppText weight="Inter" style={styles.itemLabel}>
                        HEIGHT
                      </AppText>
                      <AppText weight="SemiBold" style={styles.itemValue}>
                        {item.height} ft
                      </AppText>
                    </View>
                    <View style={styles.itemField}>
                      <AppText weight="Inter" style={styles.itemLabel}>
                        WIDTH
                      </AppText>
                      <AppText weight="SemiBold" style={styles.itemValue}>
                        {item.width} ft
                      </AppText>
                    </View>
                  </View>

                  <View style={styles.itemColumn}>
                    <View style={styles.itemField}>
                      <AppText weight="Inter" style={styles.itemLabel}>
                        LOCATION
                      </AppText>
                      <AppText weight="SemiBold" style={styles.itemValue}>
                        {item.installationLocation}
                      </AppText>
                    </View>
                    <View style={styles.itemField}>
                      <AppText weight="Inter" style={styles.itemLabel}>
                        QUANTITY
                      </AppText>
                      <AppText weight="SemiBold" style={styles.itemValue}>
                        {item.quantity}
                      </AppText>
                    </View>
                  </View>
                </View>

                <View style={styles.totalContainer}>
                  <AppText weight="Inter" style={styles.totalLabel}>
                    TOTAL
                  </AppText>
                  <AppText weight="Inter" style={styles.totalValue}>
                    {item.sqft} sqft
                  </AppText>
                </View>

                {item.remarks && (
                  <View style={styles.remarksContainer}>
                    <AppText weight="SemiBold" style={styles.remarksLabel}>
                      REMARKS
                    </AppText>
                    <AppText weight="Inter" style={styles.remarksValue}>
                      {item.remark}
                    </AppText>
                  </View>
                )}
              </LinearGradient>
            </View>
          ))}
          <View style={styles.summaryCard}>
            <View style={styles.summaryItem}>
              <Icon
                name="straighten"
                size={20}
                color="#000"
                style={styles.summaryIcon}
              />
              <AppText weight="Inter" style={styles.summaryLabel}>
                TOTAL SQ FT
              </AppText>
              <AppText weight="Inter" style={styles.summaryValue}>
                {quotes?.totalSqft}
              </AppText>
            </View>

            <View style={styles.summaryItem}>
              <Icon
                name="format-list-numbered"
                size={20}
                color="#000"
                style={styles.summaryIcon}
              />
              <AppText weight="Inter" style={styles.summaryLabel}>
                TOTAL QUANTITY
              </AppText>
              <AppText weight="Inter" style={styles.summaryValue}>
                {quotes?.totalQuantity}
              </AppText>
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
          <AppText weight="Inter" style={styles.sectionHeader}>
            PERSONAL DETAILS
          </AppText>
          <View style={styles.inputRow}>
            <View style={[styles.inputContainer, styles.inputWithIcon]}>
              <Icon
                name="person"
                size={20}
                color="#000"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                placeholderTextColor="#999"
                value={formData.name}
                onChangeText={text => handleInputChange('name', text)}
              />
            </View>
          </View>

          <View style={styles.inputRow}>
            <View style={[styles.inputContainer, styles.inputWithIcon]}>
              <Icon
                name="phone"
                size={20}
                color="#000"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Contact Number"
                placeholderTextColor="#999"
                keyboardType="phone-pad"
                value={formData.contact}
                // onChangeText={text => handleInputChange('contact', text)}
              />
            </View>

            <View style={[styles.inputContainer, styles.inputWithIcon]}>
              <Icon
                name="chat"
                type="font-awesome"
                size={20}
                color="#000"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="WhatsApp"
                placeholderTextColor="#999"
                keyboardType="phone-pad"
                value={formData.whatsapp}
                onChangeText={text => handleInputChange('whatsapp', text)}
              />
            </View>
          </View>

          <View style={styles.inputRow}>
            <View style={[styles.inputContainer, styles.inputWithIcon]}>
              <Icon
                name="email"
                size={20}
                color="#000"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Email Address"
                placeholderTextColor="#999"
                keyboardType="email-address"
                value={formData.email}
                onChangeText={text => handleInputChange('email', text)}
              />
            </View>
          </View>

          <AppText weight="Inter" style={styles.sectionHeader}>
            PROJECT DETAILS
          </AppText>
          <View style={styles.inputRow}>
            <View style={[styles.inputContainer, styles.inputWithIcon]}>
              <Icon
                name="business"
                size={20}
                color="#000"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Project Name"
                placeholderTextColor="#999"
                value={formData.projectName}
                onChangeText={text => handleInputChange('projectName', text)}
              />
            </View>
          </View>

          <View style={styles.inputRow}>
            <View style={[styles.inputContainer, styles.inputWithIcon]}>
              <Icon
                name="location-on"
                size={20}
                color="#000"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Project Address"
                placeholderTextColor="#999"
                multiline
                value={formData.projectAddress}
                onChangeText={text => handleInputChange('projectAddress', text)}
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
                onChangeText={text => handleInputChange('pincode', text)}
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Google Map Link"
                placeholderTextColor="#999"
                value={formData.gmapLocation}
                onChangeText={text => handleInputChange('gmapLocation', text)}
              />
            </View>
          </View>

          <View style={styles.dropdownInputRow}>
            <View style={[styles.dropdownContainer, {zIndex: 2000}]}>
              <AppText weight="Inter" style={styles.dropdownLabel}>
                PROJECT STAGE
              </AppText>
              <DropDownPicker
                open={stageOpen}
                value={stageValue}
                items={stageItems}
                setOpen={setStageOpen}
                setValue={setStageValue}
                setItems={setStageItems}
                placeholder="Select project stage"
                style={styles.dropdown}
                dropDownContainerStyle={styles.dropdownList}
                textStyle={styles.dropdownText}
                placeholderStyle={styles.dropdownPlaceholder}
                zIndex={2000}
                zIndexInverse={1000}
              />
            </View>

            <View style={[styles.dropdownContainer, {zIndex: 1000}]}>
              <AppText weight="Inter" style={styles.dropdownLabel}>
                TIMELINE
              </AppText>
              <DropDownPicker
                open={timelineOpen}
                value={timelineValue}
                items={timelineItems}
                setOpen={setTimelineOpen}
                setValue={setTimelineValue}
                setItems={setTimelineItems}
                placeholder="Select timeline"
                style={styles.dropdown}
                dropDownContainerStyle={styles.dropdownList}
                textStyle={styles.dropdownText}
                placeholderStyle={styles.dropdownPlaceholder}
                zIndex={1000}
                zIndexInverse={2000}
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
                value={`${formData.totalSqft?.toString()} sqft` || ''}
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Category"
                placeholderTextColor="#999"
                value={formData.category}
              />
            </View>
          </View>

          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit}
            disabled={isLoading}>
            <LinearGradient
              colors={['#000000', '#000000']}
              style={styles.buttonGradient}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}>
              {isLoading && <ActivityIndicator color="#fff" />}
              <AppText weight="Inter" style={styles.submitButtonText}>
                GENERATE LEAD
              </AppText>
              <Icon
                name="arrow-forward"
                size={22}
                color="#fff"
                style={styles.buttonIcon}
              />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderSuccessMessage = () => {
    return (
      <Animated.View style={[styles.successContainer, {opacity: fadeAnim}]}>
        <View style={styles.successOverlay} />
        <View style={styles.successCard}>
          <LinearGradient
            colors={['#ffffff', '#f9f9f9']}
            style={styles.successGradient}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleCloseSuccess}>
              <Icon name="close" size={24} color="#000" />
            </TouchableOpacity>

            <View style={styles.successIconContainer}>
              <Icon name="check-circle" size={60} color="#000" />
            </View>

            <AppText weight="SemiBold" style={styles.successTitle}>
              THANK YOU!
            </AppText>

            <View style={styles.successMessageContainer}>
              <AppText weight="SemiBold" style={styles.successText}>
                Your quote request has been
              </AppText>
              <AppText weight="SemiBold" style={styles.successText}>
                successfully submitted
              </AppText>
            </View>

            <View style={styles.successDivider}>
              <View style={styles.dividerLine} />
              <Icon name="star" size={18} color="#000" />
              <View style={styles.dividerLine} />
            </View>

            <View style={styles.successFooter}>
              <AppText weight="Inter" style={styles.successFooterText}>
                Our team will contact you
              </AppText>
              <AppText weight="Inter" style={styles.successFooterText}>
                within 24 hours with
              </AppText>
              <AppText weight="Inter" style={styles.successFooterText}>
                competitive quotes
              </AppText>
            </View>

            <TouchableOpacity
              style={styles.successActionButton}
              onPress={handleCloseSuccess}>
              <AppText weight="SemiBold" style={styles.successActionText}>
                BACK TO HOME
              </AppText>
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
        showsVerticalScrollIndicator={false}>
        {renderSelectedItems()}
        {!isSubmitted ? renderForm() : null}
      </ScrollView>
      {isSubmitted && renderSuccessMessage()}
      <EditQuoteModal
        visible={isEditModalVisible}
        onClose={() => setIsEditModalVisible(false)}
        quote={currentQuote}
        onUpdate={handleUpdateQuote}
        isLoading={isUpdating}
      />
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
    position: 'relative',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },

  backButton: {
    position: 'absolute',
    left: 10,
    top: '50%',
    transform: [{translateY: -12}],
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
    color: '#000',
    paddingBottom: 30,
    letterSpacing: 1,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  sectionHeader: {
    fontSize: 14,
    color: '#000',
    marginBottom: 20,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  sectionSubHeader: {
    fontSize: 16,
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
    marginBottom:14,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 6},
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
  cardTitle: {
    fontSize: 16,
    color: '#000',
    letterSpacing: 0.5,
    marginBottom: 15,
    marginTop: 5,
  },
  editButton: {
    padding: 5,
    marginLeft: 10,
  },
  deleteButton: {
    padding: 5,
    marginLeft: 10,
  },
  cardActions: {
    flexDirection: 'row',
    alignItems: 'center',
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
    color: '#666',
    marginBottom: 2,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  itemValue: {
    fontSize: 14,
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
    color: '#000',
    textTransform: 'uppercase',
  },
  totalValue: {
    fontSize: 16,
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
    color: '#666',
    marginBottom: 2,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  remarksValue: {
    fontSize: 13,
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
        shadowOffset: {width: 0, height: 6},
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
  dropdownInputRow: {
    flexDirection: 'col',
    // justifyContent: 'space-between',
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
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.3,
        shadowRadius: 6,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  buttonGradient: {
    paddingVertical: 12,
    // paddingHorizontal: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: '#fff',
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
    color: '#000',
    letterSpacing: 0.5,
  },
  serialBadge: {
    backgroundColor: '#000',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  serialBadgeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },

  // Summary Card
  summaryCard: {
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
    // marginTop: 20,
    borderRadius: 12,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
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

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    justifyContent:"space-between"
  },
  summaryIcon: {
    marginBottom: 5,
  },
  dropdownContainer: {
    flex: 1,
    marginHorizontal: 5,
    marginBottom: 15,
  },
  dropdownLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  dropdown: {
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    borderRadius: 0,
    paddingHorizontal: 0,
    backgroundColor: 'transparent',
  },
  dropdownList: {
    borderWidth: 0,
    marginTop: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dropdownText: {
    fontSize: 14,
    color: '#000',
  },
  dropdownPlaceholder: {
    fontSize: 14,
    color: '#999',
  },
});

export default QuoteRequestPage;
