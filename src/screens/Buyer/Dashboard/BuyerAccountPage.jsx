import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Image,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AppText from '../../../components/AppText';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import axios from 'axios';
import PremiumLoginModal from '../../../components/PremiumLoginModal';

const {width, height} = Dimensions.get('window');

const UserAccount = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [editing, setEditing] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [hoverRating, setHoverRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(false);
  const [token, setToken] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  // console.log("userData : " , userData)

  const fetchData = async () => {
    const token = await AsyncStorage.getItem('buyerToken');
    setToken(token);
    if (!token) {
      setShowLoginModal(true);
      // Alert.alert('Login Required', 'Please login to Select a Category');
      // setShowQuoteForm(false);
      return;
    }
    try {
      setLoading(true);
      // Fetch video data
      const userResponse = await axios.get(
        'http://10.7.10.49:9000/api/buyer',
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      // console.log("userResponse : " , userResponse.data.user)
      if (userResponse.data) {
        setUserData(userResponse.data?.user);
        setName(userResponse.data?.user?.name);
        setPhone(userResponse.data?.user?.mobileNumber);
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching User data:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const handleUpdateProfile = async () => {
    try {
      const token = await AsyncStorage.getItem('buyerToken');
      setLoading(true);

      const response = await axios.patch(
        `http://10.7.10.49:9000/api/buyer/update`,
        {name, mobileNumber: phone},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );

      setUserData(response?.data);
      setEditing(false);

      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Success',
        text2: 'Profile updated successfully',
        visibilityTime: 3000,
      });
    } catch (error) {
      console.error('Update error:', error);
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: error.response?.data?.error || 'Failed to update profile',
        visibilityTime: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitFeedback = async () => {
    try {
      const token = await AsyncStorage.getItem('buyerToken');
      setLoading(true);

      await axios.post(
        'http://10.7.10.49:9000/api/feedback',
        {
          name: userData?.name,
          phone: userData?.mobileNumber,
          text: feedback,
          stars: rating,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );

      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Thank you!',
        text2: 'Your feedback has been submitted',
        visibilityTime: 3000,
      });

      setRating(0);
      setFeedback('');
    } catch (error) {
      console.error('Feedback error:', error);
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: 'Failed to submit feedback',
        visibilityTime: 3000,
      });
    } finally {
      setLoading(false); 
    }
  };

  const handleSendMessage = () => {
    // Navigate to contact screen or open message interface
    // navigation.navigate('Contact');
  };

  const handlePhonePress = () => {
    return
    // Linking.openURL('tel:+18001234567');
  };

  const handleEmailPress = () => {
    return
    // Linking.openURL('mailto:support@example.com');
  };

  const handleLogout = async () => {
    if (!token) {
      // If user not logged in, go to LoginScreen
      navigation.navigate('LoginScreen');
      return;
    }
    try {
      await AsyncStorage.clear();

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          // routes: [{name: 'UserTypeSelection'}],
          routes: [{name: 'BuyerMain'}],
        }),
      );

      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Success',
        text2: 'Logged out successfully',
        visibilityTime: 3000,
      });
    } catch (error) {
      console.error('Logout error:', error);
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: 'Failed to logout',
        visibilityTime: 3000,
      });
    }
  };

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
        <AppText style={styles.errorText}>
          Error loading window options: {error}
        </AppText>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={{paddingTop: insets.top, flex: 1, backgroundColor: 'white'}}>
        <ScrollView contentContainerStyle={styles.scrollContainer}
        refreshControl={
                              <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                                colors={['#000000']}
                                tintColor={'#000000'}
                              />
                            }
        >
          {/* User Profile Section */}
          <Image
            source={require('../../../assets/logo.png')}
            style={styles.logo}
          />
          {token ? (
            <>
              <View style={styles.profileCard}>
                <View style={styles.profileHeader}>
                  <AppText weight="Inter" style={styles.sectionTitle}>
                    PROFILE INFORMATION
                  </AppText>
                  <TouchableOpacity
                    onPress={
                      editing ? handleUpdateProfile : () => setEditing(!editing)
                    }>
                    <Icon
                      name={editing ? 'check' : 'edit'}
                      size={24}
                      color="#000"
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.inputContainer}>
                  <AppText weight="Inter" style={styles.inputLabel}>
                    Full Name
                  </AppText>
                  <TextInput
                    style={styles.inputField}
                    value={name}
                    onChangeText={setName}
                    editable={editing}
                    placeholder="Enter your name"
                    placeholderTextColor="#999"
                  />
                </View>

                <View style={styles.inputContainer}>
                  <AppText weight="Inter" style={styles.inputLabel}>
                    Phone Number
                  </AppText>
                  <TextInput
                    style={styles.inputField}
                    value={phone}
                    onChangeText={setPhone}
                    editable={editing}
                    keyboardType="phone-pad"
                    placeholder="Enter phone number"
                    placeholderTextColor="#999"
                  />
                </View>
              </View>
              {/* Feedback Section */}
              <View style={styles.sectionCard}>
                <AppText weight="Inter" style={styles.sectionTitle}>
                  FEEDBACK
                </AppText>

                <AppText weight="Inter" style={styles.feedbackQuestion}>
                  On a scale of 1 - 5 how would you rate us?
                </AppText>

                <View style={styles.ratingContainer}>
                  {[1, 2, 3, 4, 5].map(star => (
                    <TouchableOpacity
                      key={star}
                      onPress={() => setRating(star)}
                      onPressIn={() => setHoverRating(star)}
                      onPressOut={() => setHoverRating(0)}>
                      <Icon
                        name={
                          star <= (hoverRating || rating)
                            ? 'star'
                            : 'star-border'
                        }
                        size={36}
                        color="#FFD700"
                        style={styles.starIcon}
                      />
                    </TouchableOpacity>
                  ))}
                </View>

                <AppText weight="Inter" style={styles.feedbackPrompt}>
                  PLEASE SHARE YOUR INPUTS IF YOU THINK WE NEED TO DO SOMETHING
                  BETTER
                </AppText>

                <TextInput
                  style={styles.feedbackInput}
                  multiline
                  numberOfLines={5}
                  maxLength={500}
                  placeholder="Your valuable feedback here..."
                  placeholderTextColor="#999"
                  value={feedback}
                  onChangeText={setFeedback}
                />

                <AppText weight="Inter" style={styles.charCount}>
                  {feedback.length}/500 characters
                </AppText>

                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={handleSubmitFeedback}
                  disabled={rating === 0}>
                  <AppText weight="Inter" style={styles.submitButtonText}>
                    SUBMIT FEEDBACK
                  </AppText>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <></>
          )}

          {/* Additional Sections */}
          <View style={styles.sectionCard}>
            <AppText weight="Inter" style={styles.cardTitle}>
              CONTACT US
            </AppText>

            <View style={styles.contactInfoContainer}>
              {/* Phone */}
              <TouchableOpacity
                style={styles.contactItem}
                onPress={handlePhonePress}>
                <Icon name="phone" size={16} color="#666" style={styles.icon} />
                <View style={styles.contactTextContainer}>
                  <AppText weight="Inter" style={styles.contactLabel}>
                    Phone
                  </AppText>
                  <AppText weight="Inter" style={styles.contactValue}>
                    +1 (800) 123-4567
                  </AppText>
                </View>
              </TouchableOpacity>

              {/* Email */}
              <TouchableOpacity
                style={styles.contactItem}
                onPress={handleEmailPress}>
                <Icon name="email" size={16} color="#666" style={styles.icon} />
                <View style={styles.contactTextContainer}>
                  <AppText weight="Inter" style={styles.contactLabel}>
                    Email
                  </AppText>
                  <AppText weight="Inter" style={styles.contactValue}>
                    support@example.com
                  </AppText>
                </View>
              </TouchableOpacity>

              {/* Address */}
              <View style={styles.contactItem}>
                <Icon
                  name="location-on"
                  size={16}
                  color="#666"
                  style={styles.icon}
                />
                <View style={styles.contactTextContainer}>
                  <AppText weight="Inter" style={styles.contactLabel}>
                    Address
                  </AppText>
                  <AppText weight="Inter" style={styles.contactValue}>
                    123 Business St, Suite 100, San Francisco, CA 94107
                  </AppText>
                </View>
              </View>
            </View>

            <TouchableOpacity
              style={styles.messageButton}
              onPress={handleSendMessage}>
              <AppText weight="Inter" style={styles.messageButtonText}>
                SEND MESSAGE
              </AppText>
            </TouchableOpacity>
          </View>

          <View style={styles.sectionCard}>
            <AppText weight="Inter" style={styles.sectionTitle}>
              TERMS & CONDITIONS
            </AppText>
            <AppText weight="Inter" style={styles.sectionText}>
              By using our services, you agree to our terms and conditions.
              Please read them carefully to understand your rights and
              responsibilities.
            </AppText>
            <TouchableOpacity style={styles.linkButton}>
              <AppText weight="Inter" style={styles.linkButtonText}>
                VIEW FULL TERMS
              </AppText>
              <Icon name="chevron-right" size={20} color="#000" />
            </TouchableOpacity>
          </View>

          <View style={styles.sectionCard}>
            <AppText weight="Inter" style={styles.sectionTitle}>
              ABOUT US
            </AppText>
            <AppText weight="Inter" style={styles.sectionText}>
              We are committed to providing premium services with unmatched
              quality. Our team works tirelessly to ensure your complete
              satisfaction.
            </AppText>
            <TouchableOpacity style={styles.linkButton}>
              <AppText weight="Inter" style={styles.linkButtonText}>
                LEARN MORE
              </AppText>
              <Icon name="chevron-right" size={20} color="#000" />
            </TouchableOpacity>
          </View>

          {/* Logout Button */}
          {/* <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <AppText weight="Inter" style={styles.logoutButtonText}>
             {!token ? LOGIN : LOGOUT} 
            </AppText>
            <Icon name="exit-to-app" size={24} color="#000" />
          </TouchableOpacity> */}
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <AppText weight="Inter" style={styles.logoutButtonText}>
              {!token ? 'LOGIN' : 'LOGOUT'}
            </AppText>
            <Icon name="exit-to-app" size={24} color="#000" />
          </TouchableOpacity>
        </ScrollView>
        <PremiumLoginModal
          visible={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          navigation={navigation}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    paddingHorizontal: 20,
  },
  logo: {
    // marginTop:15,
    alignSelf: 'center',
    width: 100,
    height: 50,
    // resizeMode: 'contain',
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#eee',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  sectionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#eee',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    // fontWeight: '800',
    color: '#000',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 15,
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    // fontWeight: '600',
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#000',
    backgroundColor: '#f9f9f9',
  },
  feedbackQuestion: {
    fontSize: 16,
    color: '#000',
    // fontWeight: '600',
    marginBottom: 15,
    textAlign: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 25,
  },
  starIcon: {
    marginHorizontal: 3,
  },
  feedbackPrompt: {
    fontSize: 14,
    color: '#000',
    // fontWeight: '700',
    marginBottom: 15,
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 20,
  },
  feedbackInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    fontSize: 14,
    color: '#000',
    backgroundColor: '#f9f9f9',
    minHeight: 120,
    textAlignVertical: 'top',
    marginBottom: 10,
  },
  charCount: {
    fontSize: 12,
    color: '#999',
    textAlign: 'right',
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    // fontWeight: '700',
    letterSpacing: 1,
    marginRight: 10,
  },
  sectionText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 22,
    marginBottom: 15,
  },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  linkButtonText: {
    color: '#000',
    fontSize: 14,
    // fontWeight: '700',
    marginRight: 5,
  },
  logoutButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#000',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },
  logoutButtonText: {
    color: '#000',
    fontSize: 16,
    // fontWeight: '700',
    letterSpacing: 1,
    marginRight: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 14,
    // fontWeight: '800',
    color: '#000',
    letterSpacing: 0.5,
    marginBottom: 16,
    textTransform: 'uppercase',
  },
  contactInfoContainer: {
    marginBottom: 16,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  icon: {
    marginTop: 2,
    marginRight: 12,
  },
  contactTextContainer: {
    flex: 1,
  },
  contactLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  contactValue: {
    fontSize: 14,
    // fontWeight: '600',
    color: '#000',
    lineHeight: 20,
  },
  messageButton: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageButtonText: {
    fontSize: 14,
    // fontWeight: '600',
    color: '#000',
    letterSpacing: 0.3,
  },
});

export default UserAccount;
