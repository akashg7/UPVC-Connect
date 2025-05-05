import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Animated } from 'react-native';
import { StyleSheet, Dimensions } from 'react-native'; 
import Icon from 'react-native-vector-icons/MaterialIcons';

const ActiveLeads = ({ navigation }) => {
  // Mock data - multiple active requests
  const activeRequests = [
    {
      id: '1',
      title: 'Window Replacement',
      responded: 3,
      total: 6,
      date: 'Today, 10:30 AM',
      status: 'Active',
      image: 'https://www.discountwindowsanddoor.com/wp-content/uploads/2020/10/Replace-All-Home-Windows.jpg'
    },
    {
      id: '2',
      title: 'Door Installation',
      responded: 1,
      total: 6,
      date: 'Yesterday, 2:15 PM',
      status: 'Active',
      image: 'https://cdn.prod.website-files.com/603164c3b3e101f70b92ddbd/62e04f02fd4f353f3dd1a999_installing%20front%20door.jpg'
    },
    {
      id: '3',
      title: 'Window Installation',
      responded: 5,
      total: 6,
      date: 'Yesterday, 2:15 PM',
      status: 'Active',
      image: 'https://www.dannysglass.com/wp-content/uploads/2019/01/residential-window-pane-replacement.jpg'
    }
  ];
  
  return (
    <ScrollView 
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    > 
 
      {/* Active Requests Section */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Active Requests</Text> 
         <TouchableOpacity 
                      style={[styles.button, styles.primaryButton]}
                      onPress={() => navigation.navigate('BuyerOnboarding')}
                    >
                      <Icon name="add" size={20} color="white" />
                      <Text style={styles.buttonText}>New Request</Text>
                    </TouchableOpacity>
      </View>

      {activeRequests.map(request => (
        <TouchableOpacity 
          key={request.id}
          style={styles.requestCard}
          onPress={() => navigation.navigate('RequestStatus', { requestId: request.id })}
          activeOpacity={0.9}
        >
          <Image 
            source={{ uri: request.image }} 
            style={styles.requestImage}
          />
          <View style={styles.requestDetails}>
            <View style={styles.requestHeader}>
              <Text style={styles.requestTitle}>{request.title}</Text>
              <View style={[styles.statusBadge, request.status === 'Active' ? styles.activeBadge : styles.completedBadge]}>
                <Text style={styles.statusText}>{request.status}</Text>
              </View>
            </View>
            <Text style={styles.requestDate}>{request.date}</Text>
            
            <View style={styles.progressContainer}>
              <View style={styles.progressTextContainer}>
                <Text style={styles.progressText}>{request.responded}/{request.total} sellers responded</Text>
                <Text style={styles.progressPercent}>{Math.round((request.responded/request.total)*100)}%</Text>
              </View>
              <View style={styles.progressBar}>
                <Animated.View 
                  style={[
                    styles.progressFill,
                    { width: `${(request.responded/request.total)*100}%` }
                  ]}
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ))}
 
    </ScrollView>
  );
};
 
const styles = StyleSheet.create({
  button: {
    width: '40%',
    borderRadius: 12,
    padding: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  primaryButton: {
    backgroundColor: '#3F51B5',
    // backgroundColor: '#2E86C1',
  },
  buttonText: { 
    backgroundColor: '#3F51B5',
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginLeft: 8,
  },
  container: {
    flexGrow: 1,
    backgroundColor: '#F8FAFC',
    padding: 24,
    paddingBottom: 40,
  },
  headerContainer: {
    marginBottom: 32,
    marginTop: 32,
  },
  header: { 
    fontSize: 28,
    fontWeight: '800',
    color: '#1A1A1A',
    fontFamily: 'Inter-ExtraBold',
    marginBottom: 8,
  },
  subHeader: {
    fontSize: 16,
    color: '#666666',
    fontFamily: 'Inter-Medium',
  },
  sectionHeader: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    fontFamily: 'Inter-Bold',
  },
  seeAll: {
    fontSize: 14,
    color: '#4CAF50',
    fontFamily: 'Inter-SemiBold',
  },
  requestCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  requestImage: {
    width: '100%',
    height: 160,
  },
  requestDetails: {
    padding: 20,
  },
  requestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  requestTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    fontFamily: 'Inter-Bold',
    flex: 1,
  },
  statusBadge: {
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginLeft: 12,
  },
  activeBadge: {
    backgroundColor: '#E3F2FD',
  },
  completedBadge: {
    backgroundColor: '#E8F5E9',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  requestDate: {
    fontSize: 14,
    color: '#666666',
    fontFamily: 'Inter-Regular',
    marginBottom: 16,
  },
  progressContainer: {
    marginTop: 8,
  },
  progressTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressText: {
    fontSize: 14,
    color: '#666666',
    fontFamily: 'Inter-Medium',
  },
  progressPercent: {
    fontSize: 14,
    color: '#4CAF50',
    fontFamily: 'Inter-SemiBold',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 3,
  },
  trendsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  trendsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  trendsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    fontFamily: 'Inter-Bold',
    marginLeft: 12,
    flex: 1,
  },
  trendsInsights: {
    marginBottom: 20,
  },
  insightItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  insightText: {
    fontSize: 14,
    color: '#666666',
    fontFamily: 'Inter-Regular',
    marginLeft: 8,
    flex: 1,
    lineHeight: 20,
  },
  trendsButton: {
    marginTop: 8,
  },
});
 
export default ActiveLeads;