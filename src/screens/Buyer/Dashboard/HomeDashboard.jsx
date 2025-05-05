import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Animated } from 'react-native';
import { styles } from './styles';
import PrimaryButton from '../../../components/UI/PrimaryButton';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HomeDashboard = ({ navigation }) => {
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
    }
  ];

  const trendsData = {
    popularTrend: "tinted glass",
    percentage: 70,
    location: "Bangalore",
    insights: [
      "70% of buyers in your area prefer tinted glass",
      "Average price range: ₹1200-₹1800/sq.ft",
      "Top 3 sellers with 4.8+ ratings"
    ]
  };
return(
  <ScrollView 
    contentContainerStyle={styles.container}
    showsVerticalScrollIndicator={false}
  >
    {/* Premium Header */}
    <View style={styles.headerContainer}>
      <View style={styles.headerBackground} />
      <View style={styles.headerContent}>
        <View style={styles.headerTopRow}>
          <View>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.userName}>Alex Johnson</Text>
          </View>
          <TouchableOpacity 
            style={styles.notificationButton}
            onPress={() => navigation.navigate('Notifications')}
          >
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationCount}>3</Text>
            </View>
            <Icon name="notifications" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.headerCard}>
          <View style={styles.headerCardContent}>
            {/* <Text style={styles.headerCardTitle}>Your UPVC Connect Dashboard</Text> */}
            {/* <Text style={styles.headerCardSubtitle}>Premium Business </Text> */}
            
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>12</Text>
                <Text style={styles.statLabel}>Active Leads</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>8</Text>
                <Text style={styles.statLabel}>Completed</Text>
              </View>
              {/* <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>₹2.4L</Text>
                <Text style={styles.statLabel}>This Month</Text>
              </View> */}
            </View>
          </View>
           
        </View>
      </View>
    </View> 

      {/* Active Requests Section */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Active Requests</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('ActiveLeads')}  
        >
          <Text style={styles.seeAll}>See All</Text>
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

      {/* Trends Section */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Market Trends</Text>
      </View>
      
      <View style={styles.trendsCard}>
        <View style={styles.trendsHeader}>
          <Icon name="trending-up" size={24} color="#4CAF50" />
          <Text style={styles.trendsTitle}>
            {trendsData.location} loves {trendsData.popularTrend} – {trendsData.percentage}%
          </Text>
        </View>
        
        <View style={styles.trendsInsights}>
          {trendsData.insights.map((insight, index) => (
            <View key={index} style={styles.insightItem}>
              <Icon name="check-circle" size={16} color="#4CAF50" />
              <Text style={styles.insightText}>{insight}</Text>
            </View>
          ))}
        </View>
        
        <PrimaryButton
          title="Explore Trends"
          // onPress={() => navigation.navigate('InsightsAndAds')}  
          onPress={() => navigation.navigate('BuyerInsights')}  
          style={styles.trendsButton}
          type="outline"
          icon="arrow-forward"
        />
      </View>
    </ScrollView>
  );
};

export default HomeDashboard;