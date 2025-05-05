import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Animated } from 'react-native'; 
import * as Animatable from 'react-native-animatable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { RefreshControl } from 'react-native';

const BuyerAccountPage = ({ route }) => {
 
  // Form data
  const { 
    businessName = "AKASH",
    pinCodes = "560003",
    deliveryTime = "30-45 minutes",
    phone = "+91 9876543210",
    selectedProducts = ["Profiles", "Hardware", "Glass"],
    videoUri = null
  } = route.params || {};

  // Additional seller data
  const [sellerStats, setSellerStats] = useState({
    completedOrders: 12,
    activeCustomers: 5,
    // rating: 4.8,
    // responseRate: "98%",
    joinedDate: "Jan 2022",
    // monthlyRevenue: "₹2,45,000",
    topSelling: "Hardware"
  });

  const [performanceMetrics] = useState([
    { metric: "Order Completion", value: "99.2%", trend: "up" },
    { metric: "Customer Satisfaction", value: "96.5%", trend: "up" },
    { metric: "Avg. Preparation Time", value: "22 min", trend: "down" },
    { metric: "Repeat Customers", value: "68%", trend: "up" },
  ]);

  const [recentReviews] = useState([
    { user: "Priya M.", rating: 5, comment: "Fresh products and always on time!", date: "2 days ago" },
    { user: "Rahul K.", rating: 4, comment: "Good quality but delivery was slightly late", date: "1 week ago" },
    { user: "Neha S.", rating: 5, comment: "Best bakery in town! Highly recommend", date: "2 weeks ago" },
  ]);

  const [activeTab, setActiveTab] = useState('overview');
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'performance':
        return (
          <PerformanceTab 
            metrics={performanceMetrics} 
            stats={sellerStats}
          />
        );
      case 'reviews':
        return <ReviewsTab reviews={recentReviews} />;
      case 'products':
        return <ProductsTab products={selectedProducts} />;
      default:
        return <ProductsTab products={selectedProducts} />;
    }
  };

  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
  
    // Simulate fetching updated seller stats or product info
    setTimeout(() => {
      // Example: update a stat
      setSellerStats((prev) => ({
        ...prev,
        completedOrders: prev.completedOrders + 1, // Dummy update
      }));
  
      setRefreshing(false);
    }, 1500);
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <ScrollView contentContainerStyle={styles.scrollContainer} 
      refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} /> }>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.profileHeader}>
            <Animatable.View animation="fadeIn" duration={1000}>
              <Image 
                source={{uri : "https://media.istockphoto.com/id/1682296067/photo/happy-studio-portrait-or-professional-man-real-estate-agent-or-asian-businessman-smile-for.jpg?s=612x612&w=0&k=20&c=9zbG2-9fl741fbTWw5fNgcEEe4ll-JegrGlQQ6m54rg=" }} 
                // source={require('../assets/seller-profile.jpg')} 
                style={styles.profileImage}
              />
            </Animatable.View>
            <View style={styles.headerTextContainer}>
              <Text style={styles.businessName}>{businessName}</Text>
              <View style={styles.ratingContainer}>
                <AntDesign name="star" size={18} color="#FFD700" />
                {/* <Text style={styles.ratingText}>{sellerStats.rating}</Text> */}
                <Text style={styles.reviewCount}>({sellerStats.completedOrders}+ orders)</Text>
              </View>
              <Text style={styles.joinedDate}>Member since {sellerStats.joinedDate}</Text>
            </View>
          </View>
          
          <View style={styles.contactContainer}>
            <TouchableOpacity style={styles.contactButton}>
              <Feather name="phone" size={18} color="#fff" />
              <Text style={styles.contactButtonText}>{phone}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats Cards */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.statsScroll}
        >
          <StatCard 
            icon="checkcircle" 
            value={sellerStats.completedOrders} 
            label="Orders Completed" 
            color="#4CAF50"
          />
          <StatCard 
            icon="users" 
            value={sellerStats.activeCustomers} 
            label="Active Customers" 
            color="#2196F3"
          />
          {/* <StatCard 
            icon="rupee" 
            value={sellerStats.monthlyRevenue} 
            label="Monthly Revenue" 
            color="#FF9800"
          /> */}
          {/* <StatCard 
            icon="clockcircle" 
            value={deliveryTime} 
            label="Avg. Delivery Time" 
            color="#9C27B0"
          /> */}
        </ScrollView>

        {/* Service Area */}
        <Animatable.View 
          animation="fadeInUp" 
          duration={800}
          style={styles.serviceAreaContainer}
        >
          <Text style={styles.sectionTitle}>Service Area</Text>
          <View style={styles.pinCodeContainer}>
            <FontAwesome name="map-marker" size={20} color="#E91E63" />
            <Text style={styles.pinCodes}>{pinCodes}</Text>
          </View>
          <Text style={styles.deliveryTime}>
            <MaterialIcons name="delivery-dining" size={18} color="#4CAF50" /> 
            Delivery in {deliveryTime}
          </Text>
        </Animatable.View>

        {/* Product Categories */}
        {/* <Animatable.View 
          animation="fadeInUp" 
          duration={800}
          style={styles.categoriesContainer}
        >
          <Text style={styles.sectionTitle}>Product Categories</Text>
          <View style={styles.categoriesList}>
            {selectedProducts.map((category, index) => (
              <View key={index} style={styles.categoryPill}>
                <Text style={styles.categoryText}>{category}</Text>
              </View>
            ))}
          </View>
        </Animatable.View> */}

        {/* Tabs Navigation */}
        

        {/* Tab Content */}
        {renderTabContent()}

        {/* Promo Video (if available) */}
        {videoUri && (
          <Animatable.View 
            animation="fadeInUp" 
            duration={1000}
            style={styles.videoContainer}
          >
            <Text style={styles.sectionTitle}>Our Story</Text>
            <View style={styles.videoPlaceholder}>
              <Ionicons name="play-circle" size={50} color="#fff" />
              <Text style={styles.videoText}>Play Introduction Video</Text>
            </View>
          </Animatable.View>
        )}
      </ScrollView>

      {/* Edit Profile Button */}
      <TouchableOpacity style={styles.editButton}>
        <Feather name="edit" size={20} color="#fff" />
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

// Tab Components
const OverviewTab = ({ sellerStats }) => (
  <View style={styles.tabContent}>
    <View style={styles.overviewItem}>
      <MaterialIcons name="trending-up" size={24} color="#4CAF50" />
      <View style={styles.overviewText}>
        <Text style={styles.overviewTitle}>Business Growth</Text>
        <Text style={styles.overviewValue}>Up by 27% this quarter</Text>
      </View>
    </View>
    <View style={styles.overviewItem}>
      <MaterialIcons name="local-offer" size={24} color="#FF9800" />
      <View style={styles.overviewText}>
        <Text style={styles.overviewTitle}>Top Selling</Text>
        <Text style={styles.overviewValue}>{sellerStats.topSelling}</Text>
      </View>
    </View>
    <View style={styles.overviewItem}>
      <FontAwesome name="repeat" size={24} color="#2196F3" />
      <View style={styles.overviewText}>
        <Text style={styles.overviewTitle}>Repeat Rate</Text>
        <Text style={styles.overviewValue}>{sellerStats.responseRate} response rate</Text>
      </View>
    </View>
  </View>
);

const PerformanceTab = ({ metrics, stats }) => (
  <View style={styles.tabContent}>
    <Text style={styles.performanceTitle}>Key Metrics</Text>
    {metrics.map((item, index) => (
      <View key={index} style={styles.metricItem}>
        <Text style={styles.metricName}>{item.metric}</Text>
        <View style={styles.metricValueContainer}>
          <Text style={styles.metricValue}>{item.value}</Text>
          <MaterialIcons 
            name={item.trend === "up" ? "arrow-drop-up" : "arrow-drop-down"} 
            size={24} 
            color={item.trend === "up" ? "#4CAF50" : "#F44336"} 
          />
        </View>
      </View>
    ))}
    {/* <View style={styles.performanceChartPlaceholder}>
      <Text style={styles.chartTitle}>Monthly Performance</Text>
      
      <View style={styles.chartLines}>
        {[1, 2, 3, 4, 5].map((_, i) => (
          <View key={i} style={styles.chartLine} />
        ))}
      </View>
    </View> */}
  </View>
);

const ReviewsTab = ({ reviews }) => (
  <View style={styles.tabContent}>
    {reviews.map((review, index) => (
      <View key={index} style={styles.reviewItem}>
        <View style={styles.reviewHeader}>
          <Text style={styles.reviewUser}>{review.user}</Text>
          <View style={styles.reviewRating}>
            {[...Array(5)].map((_, i) => (
              <AntDesign 
                key={i} 
                name={i < review.rating ? "star" : "staro"} 
                size={16} 
                color="#FFD700" 
              />
            ))}
          </View>
        </View>
        <Text style={styles.reviewComment}>{review.comment}</Text>
        <Text style={styles.reviewDate}>{review.date}</Text>
      </View>
    ))}
    <TouchableOpacity style={styles.seeAllButton}>
      <Text style={styles.seeAllText}>See All Reviews</Text>
    </TouchableOpacity>
  </View>
);

const ProductsTab = ({ products }) => (
  <View style={styles.tabContent}>
    <Text style={styles.productsTitle}>Your Product Categories</Text>
    {products.map((product, index) => (
      <View key={index} style={styles.productItem}>
        <View style={styles.productIcon}>
          <MaterialIcons 
            name={getProductIcon(product)} 
            size={24} 
            color="#3F51B5" 
          />
        </View>
        <Text style={styles.productName}>{product}</Text>
        <MaterialIcons name="chevron-right" size={24} color="#9E9E9E" />
      </View>
    ))}
    <TouchableOpacity style={styles.addProductButton}>
      <Ionicons name="add-circle" size={20} color="#fff" />
      <Text style={styles.addProductText}>Add New Product Category</Text>
    </TouchableOpacity>
  </View>
);

const StatCard = ({ icon, value, label, color }) => (
  <Animatable.View 
    animation="fadeInRight" 
    duration={800}
    style={[styles.statCard, { borderLeftColor: color }]}
  >
    <AntDesign name={icon} size={24} color={color} />
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </Animatable.View>
);

// Helper function for product icons
const getProductIcon = (product) => {
  switch(product.toLowerCase()) {
    case 'bakery': return 'local-dining';
    case 'dairy': return 'local-drink';
    case 'organic': return 'spa';
    case 'beverages': return 'local-bar';
    case 'snacks': return 'fastfood';
    default: return 'shopping-basket';
  }
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContainer: {
    paddingBottom: 100,
  },
  header: {
    marginTop:30,
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  headerTextContainer: {
    marginLeft: 15,
    flex: 1,
  },
  businessName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 5,
    color: '#333',
  },
  reviewCount: {
    fontSize: 14,
    color: '#777',
    marginLeft: 5,
  },
  joinedDate: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
  },
  contactContainer: {
    marginTop: 10,
  },
  contactButton: {
    backgroundColor: '#3F51B5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    elevation: 2,
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  statsScroll: {
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  statCard: {
    backgroundColor: '#fff',
    width: 150,
    padding: 15,
    borderRadius: 10,
    marginRight: 15,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '700',
    marginVertical: 5,
    color: '#333',
  },
  statLabel: {
    fontSize: 14,
    color: '#777',
  },
  serviceAreaContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginBottom: 15,
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 15,
  },
  pinCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  pinCodes: {
    fontSize: 16,
    color: '#555',
    marginLeft: 10,
  },
  deliveryTime: {
    fontSize: 16,
    color: '#555',
    marginTop: 5,
  },
  categoriesContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginBottom: 15,
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  categoriesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categoryPill: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  categoryText: {
    color: '#1976D2',
    fontSize: 14,
    fontWeight: '500',
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginHorizontal: 15,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#3F51B5',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  tabContent: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginBottom: 20,
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  overviewItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  overviewText: {
    marginLeft: 15,
    flex: 1,
  },
  overviewTitle: {
    fontSize: 16,
    color: '#777',
  },
  overviewValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 3,
  },
  performanceTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 20,
  },
  metricItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  metricName: {
    fontSize: 16,
    color: '#555',
  },
  metricValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metricValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginRight: 5,
  },
  performanceChartPlaceholder: {
    marginTop: 30,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
    marginBottom: 15,
  },
  chartLines: {
    width: '100%',
    height: 150,
    justifyContent: 'space-between',
  },
  chartLine: {
    height: 1,
    width: '100%',
    backgroundColor: '#ddd',
  },
  reviewItem: {
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  reviewUser: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  reviewRating: {
    flexDirection: 'row',
  },
  reviewComment: {
    fontSize: 15,
    color: '#555',
    marginBottom: 5,
  },
  reviewDate: {
    fontSize: 13,
    color: '#999',
  },
  seeAllButton: {
    alignSelf: 'center',
    marginTop: 10,
  },
  seeAllText: {
    color: '#3F51B5',
    fontSize: 16,
    fontWeight: '600',
  },
  productsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 20,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  productIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8EAF6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  productName: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  addProductButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3F51B5',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  addProductText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  videoContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginBottom: 20,
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  videoPlaceholder: {
    height: 180,
    backgroundColor: '#333',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 10,
  },
  editButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#3F51B5',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default BuyerAccountPage;