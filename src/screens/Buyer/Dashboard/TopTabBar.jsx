// screens/Buyer/components/TopTabBar.js
import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AppText from '../../../components/AppText';
const TopTabBar = () => {
  const navigation = useNavigation()
  const tabs = [
    { label: 'PRICES', screen: 'PricesScreen' },
    { label: 'BUY NOW', screen: 'BuyNowScreen' },
    { label: 'WHITE vs COLORS', screen: 'WhiteVsColorsScreen' },
    { label: 'INSIGHTS', screen: 'ProcessScreen' },
  ];

  return (
    // <View
    //   // showsHorizontalScrollIndicator={false}
    //   // contentContainerStyle={styles.tabScrollContainer}
    //   style={styles.tabScrollContainer}
    // >
      <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.tabScrollContainer}>
      {tabs.map((tab, index) => (
        <TouchableOpacity
          key={index}
          style={styles.tabButton}
          onPress={() => navigation.navigate(tab.screen)}
        >
          <AppText weight="SemiBold"  style={styles.tabText}>{tab.label}</AppText>
        </TouchableOpacity>
      ))}
    {/* </View> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({ 
    tabScrollContainer: {
    // paddingTop:45,
    flexDirection:"row",
    justifyContent:"space-between", 
    borderBottomColor: '#e0e0e0',
  },
    tabButton: {
    height: 30, 
    paddingHorizontal: 10,
    marginHorizontal: 5,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: 'black',
    // borderWidth:1,
  }, 
  tabText: {
    // fontSize: 14,
    // color: '#333',
        fontSize: 12,
    // fontWeight: '600',
    color: 'black',
    letterSpacing: 1,
  },
});

export default TopTabBar;
