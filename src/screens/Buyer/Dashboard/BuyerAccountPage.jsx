import React, { useState } from 'react';
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
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AppText from '../../../components/AppText';

const { width, height } = Dimensions.get('window');

const UserAccount = () => {
  const [name, setName] = useState('John Doe');
  const [phone, setPhone] = useState('+91 9876543210');
  const [editing, setEditing] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmitFeedback = () => {
    console.log('Feedback submitted:', { rating, feedback });
    // Here you would typically send the feedback to your backend
    alert('Thank you for your feedback!');
    setRating(0);
    setFeedback('');
  };

    const handleSendMessage = () => {
    // Navigate to contact screen or open message interface
    // navigation.navigate('Contact');
  };

  const handlePhonePress = () => {
    Linking.openURL('tel:+18001234567');
  };

  const handleEmailPress = () => {
    Linking.openURL('mailto:support@example.com');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* User Profile Section */}
                     <Image
                        source={require('../../../assets/logo.png')}
                        style={styles.logo}
                      />
        <View style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <AppText weight='Bold' style={styles.sectionTitle}>PROFILE INFORMATION</AppText>
            <TouchableOpacity onPress={() => setEditing(!editing)}>
              <Icon 
                name={editing ? 'check' : 'edit'} 
                size={24} 
                color="#000" 
              />
            </TouchableOpacity>
          </View>
          
          <View style={styles.inputContainer}>
            <AppText weight='Inter' style={styles.inputLabel}>Full Name</AppText>
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
            <AppText weight='Inter' style={styles.inputLabel}>Phone Number</AppText>
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
          <AppText weight='Bold' style={styles.sectionTitle}>FEEDBACK</AppText>
          
          <AppText weight='Inter' style={styles.feedbackQuestion}>
            On a scale of 1 - 5 how would you rate us?
          </AppText>
          
          <View style={styles.ratingContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity 
                key={star} 
                onPress={() => setRating(star)}
                onPressIn={() => setHoverRating(star)}
                onPressOut={() => setHoverRating(0)}
              >
                <Icon 
                  name={star <= (hoverRating || rating) ? 'star' : 'star-border'} 
                  size={36} 
                  color="#FFD700" 
                  style={styles.starIcon}
                />
              </TouchableOpacity>
            ))}
          </View>
          
          <AppText weight='Inter' style={styles.feedbackPrompt}>
            PLEASE SHARE YOUR INPUTS IF YOU THINK WE NEED TO DO SOMETHING BETTER
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
          
          <AppText weight='Inter' style={styles.charCount}>
            {feedback.length}/500 characters
          </AppText>
 
          <TouchableOpacity 
            style={styles.submitButton}
            onPress={handleSubmitFeedback}
            disabled={rating === 0}
          >
            <AppText weight='Bold' style={styles.submitButtonText}>SUBMIT FEEDBACK</AppText>
          </TouchableOpacity>
        </View>

        {/* Additional Sections */}
    <View style={styles.sectionCard}>
      <AppText weight='Bold' style={styles.cardTitle}>CONTACT US</AppText>
      
      <View style={styles.contactInfoContainer}>
        {/* Phone */}
        <TouchableOpacity style={styles.contactItem} onPress={handlePhonePress}>
          <Icon name="phone" size={16} color="#666" style={styles.icon} />
          <View style={styles.contactTextContainer}>
            <AppText weight='Inter' style={styles.contactLabel}>Phone</AppText>
            <AppText weight='Inter' style={styles.contactValue}>+1 (800) 123-4567</AppText>
          </View>
        </TouchableOpacity>

        {/* Email */}
        <TouchableOpacity style={styles.contactItem} onPress={handleEmailPress}>
          <Icon name="email" size={16} color="#666" style={styles.icon} />
          <View style={styles.contactTextContainer}>
            <AppText weight='Inter' style={styles.contactLabel}>Email</AppText>
            <AppText weight='Inter' style={styles.contactValue}>support@example.com</AppText>
          </View>
        </TouchableOpacity>

        {/* Address */}
        <View style={styles.contactItem}>
          <Icon name="location-on" size={16} color="#666" style={styles.icon} />
          <View style={styles.contactTextContainer}>
            <AppText weight='Inter' style={styles.contactLabel}>Address</AppText>
            <AppText weight='Inter' style={styles.contactValue}>123 Business St, Suite 100, San Francisco, CA 94107</AppText>
          </View>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.messageButton}
        onPress={handleSendMessage}
      >
        <AppText weight='Bold' style={styles.messageButtonText}>SEND MESSAGE</AppText>
      </TouchableOpacity>
    </View>

        <View style={styles.sectionCard}>
          <AppText weight='Bold' style={styles.sectionTitle}>TERMS & CONDITIONS</AppText>
          <AppText weight='SemiBold' style={styles.sectionText}>
            By using our services, you agree to our terms and conditions. Please read them carefully to understand your rights and responsibilities.
          </AppText>
          <TouchableOpacity style={styles.linkButton}>
            <AppText weight='SemiBold' style={styles.linkButtonText}>VIEW FULL TERMS</AppText>
            <Icon name="chevron-right" size={20} color="#000" />
          </TouchableOpacity>
        </View>

        <View style={styles.sectionCard}>
          <AppText weight='Bold' style={styles.sectionTitle}>ABOUT US</AppText>
          <AppText weight='SemiBold' style={styles.sectionText}>
            We are committed to providing premium services with unmatched quality. Our team works tirelessly to ensure your complete satisfaction.
          </AppText>
          <TouchableOpacity style={styles.linkButton}>
            <AppText weight='SemiBold' style={styles.linkButtonText}>LEARN MORE</AppText>
            <Icon name="chevron-right" size={20} color="#000" />
          </TouchableOpacity>
        </View> 

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton}>
          <AppText weight='SemiBold' style={styles.logoutButtonText}>LOGOUT</AppText>
          <Icon name="exit-to-app" size={24} color="#000" />
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', 
  },
  scrollContainer: {
    padding: 20, 
  },
  logo: {
    // marginTop:15,
    alignSelf:"center",
    width: 100, 
    height: 100,  
    resizeMode: 'contain', 
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#eee',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
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
    shadowOffset: { width: 0, height: 2 },
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    marginBottom:20,
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