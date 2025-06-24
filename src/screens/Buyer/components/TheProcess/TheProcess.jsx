import React from 'react';
import {View, Text, StyleSheet, Dimensions, ScrollView, Image, TouchableOpacity} from 'react-native';
import Video from 'react-native-video'; 
import TopTabBar from '../../Dashboard/TopTabBar';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import AppText from '../../../../components/AppText';

const {width, height} = Dimensions.get('window');

const TheProcess = () => {
  const navigation = useNavigation();  
  const steps = [
    'Select your design, dimensions, and quantity',
    'Submit your details',
    'Your RFQ a (Requirment for quote) will be shared with machine curated window manufacturers (maximum 6 only)',
    'The moment they generate interest, you will be notified ',
    'You can get to see there business profile', 
    'Sit back, relax & enjoy',
    'Matching fabricators will connect, meet you, and gather measurements', 
    'Compare quotes and place your order!',
  ];
  return (
    <View style={styles.container}>
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
            source={require('../../../../assets/logo.png')}
            style={styles.logo}
          />
        </View>
      </View>
       <TopTabBar/>
             <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.header}>
        <AppText weight='Bold' style={styles.headerTitle}>The Process</AppText>
        {/* source={require('../../../../assets/dummy.mp4')} */}
        {/* Add a dummy video here in reels format means it should look like reels */}

          <View style={styles.videoContainer}>
          <Video
            source={require('../../../../assets/dummy.mp4')}
            style={styles.video}
            resizeMode="cover"
            repeat
            muted
            paused={false}
            controls={false}
          />
        </View>
      </View>

      {/* Table Container */}

            <View style={styles.container2}>
      {steps.map((step, index) => (
        <View key={index} style={styles.bulletItem}>
          <AppText weight='Inter' style={styles.bulletPoint}>{'\u2022'}</AppText>
          <AppText weight='Inter' style={styles.bulletText}>{step}</AppText>
        </View>
      ))}
    </View>
      </ScrollView>
      <TouchableOpacity 
        style={styles.buyNowButton}
        onPress={() => navigation.navigate('BuyNowScreen')}
      >
        <AppText weight='SemiBold' style={styles.buyNowText}>BUY NOW</AppText>
      </TouchableOpacity>

    </View>
  );
};

// Styles
const styles = StyleSheet.create({ 
  container: {
    paddingTop: 15,
    flex: 1,
    backgroundColor: '#FFFFFF', 
  },
  logo: {
    marginTop:15,
    alignSelf:"center",
    width: 100, 
    height: 100,  
    resizeMode: 'contain', 
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: width * 0.06,
    // fontWeight: 'bold',
    color: '#000000',
    letterSpacing: 2,
  },
  headerSubtitle: {
    fontSize: width * 0.04,
    color: '#A0A0A0',
    marginTop: 5,
  },
  tableContainer: {
    margin: 15,
    borderRadius: 10,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    backgroundColor: '#FFFFFF',
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  container2:{
    padding:20,
  },
  tableHeaderText: {
    fontSize: width * 0.045,
    // fontWeight: 'bold',
    color: '#000000',
    flex: 1,
  },
  tableRow: {
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
    padding: 15,
  },
  category: {
    textAlign: 'center',
    fontSize: width * 0.04,
    // fontWeight: '600',
    color: '#000000',
    marginBottom: 5,
  },
  description: {
    fontSize: width * 0.035,
    color: '#A0A0A0',
    lineHeight: 20,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: width * 0.035,
    color: '#000000',
    textAlign: 'center',
  },
  videoContainer: {
  width: '100%',
  aspectRatio: 15 / 16, // Vertical (Reels/TikTok style)
  borderRadius: 10,
  overflow: 'hidden',
  marginTop: 15,
},

video: {
  width: '100%',
  height: '100%',
}, 
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  bulletPoint: {
    fontSize: width * 0.05,
    color: '#000000',
    marginRight: 10,
    lineHeight: 22,
  },
  bulletText: {
    flex: 1,
    fontSize: width * 0.04,
    color: '#4A4A4A',
    lineHeight: 22,
  },

Headercontainer: {
  position: 'relative', // allow absolute positioning inside
  height: 80, // adjust as needed
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom:10,
},

backButton: {
  position: 'absolute',
  left: 10,
  top: '50%',
  transform: [{ translateY: -12 }], // vertically center the icon
  padding: 5, 
},

logoContainer: {
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop:20,
},

logo: {
  width: 100,
  height: 100,
  resizeMode: 'contain',
},
buyNowButton: {
  backgroundColor: '#000000',
  paddingVertical: 16,
  paddingHorizontal: 32,
  borderRadius: 30,
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 20,
  marginBottom: 30,
  marginHorizontal: 20,
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
},
buyNowText: {
  color: '#FFFFFF',
  fontSize: 18,
  // fontWeight: 'bold',
  letterSpacing: 1,
},
});

export default TheProcess;
