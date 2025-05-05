import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Linking } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ContactBuyer = ({ route, navigation }) => {
  // const { lead } = route.params || {
  const lead = {
    name: 'Rajesh Builders',
    phone: '+919876543210',
    product: '10 sq ft UPVC windows'
  };

  const handleCall = () => {
    Linking.openURL(`tel:${lead.phone}`);
  };

  const handleWhatsApp = () => {
    const message = `Hi ${lead.name}, I saw your request for ${lead.product} on UPVC Connect. Here's my quote:`;
    Linking.openURL(`whatsapp://send?phone=${lead.phone}&text=${encodeURIComponent(message)}`);
  };

  return (
    <ImageBackground 
      source={require('../../assets/logo.png')} 
      style={styles.background}
      blurRadius={2}
    >
      <LinearGradient
        colors={['rgba(255,255,255,0.98)', 'rgba(245,249,255,0.95)']}
        style={styles.gradientOverlay}
      >
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-back" size={28} color="#2C3E50" />
          </TouchableOpacity>
        <View style={styles.container}>
          {/* Success Animation */}
          <LottieView
            source={require('../../assets/animations/success-check.json')}
            autoPlay
            loop={false}
            style={styles.animation}
          />
          
          {/* Header */}
          <Text style={styles.headline}>You've Got It!</Text>
          <Text style={styles.subheader}>Contact details unlocked</Text>
          
          {/* Buyer Info Card */}
          <View style={styles.card}>
            <View style={styles.infoRow}>
              <Icon name="person" size={24} color="#2E86C1" />
              <Text style={styles.infoText}>{lead.name}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Icon name="phone" size={24} color="#2E86C1" />
              <Text style={styles.infoText}>{lead.phone}</Text>
            </View>
            
            <View style={styles.tipBox}>
              <Text style={styles.tipText}>
                <Icon name="lightbulb" size={18} color="#F39C12" /> 
                {' '}Tip: Call or WhatsApp with your quote within 24 hours for best results!
              </Text>
            </View>
          </View>
          
          {/* Action Buttons */}
          <TouchableOpacity 
            style={[styles.button, styles.callButton]}
            onPress={handleCall}
          >
            <Icon name="call" size={24} color="white" />
            <Text style={styles.buttonText}>Call Buyer</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.whatsappButton]}
            onPress={handleWhatsApp}
          >
            <Icon name="chat" size={24} color="white" />
            <Text style={styles.buttonText}>WhatsApp Buyer</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gradientOverlay: {
    flex: 1,
    paddingBottom: 40,
  },
  container: {
    flex: 1,
    padding: 25,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  animation: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  headline: {
    fontSize: 28,
    fontWeight: '800',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 8,
  },
  subheader: {
    fontSize: 16,
    color: '#7F8C8D',
    textAlign: 'center',
    marginBottom: 30,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 25,
    width: '100%',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 5,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  infoText: {
    fontSize: 18,
    color: '#2C3E50',
    marginLeft: 15,
    fontWeight: '500',
  },
  tipBox: {
    backgroundColor: '#FEF9E7',
    borderRadius: 8,
    padding: 15,
    marginTop: 15,
  },
  tipText: {
    fontSize: 14,
    color: '#7F8C8D',
    lineHeight: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    padding: 16,
    width: '100%',
    marginBottom: 15,
  },
  callButton: {
    backgroundColor: '#2E86C1',
  },
  whatsappButton: {
    backgroundColor: '#28B463',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginLeft: 10,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 8,
    borderRadius: 50,
  }
  
});

export default ContactBuyer;