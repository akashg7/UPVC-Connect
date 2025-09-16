import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { styles } from './styles';
import WindowPrices from '../components/WindowPrices/WindowPrices';
import WindowOptions from '../components/WindowOptions/WindowOptions';
import WhiteVsColors from '../components/WhiteVsColors/WhiteVsColors';
import TheProcess from '../components/TheProcess/TheProcess';
import Price from '../components/Price/Price';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppText from '../../../components/AppText';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeDashboard = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState(null);
  const [location, setLocation] = useState(null);
  const [showLocationPrompt, setShowLocationPrompt] = useState(true);
  const [buyerToken, setBuyerToken] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem('buyerToken').then(token => setBuyerToken(token));
  }, []);

  const topCities = [
    'Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Ahmedabad',
    'Chennai', 'Kolkata', 'Surat', 'Pune', 'Jaipur',
    'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Bhopal',
    'Patna', 'Vadodara', 'Ludhiana', 'Agra', 'Nashik',
    'Faridabad', 'Meerut', 'Rajkot', 'Varanasi', 'Amritsar',
  ];

  const handleNotification = () => {
    navigation.navigate('Notification');
  };
  useEffect(() => {
    setActiveTab(null);
  }, []);

  useEffect(() => {
    const getLocation = async () => {
      const location = await AsyncStorage.getItem('userLocation');
      setLocation(location)
    }
    getLocation()
  }, []);

  const tabs = ['PRICES', 'BUY NOW', 'WHITE vs COLORS', 'INSIGHTS'];

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return <Price />;
      case 1:
        return (
          <GestureHandlerRootView style={{ flex: 1 }}>
            <WindowOptions />
          </GestureHandlerRootView>
        );

      case 2:
        return <WhiteVsColors />;
      case 3:
        return <TheProcess />;
      case 4:
        return <Price />;
      default:
        return <WindowPrices />;
    }
  };
  const insets = useSafeAreaInsets();

  const LocationPrompt = () => {
    const handleSelectLocation = async (city) => {
      await AsyncStorage.setItem('userLocation', city);
      setLocation(city);
      setShowLocationPrompt(false);
      Toast.show({
        type: 'success',
        text1: 'Location Selected',
        text2: `${city} has been set as your location.`,
      });
    };

    // If there’s no token, return null or a fallback
    if (!buyerToken) {
      // setActiveTab(0) 
      return
      // return null; // or some fallback UI
    }

    return (
      <View style={styles.promptContainer}>
        <AppText style={styles.promptTitle}>Choose Your Location</AppText>

        <View style={styles.cityWrap}>
          {topCities.map((city, index) => (
            <TouchableOpacity
              key={index}
              style={styles.cityButton}
              onPress={() => handleSelectLocation(city)}
            >
              <AppText style={styles.cityText}>{city}</AppText>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.searchLocationBtn}
          onPress={() => navigation.navigate('LocationSelection')}>
          <AppText style={styles.searchLocationText}>Search Location</AppText>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ paddingTop: insets.top, flex: 1, backgroundColor: 'white' }}>
      {location === null && buyerToken !== null ? (
        // Show only the location prompt
        <LocationPrompt />
      ) : (
        // Show the full dashboard only after location is selected
        <View style={styles.container}>
          {/* Header */}
          <ScrollView>
            <View style={styles.header}>
              <MaterialIcons
                // name="location-on"
                // size={24}
                // color="black"
                // onPress={() => navigation.navigate('LocationSelection')}
              />
              <Image
                source={require('../../../assets/logo.png')}
                style={styles.logo}
              />
              <MaterialIcons
                name="notifications-none"
                size={24}
                color="black"
                onPress={handleNotification}
              />
            </View>

            {/* Scrollable Tabs */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.tabScrollContainer}>
              {tabs.map((tab, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.tabButton,
                    activeTab === index && styles.activeTab,
                  ]}
                  onPress={() => {
                    switch (index) {
                      case 0:
                        navigation.navigate('PricesScreen');
                        break;
                      case 1:
                        navigation.navigate('BuyNowScreen');
                        break;
                      case 2:
                        navigation.navigate('WhiteVsColorsScreen');
                        break;
                      case 3:
                        navigation.navigate('ProcessScreen');
                        break;
                      default:
                        break;
                    }
                  }}
                  activeOpacity={0.7}>
                  <AppText
                    weight="SemiBold"
                    style={[
                      styles.tabText,
                      activeTab === index && styles.activeTabText,
                    ]}>
                    {tab}
                  </AppText>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Main Content */}
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}>
              {renderTabContent()}
            </ScrollView>
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default HomeDashboard; 