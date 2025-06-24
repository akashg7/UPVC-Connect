import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView, Image} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {styles} from './styles';
import WindowPrices from '../components/WindowPrices/WindowPrices';
import WindowOptions from '../components/WindowOptions/WindowOptions';
import WhiteVsColors from '../components/WhiteVsColors/WhiteVsColors';
import TheProcess from '../components/TheProcess/TheProcess';
import Price from '../components/Price/Price';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import AppText from '../../../components/AppText';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const HomeDashboard = ({navigation}) => {
  const [activeTab, setActiveTab] = useState(null);
  const handleNotification = () => {
    navigation.navigate('Notification');
  };
  useEffect(() => {
    setActiveTab(null);
  }, []);

  const tabs = ['PRICES', 'BUY NOW', 'WHITE vs COLORS', 'PROCESS'];

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return <Price />;
      case 1:
        return (
          <GestureHandlerRootView style={{flex: 1}}>
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
  return (
    <View style={{ paddingTop: insets.top, flex: 1, backgroundColor:"white" }}>
      <View style={styles.container}>
        {/* Header */}
        <ScrollView>
          <View style={styles.header}>
            <MaterialIcons
              name="location-on"
              size={24}
              color="black"
              onPress={() => navigation.navigate('LocationSelection')}
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
                // onPress={() => setActiveTab(index)}
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
                <AppText weight="SemiBold"
                  style={[
                    styles.tabText,
                    activeTab === index && styles.activeTabText,
                  ]}>
                  {tab}
                </AppText>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}>
            {renderTabContent()}
          </ScrollView>
        </ScrollView>
      </View>
    </View>

  );
};

export default HomeDashboard;
