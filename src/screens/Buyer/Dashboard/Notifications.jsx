import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AppText from '../../../components/AppText';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

// Dummy notification data
const notifications = [
  {
    id: 1,
    title: 'Seller Interest',
    message: 'Seller John Doe has shown interest in your window installation lead.',
    time: '2 hours ago',
    icon: 'person',
  },
  {
    id: 2,
    title: 'New Quote',
    message: 'Seller Jane Smith sent a quote for your door replacement request.',
    time: '5 hours ago',
    icon: 'request-quote',
  },
  {
    id: 3,
    title: 'Work Scheduled',
    message: 'Your window installation has been scheduled with Seller Alex Brown.',
    time: '1 day ago',
    icon: 'event',
  },
  {
    id: 4,
    title: 'Lead Update',
    message: 'Your lead for UPVC door installation has been updated.',
    time: '2 days ago',
    icon: 'update',
  },
  {
    id: 6,
    title: 'Seller Interest',
    message: 'Seller Emily Johnson has shown interest in your window repair lead.',
    time: '3 days ago',
    icon: 'person',
  },
  {
    id: 5,
    title: 'Seller Interest',
    message: 'Seller Emily Johnson has shown interest in your window repair lead.',
    time: '3 days ago',
    icon: 'person',
  },
];

const Notifications = ({navigate}) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  return (
        <View style={{paddingTop: insets.top, flex: 1, backgroundColor: 'white'}}>
    
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => { navigation.goBack() }}>
          <MaterialIcons name="arrow-back" size={24} color="#000000" />
        </TouchableOpacity>
      <Image
                  source={require('../../../assets/logo.png')}
                  style={styles.logo}
                /> 
        <View style={styles.placeholder} />  
      </View>

      {/* Notification List */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {notifications.length === 0 ? (
          <View style={styles.emptyContainer}>
            <MaterialIcons name="notifications-none" size={50} color="#A0A0A0" />
            <AppText weight='Bold' style={styles.emptyText}>No notifications yet</AppText>
          </View>
        ) : (
          notifications.map((notification) => (
            <TouchableOpacity
              key={notification.id}
              style={styles.notificationCard}
              onPress={() => { /* Handle notification tap, e.g., navigate to lead details */ }}
            >
              <View style={styles.iconContainer}>
                <MaterialIcons name={notification.icon} size={24} color="#FFFFFF" />
              </View>
              <View style={styles.notificationContent}>
                <AppText weight='SemiBold' style={styles.notificationTitle}>{notification.title}</AppText>
                <AppText weight='SemiBold' style={styles.notificationMessage}>{notification.message}</AppText>
                <AppText weight='Inter' style={styles.notificationTime}>{notification.time}</AppText>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#FFFFFF', 
  },
  logo: {
    // marginTop:15,
    // alignSelf:"center",
    width: 100, 
    height: 50,  
    // resizeMode: 'contain', 
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20, 
  },
  headerTitle: {
    fontSize: width * 0.06, 
    color: '#000000',  
    letterSpacing: 1,
  },
  placeholder: {
    width: 24, 
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.2,
  },
  emptyText: {
    fontSize: width * 0.04,
    color: '#A0A0A0', 
    marginTop: 10,
  },
  notificationCard: {
    flexDirection: 'row',
    marginHorizontal: 15,
    marginVertical: 8,
    backgroundColor: '#F8F8F8', 
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#000000', 
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: width * 0.04, 
    color: '#000000', 
    marginBottom: 5,
  },
  notificationMessage: {
    fontSize: width * 0.035,
    color: '#333333', 
    lineHeight: 20,
  },
  notificationTime: {
    fontSize: width * 0.03,
    color: '#A0A0A0', 
    marginTop: 5,
  },
});

export default Notifications;