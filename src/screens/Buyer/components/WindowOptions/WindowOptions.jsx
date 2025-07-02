import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  TextInput,
  Modal, 
  Animated,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Video from 'react-native-video';
import DropDownPicker from 'react-native-dropdown-picker';
import {State} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import TopTabBar from '../../Dashboard/TopTabBar';
import AppText from '../../../../components/AppText';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const {width, height} = Dimensions.get('window');

const WindowOptions = () => {
  
  const insets = useSafeAreaInsets();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [currentDesignIndex, setCurrentDesignIndex] = useState(0);
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [addedQuotes, setAddedQuotes] = useState([]);
  const [quoteCount, setQuoteCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [windowDesigns, setWindowDesigns] = useState([]);
  const [buyerId, setBuyerId] = useState(null);
  const navigation = useNavigation();
  const [quoteData, setQuoteData] = useState({
    color: '',
    location: '',
    height: '',
    width: '',
    quantity: '',
    remarks: '',
  });

  // Dropdown states for color
  const [colorOpen, setColorOpen] = useState(false);
  const [colorValue, setColorValue] = useState(null);
  const [colorItems, setColorItems] = useState([
    {label: 'White', value: 'white'},
    {label: 'Black', value: 'black'},
    {label: 'Wooden Brown', value: 'brown'},
    {label: 'Silver Grey', value: 'grey'},
    {label: 'Golden Oak', value: 'golden'},
  ]);

  // Dropdown states for location
  const [locationOpen, setLocationOpen] = useState(false);
  const [locationValue, setLocationValue] = useState(null);
  const [locationItems, setLocationItems] = useState([
    {label: 'Balcony', value: 'balcony'},
    {label: 'Living Room', value: 'living_room'},
    {label: 'Bedroom', value: 'bedroom'},
    {label: 'Kitchen', value: 'kitchen'},
    {label: 'Bathroom', value: 'bathroom'},
  ]);

  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);

  // useEffect(() => {
    
  //   const fetchData = async () => {
  //     try {  
  //       const token = await AsyncStorage.getItem('buyerToken');
  //       if(!token){
  //         return
  //       }
  //       if (token) { 
  //         setBuyerId(token); 
  //       }
 
  //       const response = await axios.get('https://upvc-backend.onrender.com/api/options');
  //       const formattedData = response.data.map(item => ({
  //         id: item._id,
  //         name: item.title.toUpperCase(),
  //         count: item.subOptions.length,
  //         designs: item.subOptions.map(subItem => ({
  //           id: subItem._id,
  //           title: subItem.title,
  //           video: subItem.videoUrl,
  //           features: subItem.features
  //         }))
  //       }));
  //       setWindowDesigns(formattedData);

  //       const responseQuotes = await axios.get('https://upvc-backend.onrender.com/api/quotes/buyer', {
  //         headers: {
  //           'Authorization': `Bearer ${token}`,
  //           'Content-Type': 'application/json'
  //         }
  //       })
  //       setQuoteCount(responseQuotes?.data?.count)

  //     } catch (err) {
  //       setError(err.message);
  //       console.error('Error fetching data:', err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);
  
  useEffect(() => {
    const fetchData = async () => {
      try {  
        const token = await AsyncStorage.getItem('buyerToken');
        setIsLoggedIn(!!token); // Set login status based on token existence
        
        if (token) { 
          setBuyerId(token);
          // Only fetch quotes if logged in
          const responseQuotes = await axios.get('https://upvc-backend.onrender.com/api/quotes/buyer', {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          setQuoteCount(responseQuotes?.data?.count);
        }

        const response = await axios.get('https://upvc-backend.onrender.com/api/options');
        const formattedData = response.data.map(item => ({
          id: item._id,
          name: item.title.toUpperCase(),
          count: item.subOptions.length,
          designs: item.subOptions.map(subItem => ({
            id: subItem._id,
            title: subItem.title,
            video: subItem.videoUrl,
            features: subItem.features
          }))
        }));
        setWindowDesigns(formattedData);

      } catch (err) {
        setError(err.message);
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleRequestQuote = () => {
    const finalQuoteData = {
      ...quoteData,
      color: colorValue,
      location: locationValue,
    };
    console.log('Quote requested:', finalQuoteData);
    setShowQuoteForm(false);
    
    // Reset form
    setColorValue(null);
    setLocationValue(null);
    setQuoteData({
      color: '',
      location: '',
      height: '',
      width: '',
      quantity: '',
      remark: '',
    });
    
    navigation.navigate('BuyerMain', {screen: 'BuyerInsights'});
  };

  const handleDesignSelection = design => {
    if (selectedDesign && selectedDesign.id === design.id) {
      setSelectedDesign(null);
      setCurrentDesignIndex(0);
    } else {
      setSelectedDesign(design);
      setCurrentDesignIndex(0);
    }
  };

  const handleNext = () => {
    if (currentDesignIndex < selectedDesign.designs.length - 1) {
      const newIndex = currentDesignIndex + 1;
      setCurrentDesignIndex(newIndex);
      flatListRef.current?.scrollToIndex({index: newIndex, animated: true});
    }
  };

  const handlePrev = () => {
    if (currentDesignIndex > 0) {
      const newIndex = currentDesignIndex - 1;
      setCurrentDesignIndex(newIndex);
      flatListRef.current?.scrollToIndex({index: newIndex, animated: true});
    }
  };
  
  const onViewableItemsChanged = useRef(({viewableItems}) => {
    if (viewableItems.length > 0) {
      setCurrentDesignIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;
 
const handleAddQuote = async () => {

  try {  
    const token = await AsyncStorage.getItem('buyerToken');
    
    if (!token) {
      Alert.alert('Login Required', 'Please login to generate a quote');
      setShowQuoteForm(false);
      return;
    }
     
    if (!token || !selectedDesign || !colorValue || !locationValue || 
        !quoteData.height || !quoteData.width || !quoteData.quantity) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    const currentDesign = selectedDesign.designs[currentDesignIndex];
    
    const newQuote = { 
      productType: selectedDesign.name.toLowerCase().replace(/\s+/g, '-'),
      product: currentDesign.id,
      color: colorValue,
      installationLocation: locationValue,
      height: parseFloat(quoteData.height),
      width: parseFloat(quoteData.width),
      quantity: parseInt(quoteData.quantity),
      remark: quoteData.remarks || '',
    };

    const success = await submitQuote(newQuote, token); // Pass token for auth
    if (success) {
      setAddedQuotes([...addedQuotes, newQuote]);
      setQuoteCount(quoteCount + 1);
      
      // Reset form
      setColorValue(null);
      setLocationValue(null);
      setQuoteData({
        color: '',
        location: '',
        height: '',
        width: '',
        quantity: '',
        remark: '',
      });
      setShowQuoteForm(false);
    }
  } catch (error) {
    console.error('Error adding quote:', error);
    Alert.alert('Error', 'Failed to submit quote');
  }
};

const submitQuote = async (quoteData, token) => {
  try {
    const response = await axios.post('https://upvc-backend.onrender.com/api/quotes', quoteData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.status === 200 || response.status === 201;
  } catch (error) {
    console.error('Error submitting quote:', error);
    throw error;
  }
};

  const renderDesignItem = ({item}) => (
    <View style={styles.carouselItem}>
      <AppText weight="Inter" style={styles.videoTitle}>
        {item.title}
      </AppText>
      <View style={styles.videoContainer}>
        <Video
          source={{uri: item.video}}
          style={styles.videoPlayer}
          paused={false}
          repeat={true}
          resizeMode="cover"
          controls={true}
        />
      </View>
    </View>
  );

  const renderFeatureItem = (feature, index) => (
    <View key={index} style={styles.featureItem}>
      <Icon name="check-circle" size={18} color="black" />
      <AppText weight="Inter" style={styles.featureText}>
        {feature}
      </AppText>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <AppText style={styles.errorText}>Error loading window options: {error}</AppText>
      </View>
    );
  }

  return (
    <View style={{paddingTop: insets.top, flex: 1, backgroundColor: 'white'}}>
      <View style={styles.container}>
        <View style={styles.Headercontainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={30} color="#000" />
          </TouchableOpacity>
          <View style={styles.logoContainer}>
            <Image
              source={require('../../../../assets/logo.png')}
              style={styles.logo}
            />
          </View>
        </View>
        <TopTabBar />
        <ScrollView 
          contentContainerStyle={[
            styles.scrollContainer, 
            windowDesigns.length < 3 && {justifyContent: 'flex-start'}
          ]}
        >
          <AppText weight="Inter" style={styles.screenTitle}>
            CHOOSE DESIGN FOR QUOTE
          </AppText>
          
          {/* {quoteCount > 0 && (
            <View style={styles.topQuote}>
              <TouchableOpacity
                style={styles.floatingButton}
                onPress={() =>
                  navigation.navigate('QuoteRequestPage', {quotes: addedQuotes})
                }>
                <View style={styles.badge}>
                  <AppText weight="Inter" style={styles.badgeText}>
                    {quoteCount}
                  </AppText>
                </View>
                <AppText weight="Inter" style={styles.floatingButtonText}>
                  View
                </AppText>
              </TouchableOpacity>

              <View style={styles.categoryButton}>
                <TouchableOpacity
                  style={styles.submitButton2}
                  onPress={handleRequestQuote}>
                  <AppText weight="Inter" style={styles.submitButtonText}>
                    Select Categories
                  </AppText>
                </TouchableOpacity>
              </View>
            </View>
          )} */}
          {isLoggedIn && quoteCount > 0 && (
  <View style={styles.topQuote}>
    <TouchableOpacity
      style={styles.floatingButton}
      onPress={() =>
        navigation.navigate('QuoteRequestPage', {quotes: addedQuotes})
      }>
      <View style={styles.badge}>
        <AppText weight="Inter" style={styles.badgeText}>
          {quoteCount}
        </AppText>
      </View>
      <AppText weight="Inter" style={styles.floatingButtonText}>
        View
      </AppText>
    </TouchableOpacity>

    <View style={styles.categoryButton}>
      <TouchableOpacity
        style={styles.submitButton2}
        onPress={handleRequestQuote}>
        <AppText weight="Inter" style={styles.submitButtonText}>
          Select Categories
        </AppText>
      </TouchableOpacity>
    </View>
  </View>
)}
          {windowDesigns.map(design => (
            <React.Fragment key={design.id}>
              <TouchableOpacity
                style={[
                  styles.designCard,
                  selectedDesign?.id === design.id && styles.selectedDesignCard,
                ]}
                onPress={() => handleDesignSelection(design)}>
                <AppText weight="Medium" style={styles.designName}>
                  {design.name}
                </AppText>
                <View style={styles.countBadge}>
                  <AppText style={styles.countText}>{design.count}</AppText>
                </View>
              </TouchableOpacity>
              {selectedDesign?.id === design.id && (
                <View style={styles.designDetails}>
                  <View>
                    <Animated.FlatList
                      ref={flatListRef}
                      data={selectedDesign.designs}
                      renderItem={renderDesignItem}
                      keyExtractor={item => item.id.toString()}
                      horizontal
                      pagingEnabled
                      showsHorizontalScrollIndicator={false}
                      onScroll={Animated.event(
                        [{nativeEvent: {contentOffset: {x: scrollX}}}],
                        {useNativeDriver: true},
                      )}
                      onViewableItemsChanged={onViewableItemsChanged}
                      viewabilityConfig={viewabilityConfig}
                      initialScrollIndex={currentDesignIndex}
                      getItemLayout={(data, index) => ({
                        length: width - 40,
                        offset: (width - 40) * index,
                        index,
                      })}
                    />
                  </View>
                  <View style={styles.dotsContainer}>
                    {selectedDesign.designs.map((_, index) => (
                      <View
                        key={index}
                        style={[
                          styles.dot,
                          index === currentDesignIndex && styles.activeDot,
                        ]}
                      />
                    ))}
                  </View>
                  <View style={styles.navButtons}>
                    <TouchableOpacity
                      style={[
                        styles.navButton,
                        currentDesignIndex === 0 && styles.disabledNavButton,
                      ]}
                      onPress={handlePrev}
                      disabled={currentDesignIndex === 0}>
                      <Icon name="chevron-left" size={24} color="black" />
                    </TouchableOpacity>
                    <AppText weight="Inter" style={styles.counterText}>
                      {currentDesignIndex + 1} / {selectedDesign.designs.length}
                    </AppText>
                    <TouchableOpacity
                      style={[
                        styles.navButton,
                        currentDesignIndex ===
                          selectedDesign.designs.length - 1 &&
                          styles.disabledNavButton,
                      ]}
                      onPress={handleNext}
                      disabled={
                        currentDesignIndex === selectedDesign.designs.length - 1
                      }>
                      <Icon name="chevron-right" size={24} color="black" />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.featuresContainer}>
                    <AppText weight="weight=" style={styles.featuresTitle}>
                      Key Features:
                    </AppText>
                    {selectedDesign.designs[currentDesignIndex]?.features?.map((feature, index) => 
                      renderFeatureItem(feature, index)
                    )}
                  </View>
                  {/* <TouchableOpacity
                    style={styles.quoteButton}
                    onPress={() => setShowQuoteForm(true)}>
                    <AppText weight="Inter" style={styles.quoteButtonText}>
                      REQUEST FOR QUOTE
                    </AppText>
                  </TouchableOpacity> */}
                  <TouchableOpacity
                    style={styles.quoteButton}
                    onPress={() => {
                      if (!isLoggedIn) {
                        Alert.alert('Login Required', 'Please login to generate a quote');
                        return;
                      }
                      setShowQuoteForm(true);
                    }}>
                    <AppText weight="Inter" style={styles.quoteButtonText}>
                      REQUEST FOR QUOTE
                    </AppText>
                  </TouchableOpacity>
                </View>
              )}
            </React.Fragment>
          ))}
        </ScrollView>
        <Modal
          visible={showQuoteForm}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setShowQuoteForm(false)}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.modalOverlay}>
            <ScrollView contentContainerStyle={styles.modalScrollContent}>
              <View style={styles.modalContainer}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Image
                    source={require('../../../../assets/logo.png')}
                    style={styles.logo}
                  />
                </View>
                <AppText weight="Inter" style={styles.modalTitle}>
                  Request Quote
                </AppText>
                <View style={styles.inputContainer1}>
                  <AppText weight="Inter" style={styles.inputLabel}>
                    COLOR
                  </AppText>
                  <DropDownPicker
                    open={colorOpen}
                    value={colorValue}
                    items={colorItems}
                    setOpen={setColorOpen}
                    setValue={setColorValue}
                    setItems={setColorItems}
                    style={styles.dropdown}
                    dropDownContainerStyle={styles.dropdownContainer}
                    placeholder="Select a color"
                    zIndex={3000}
                    zIndexInverse={1000}
                  />
                </View>
                <View style={styles.inputContainer2}>
                  <AppText weight="Inter" style={styles.inputLabel}>
                    WHERE
                  </AppText>
                  <DropDownPicker
                    open={locationOpen}
                    value={locationValue}
                    items={locationItems}
                    setOpen={setLocationOpen}
                    setValue={setLocationValue}
                    setItems={setLocationItems}
                    style={styles.dropdown}
                    dropDownContainerStyle={styles.dropdownContainer}
                    placeholder="Select location"
                    zIndex={2000}
                    zIndexInverse={2000}
                  />
                </View>
                <View style={styles.sizeContainer}>
                  <View style={styles.sizeInput}>
                    <AppText weight="Inter" style={styles.inputLabel}>
                      HEIGHT (ft)
                    </AppText>
                    <TextInput
                      style={styles.textInput}
                      keyboardType="numeric"
                      onChangeText={text =>
                        setQuoteData({...quoteData, height: text})
                      }
                      placeholder="Enter height"
                      value={quoteData.height}
                    />
                  </View>
                  <View style={styles.sizeInput}>
                    <AppText weight="Inter" style={styles.inputLabel}>
                      WIDTH (ft)
                    </AppText>
                    <TextInput
                      style={styles.textInput}
                      keyboardType="numeric"
                      onChangeText={text =>
                        setQuoteData({...quoteData, width: text})
                      }
                      placeholder="Enter width"
                      value={quoteData.width}
                    />
                  </View>
                </View>
                <View style={styles.inputContainer}>
                  <AppText weight="Inter" style={styles.inputLabel}>
                    QUANTITY
                  </AppText>
                  <TextInput
                    style={styles.textInput}
                    keyboardType="numeric"
                    onChangeText={text =>
                      setQuoteData({...quoteData, quantity: text})
                    }
                    placeholder="Enter quantity"
                    value={quoteData.quantity}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <AppText weight="Inter" style={styles.inputLabel}>
                    REMARKS
                  </AppText>
                  <TextInput
                    style={[
                      styles.textInput,
                      {height: 80, textAlignVertical: 'top'},
                    ]}
                    multiline
                    numberOfLines={4}
                    onChangeText={text =>
                      setQuoteData({...quoteData, remarks: text})
                    }
                    placeholder="Any special requirements or notes"
                    value={quoteData.remarks}
                  />
                </View>
                <View style={styles.formActions}>
                  <View style={styles.actionButtons}>
                    <TouchableOpacity
                      style={styles.cancelButton}
                      onPress={() => setShowQuoteForm(false)}>
                      <AppText weight="Inter" style={styles.cancelButtonText}>
                        CANCEL
                      </AppText>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.cancelButton}
                      onPress={handleAddQuote}>
                      <AppText weight="Inter" style={styles.cancelButtonText}>
                        ADD
                      </AppText>
                    </TouchableOpacity>
                  </View> 
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: 'white',
    paddingBottom: 25,
  },
  Headercontainer: {
    // position: 'relative',
    // height: 80,
    // justifyContent: 'center',
    // alignItems: 'center',
    // marginBottom: 10,
  },
  backButton: { 
    position: 'absolute',
    left: 10,
    top: '30%',
    transform: [{translateY: -12}],
    padding: 5,
  },
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    // paddingTop: 20,
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  logo: {
    width: 100,
    height: 50,
    // resizeMode: 'contain',
  }, 
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  screenTitle: {
    fontSize: 20,
    color: 'black',
    marginBottom: 25,
    textAlign: 'center',
    letterSpacing: 2,
  },
  topQuote: {
    paddingHorizontal: 20,
  },
  designCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 18,
    marginBottom: 12,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedDesignCard: {
    borderColor: 'black',
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  designName: {
    fontSize: 14,
    color: 'black',
    flex: 1,
    letterSpacing:2,
  },
  countBadge: {
    backgroundColor: 'black',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  countText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 10,
  },
  designDetails: {
    marginVertical: 30,
  },
  carouselItem: {
    width: width - 40,
    paddingHorizontal: 10,
  },
  videoContainer: {
    height: 200,
    backgroundColor: 'black',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 20,
  },
  videoPlayer: {
    width: '100%',
    height: '100%',
  },
  videoTitle: {
    textAlign: 'center',
    fontSize: 16,
    color: 'black',
    marginBottom: 15,
  },
  featuresContainer: {
    marginBottom: 25,
    marginHorizontal:15,
  },
  featuresTitle: {
    fontSize: 14,
    color: 'black',
    marginBottom: 15,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  featureText: {
    fontSize: 12,
    color: 'black',
    marginLeft: 10,
  },
  quoteButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  quoteButtonText: {
    color: 'white',
    fontSize: 14,
    letterSpacing: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalScrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  modalContainer: {
    width: width - 40,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    color: 'black',
    paddingBottom:10,
    // marginVertical: 25,
    // marginTop: 50,
    textAlign: 'center',
  },
  inputContainer1: {
    marginBottom: 20,
    zIndex: 4,
  },
  inputContainer2: {
    marginBottom: 20,
    zIndex: 3,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 12,
    color: 'black',
    marginBottom: 8,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 4,
    backgroundColor: 'white',
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: 'white',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 4,
    padding: 12,
    fontSize: 14,
    color: 'black',
    backgroundColor: 'white',
  },
  sizeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  sizeInput: {
    width: '48%',
  },
  formActions: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    // marginTop: 15,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  categoryButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 6,
    padding: 14,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: 'black',
  },
  submitButton: {
    backgroundColor: 'black',
    borderRadius: 6,
    padding: 14,
    flex: 1,
    alignItems: 'center',
  },
  submitButton2: {
    backgroundColor: 'black',
    borderRadius: 6,
    padding: 6,
    flex: 1,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
  },
  navButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  navButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  disabledNavButton: {
    opacity: 0.5,
  },
  counterText: {
    fontSize: 16,
    color: 'black',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
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
  floatingButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: 6,
    padding: 6,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  badge: {
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
  },
  floatingButtonText: {
    color: 'white',
    fontSize: 14,
  },
});

export default WindowOptions;
 
    // },
    // {
    //   id: 3,
    //   name: 'CASEMENT WINDOWS',
    //   count: 4,
    //   designs: [
    //     {
    //       id: 1,
    //       title: 'Single Casement Window',
    //       video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    //     },
    //     {
    //       id: 2,
    //       title: 'Double Casement Window',
    //       video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    //     },
    //     {
    //       id: 3,
    //       title: 'French Casement Window',
    //       video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    //     },
    //     {
    //       id: 4,
    //       title: 'Push-out Casement Window',
    //       video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    //     },
    //   ],
    // },
    // {
    //   id: 4,
    //   name: 'CASEMENT DOORS',
    //   count: 3,
    //   designs: [
    //     {
    //       id: 1,
    //       title: 'Single Casement Door',
    //       video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    //     },
    //     {
    //       id: 2,
    //       title: 'Double Casement Door',
    //       video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    //     },
    //     {
    //       id: 3,
    //       title: 'French Casement Door',
    //       video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    //     },
    //   ],
    // },
    // {
    //   id: 5,
    //   name: 'FIXED WINDOWS',
    //   count: 1,
    //   designs: [
    //     {
    //       id: 1,
    //       title: 'Standard Fixed Window',
    //       video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    //     },
    //   ],
    // },
    // {
    //   id: 6,
    //   name: 'BATHROOM VENTILATORS',
    //   count: 4,
    //   designs: [
    //     {
    //       id: 1,
    //       title: 'Small Ventilator',
    //       video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    //     },
    //     {
    //       id: 2,
    //       title: 'Medium Ventilator',
    //       video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    //     },
    //     {
    //       id: 3,
    //       title: 'Large Ventilator',
    //       video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    //     },
    //     {
    //       id: 4,
    //       title: 'Decorative Ventilator',
    //       video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    //     },
    //   ],
    // },
    // {
    //   id: 7,
    //   name: 'COMBINATION WINDOWS',
    //   count: 4,
    //   designs: [
    //     {
    //       id: 1,
    //       title: 'Slider + Fixed Combo',
    //       video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    //     },
    //     {
    //       id: 2,
    //       title: 'Casement + Fixed Combo',
    //       video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    //     },
    //     {
    //       id: 3,
    //       title: 'Bay Window Combo',
    //       video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    //     },
    //     {
    //       id: 4,
    //       title: 'Bow Window Combo',
    //       video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    //     },
    //   ],
    // },
    // {
    //   id: 8,
    //   name: 'SPECIAL ARCHITECTURAL WINDOWS',
    //   count: 8,
    //   designs: [
    //     {
    //       id: 1,
    //       title: 'Arch Top Window',
    //       video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    //     },
    //     {
    //       id: 2,
    //       title: 'Circle Window',
    //       video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    //     },
    //     {
    //       id: 3,
    //       title: 'Hexagon Window',
    //       video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    //     },
    //     {
    //       id: 4,
    //       title: 'Octagon Window',
    //       video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    //     },
    //     {
    //       id: 5,
    //       title: 'Triangle Window',
    //       video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    //     },
    //     {
    //       id: 6,
    //       title: 'Gothic Window',
    //       video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    //     },
    //     {
    //       id: 7,
    //       title: 'Elliptical Window',
    //       video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    //     },
    //     {
    //       id: 8,
    //       title: 'Custom Shape Window',
    //       video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    //     },
    //   ],
    // },