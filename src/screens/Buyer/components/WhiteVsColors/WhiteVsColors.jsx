import React from 'react';
import {
  View,
  Text,
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

const WhiteVsColor = () => {
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
          <AppText weight='Bold' style={styles.headerTitle}>WHITE VS COLOR</AppText>
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

        <View style={styles.tableContainer}>
          {/* Table Header */}
          <View style={styles.tableHeader}>
            <AppText weight='Bold' style={[styles.tableHeaderText, {textAlign: 'left'}]}>
              WHITE
            </AppText>
            <AppText weight='Bold'  style={[styles.tableHeaderText, {textAlign: 'right'}]}>
              LAMINATED
            </AppText>
          </View>

          {/* Appearance Row */}
          <AppText weight='SemiBold' style={styles.category}>APPEARANCE</AppText>
          <View style={styles.tableRow}>
            <View style={styles.cell}>
              <AppText  weight='Inter' style={styles.description}>
                Classic, clean look, commonly used & widely accepted
              </AppText>
            </View>
            <View style={styles.cell}>
              <AppText weight='Inter' style={styles.description}>
                Offers a variety of colors and textures; enhances aesthetics and
                matches modern designs
              </AppText>
            </View>
          </View>

          {/* Cost Row */}
          <AppText weight='SemiBold' style={styles.category}>COST</AppText>
          <View style={styles.tableRow}>
            <View style={styles.cell}>
              <AppText weight='Inter' style={styles.description}>
                More affordable; considered the base standard
              </AppText>
            </View>
            <View style={styles.cell}>
              <AppText weight='Inter' style={styles.description}>
                Higher cost due to added lamination process
              </AppText>
            </View>
          </View>

          {/* UV Resistance & Fading Row */}
          <AppText weight='SemiBold' style={styles.category}>UV RESISTANCE & FADING</AppText>
          <View style={styles.tableRow}>
            <View style={styles.cell}>
              <AppText weight='Inter' style={styles.description}>
                Good UV resistance, but can show yellowing over very long
                periods if poor quality
              </AppText>
            </View>
            <View style={styles.cell}>
              <AppText weight='Inter' style={styles.description}>
                High UV protection; resistant to fading & discoloration
              </AppText>
            </View>
          </View>

          {/* Maintenance Row */}
          <AppText weight='SemiBold' style={styles.category}>MAINTENANCE</AppText>
          <View style={styles.tableRow}>
            <View style={styles.cell}>
              <AppText weight='Inter'  style={styles.description}>
                Easier to clean but may show dirt & stains more visibly
              </AppText>
            </View>
            <View style={styles.cell}>
              <AppText weight='Inter'  style={styles.description}>
                Hides dirt better but may require gentler cleaning to preserve
                finish
              </AppText>
            </View>
          </View>

          {/* Heat Resistance Row */}
          <AppText weight='SemiBold' style={styles.category}>HEAT RESISTANCE</AppText>
          <View style={styles.tableRow}>
            <View style={styles.cell}>
              <AppText weight='Inter' style={styles.description}>
                Reflects more sunlight, tends to stay cooler
              </AppText>
            </View>
            <View style={styles.cell}>
              <AppText weight='Inter' style={styles.description}>
                Darker shades may absorb more heat; advanced lamination
                mitigates this with UV resistant layers
              </AppText>
            </View>
          </View>

          {/* Scratch Visibility Row */}
          <AppText weight='SemiBold' style={styles.category}>SCRATCH VISIBILITY</AppText>
          <View style={styles.tableRow}>
            <View style={styles.cell}>
              <AppText weight='Inter' style={styles.description}>
                Minor scratches will be less noticeable
              </AppText>
            </View>
            <View style={styles.cell}>
              <AppText weight='Inter' style={styles.description}>
                Scratches can be more visible, especially on darker shades &
                textured finishes
              </AppText>
            </View>
          </View>

          {/* Scratch Visibility Row */}
          <AppText weight='SemiBold' style={styles.category}>AVAILABILITY</AppText>
          <View style={styles.tableRow}>
            <View style={styles.cell}>
              <AppText weight='Inter' style={styles.description}>
                Minor scratches will be less noticeable Readily available with
                shorter lead times
              </AppText>
            </View>
            <View style={styles.cell}>
              <AppText weight='Inter' style={styles.description}>
                May have longer delivery times due to customization
              </AppText>
            </View>
          </View>
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
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 15,
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
    aspectRatio: 9 / 16, // Vertical (Reels/TikTok style)
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 15,
  },

  video: {
    width: '100%',
    height: '100%',
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

export default WhiteVsColor;
