import React from 'react';
import {
  View, 
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import Video from 'react-native-video';
import TopTabBar from '../../Dashboard/TopTabBar';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import AppText from '../../../../components/AppText';

const {width, height} = Dimensions.get('window');

const Price = () => {
  const steps = [
    'Size & Dimensions - Larger the window size, lesser the sq.ft cost',
    'Type & Design – Fixed, sliding, casement, or combination designs affect complexity and pricing.',
    'Glass Type',
    'Frame Quality & Thickness – Premium or reinforced uPVC frames with higher wall thickness cost more.',
    'Color & Finish – White is usually standard, while laminated finishes cost more.',
    'Hardware & Accessories – Quality of locks, handles, hinges, rollers, and other fittings can influence price.',
    'Insect Screens or Grills – Adding mosquito mesh or grills adds to the cost.',
    'Brand & Warranty – Reputed brands with longer warranties and better after-sales service may be priced higher.',
    'Location & Transportation – Shipping distances and site access can affect pricing.',
  ];

  const navigation = useNavigation();  

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
      <TopTabBar />
  <ScrollView contentContainerStyle={styles.scrollContent}>

      <View style={styles.header}>
        <AppText weight='Bold' style={styles.headerTitle}>PRICE - KNOW IT ALL</AppText>
        <AppText weight='SemiBold' style={styles.headerSubtitle}>
          The cost is the entry fee, the value is the experience!
        </AppText>
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
      <AppText weight='SemiBold' style={styles.headerSubtitle2}>
        When you are investing in uPVC windows & doors the price can vary on
        based on several important factors- heres what goes into it:
      </AppText>

      <View >
        <View style={styles.container2}>
          {steps.map((step, index) => (
            <View key={index} style={styles.bulletItem}>
              <AppText style={styles.bulletPoint}>{'\u2022'}</AppText>
              <AppText  weight='Inter' style={styles.bulletAppText}>{step}</AppText>
            </View>
          ))}
        </View>
      </View>
     
  </ScrollView> 
 <TouchableOpacity 
        style={styles.buyNowButton}
        onPress={() => navigation.navigate('BuyNowScreen')}
      >
        <AppText  weight='SemiBold'  style={styles.buyNowText}>BUY NOW</AppText>
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
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: width * 0.06, 
    color: '#000000',
    letterSpacing: 2,
  },
  headerSubtitle: {
    textAlign: 'center', 
    color: 'black',
    marginTop: 5,
  },
  headerSubtitle2: {
    fontSize: width * 0.04, 
    color: '#000000',
    paddingHorizontal: 20,
  },

  videoContainer: {
    width: '100%',
    aspectRatio: 9 / 16, 
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 15,
  },
  video: {
    width: '100%',
    height: '100%',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  container2: {
    padding: 20,
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
  letterSpacing: 1,
},
});

export default Price;
