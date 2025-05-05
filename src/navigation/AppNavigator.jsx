// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import React from 'react';
// import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';

// // Buyer Components
// import SplashScreen from '../components/SplashScreen/SplashScreen';
// import UserTypeSelection from '../components/UserTypeSelection/UserTypeSelection';
// import BuyerOnboarding from '../screens/Buyer/Onboarding/BuyerOnboarding';
// import OTPVerification from '../screens/Buyer/OTPVerification/OTPVerification';
// import HomeDashboard from '../screens/Buyer/Dashboard/HomeDashboard';
// import RequestStatus from '../screens/Buyer/Dashboard/RequestStatus';
// import SellerQuotes from '../screens/Buyer/Dashboard/SellerResponses/SellerQuotes';
// import ContactSellers from '../screens/Buyer/Dashboard/SellerResponses/ContactSellers';
// import InsightsAndAds from '../screens/Buyer/Dashboard/InsightsAndAds';

// // Seller Components
// import WelcomeProfileSetup from '../screens/Seller/WelcomeProfileSetup';
// import PendingApproval from '../screens/Seller/PendingApproval';
// import SellerOTPVerification from '../screens/Seller/OTPVerification';
// import SellerDashboard from '../screens/Seller/SellerDashboard';
// import LeadDetails from '../screens/Seller/LeadDetails';
// import ContactBuyer from '../screens/Seller/ContactBuyer';
// import MarketInsights from '../screens/Seller/MarketInsights';
// import SellerAccountPage from '../screens/Seller/SellerAccountPage'; // New premium account page
// import SellerBottomNav from '../screens/Seller/components/SellerBottomNav'; 

// // Create navigators
// const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();

// // Seller Bottom Tab Navigator
// function SellerTabs() {
//   return (
//     <Tab.Navigator
//       tabBar={(props) => <SellerBottomNav {...props} />}
//       screenOptions={{
//         headerShown: false,
//       }}
//     >
//       <Tab.Screen name="SellerDashboard" component={SellerDashboard} />
//       <Tab.Screen name="LeadDetails" component={LeadDetails} />
//       <Tab.Screen name="MarketInsights" component={MarketInsights} />
//       <Tab.Screen 
//         name="SellerAccount" 
//         component={SellerAccountPage}
//         options={{
//           tabBarLabel: 'Account',
//           tabBarIcon: ({ color, size }) => (
//             <MaterialIcons name="account-circle" size={size} color={color} />
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// }

// const AppNavigator = () => {
//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
//       <Stack.Navigator
//         initialRouteName="Splash"
//         screenOptions={{
//           headerShown: false,
//           animation: 'slide_from_right',
//           gestureEnabled: true,
//           gestureDirection: 'horizontal',
//         }}
//       >
//         {/* Initial Screens */}
//         <Stack.Screen
//           name="Splash"
//           component={SplashScreen}
//           options={{
//             animation: 'fade',
//             gestureEnabled: false,
//           }}
//         />

//         <Stack.Screen
//           name="UserTypeSelection"
//           component={UserTypeSelection}
//           options={{
//             gestureEnabled: false,
//           }}
//         />

//         {/* Buyer Flow */}
//         <Stack.Group
//           screenOptions={{
//             gestureEnabled: false,
//           }}
//         >
//           <Stack.Screen name="BuyerOnboarding" component={BuyerOnboarding} />
//           <Stack.Screen name="OTPVerification" component={OTPVerification} />
//         </Stack.Group>

//         {/* Buyer Dashboard & Sub-screens */}
//         <Stack.Group>
//           <Stack.Screen
//             name="HomeDashboard"
//             component={HomeDashboard}
//             options={{ gestureEnabled: false }}
//           />
//           <Stack.Screen name="RequestStatus" component={RequestStatus} />
//           <Stack.Screen name="SellerQuotes" component={SellerQuotes} />
//           <Stack.Screen name="ContactSellers" component={ContactSellers} />
//           <Stack.Screen name="InsightsAndAds" component={InsightsAndAds} />
//         </Stack.Group>

//         {/* Seller Flow */}
//         <Stack.Group
//           screenOptions={{
//             gestureEnabled: false,
//           }}
//         >
//           <Stack.Screen name="WelcomeProfileSetup" component={WelcomeProfileSetup} />
//           <Stack.Screen name="SellerOTPVerification" component={SellerOTPVerification} />
//           <Stack.Screen name="PendingApproval" component={PendingApproval} />
//         </Stack.Group>

//         {/* Seller Main App with Bottom Tabs */}
//         <Stack.Screen
//           name="SellerMain"
//           component={SellerTabs}
//           options={{ gestureEnabled: false }}
//         />

//         {/* Seller Sub-screens that should appear above tabs */}
//         <Stack.Group>
//           <Stack.Screen name="ContactBuyer" component={ContactBuyer} />
//           <Stack.Screen 
//             name="SellerAccountPage" 
//             component={SellerAccountPage}
//             options={{
//               animation: 'slide_from_bottom',
//               presentation: 'modal',
//             }}
//           />
//         </Stack.Group>
//       </Stack.Navigator>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//     marginTop: 0,
//   },
// });

// export default AppNavigator;




import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native'; 
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome'; 
import Ionicons from 'react-native-vector-icons/Ionicons'; 

// Buyer Components
import SplashScreen from '../components/SplashScreen/SplashScreen';
import UserTypeSelection from '../components/UserTypeSelection/UserTypeSelection';
import BuyerOnboarding from '../screens/Buyer/Onboarding/BuyerOnboarding';
import OTPVerification from '../screens/Buyer/OTPVerification/OTPVerification';
import HomeDashboard from '../screens/Buyer/Dashboard/HomeDashboard';
import RequestStatus from '../screens/Buyer/Dashboard/RequestStatus';
import SellerQuotes from '../screens/Buyer/Dashboard/SellerResponses/SellerQuotes';
import ContactSellers from '../screens/Buyer/Dashboard/SellerResponses/ContactSellers';
import InsightsAndAds from '../screens/Buyer/Dashboard/InsightsAndAds';
import ActiveLeads from '../screens/Buyer/Dashboard/ActiveLeads'
// import BuyerAccountPage from '../screens/Buyer/BuyerAccountPage';
import BuyerAccountPage from '../screens/Buyer/Dashboard/BuyerAccountPage';

// Seller Components
import WelcomeProfileSetup from '../screens/Seller/WelcomeProfileSetup';
import PendingApproval from '../screens/Seller/PendingApproval';
import SellerOTPVerification from '../screens/Seller/OTPVerification';
import SellerDashboard from '../screens/Seller/SellerDashboard';
import LeadDetails from '../screens/Seller/LeadDetails';
import ContactBuyer from '../screens/Seller/ContactBuyer';
import MarketInsights from '../screens/Seller/MarketInsights';
import SellerAccountPage from '../screens/Seller/SellerAccountPage';
import SellerBottomNav from '../screens/Seller/components/SellerBottomNav';
import BuyerBottomNav from '../screens/Buyer/components/BuyerBottomNav';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// Create navigators
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Buyer Bottom Tab Navigator
function BuyerTabs() {
  const iconName = 'account-search-outline'
  const activeIconName = 'account-search'
  return (
    <Tab.Navigator
      tabBar={(props) => <BuyerBottomNav {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen 
        name="BuyerHome" 
        component={HomeDashboard}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="ActiveLeads" 
        component={ActiveLeads}
        options={{
          tabBarLabel: 'Leads',
          tabBarIcon: ({ color, size }) => (
            // <MaterialCommunityIcons
            //     // name="account-search-outline"
            //     name="account-search"
            //     size={size}
            //     color={color}
            //   />
            <Ionicons name="ios-list-circle" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="BuyerInsights" 
        component={InsightsAndAds}
        options={{
          tabBarLabel: 'Insights',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="bar-chart" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="BuyerAccount" 
        component={BuyerAccountPage}
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="account-circle" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Seller Bottom Tab Navigator
function SellerTabs() {
  return (
    <Tab.Navigator
      tabBar={(props) => <SellerBottomNav {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="SellerDashboard" component={SellerDashboard} />
      <Tab.Screen name="LeadDetails" component={LeadDetails} />
      <Tab.Screen name="MarketInsights" component={MarketInsights} />
      <Tab.Screen 
        name="SellerAccount" 
        component={SellerAccountPage}
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="account-circle" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const AppNavigator = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        }}
      >
        {/* Initial Screens */}
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{
            animation: 'fade',
            gestureEnabled: false,
          }}
        />

        <Stack.Screen
          name="UserTypeSelection"
          component={UserTypeSelection}
          options={{
            gestureEnabled: false,
          }}
        />

        {/* Buyer Flow */}
        <Stack.Group
          screenOptions={{
            gestureEnabled: false,
          }}
        >
          <Stack.Screen name="BuyerOnboarding" component={BuyerOnboarding} />
          <Stack.Screen name="OTPVerification" component={OTPVerification} />
        </Stack.Group>

        {/* Buyer Main App with Bottom Tabs */}
        <Stack.Screen
          name="BuyerMain"
          component={BuyerTabs}
          options={{ gestureEnabled: false }}
        />

        {/* Buyer Sub-screens that should appear above tabs */}
        <Stack.Group>
          <Stack.Screen name="SellerQuotes" component={SellerQuotes} />
          <Stack.Screen name="ContactSellers" component={ContactSellers} />
          <Stack.Screen name="RequestStatus" component={RequestStatus} />  
          <Stack.Screen 
            name="BuyerAccountPage" 
            component={BuyerAccountPage}
            options={{
              animation: 'slide_from_bottom',
              presentation: 'modal',
            }}
          />
        </Stack.Group>

        {/* Seller Flow */}
        <Stack.Group
          screenOptions={{
            gestureEnabled: false,
          }}
        >
          <Stack.Screen name="WelcomeProfileSetup" component={WelcomeProfileSetup} />
          <Stack.Screen name="SellerOTPVerification" component={SellerOTPVerification} />
          <Stack.Screen name="PendingApproval" component={PendingApproval} />
        </Stack.Group>

        {/* Seller Main App with Bottom Tabs */}
        <Stack.Screen
          name="SellerMain"
          component={SellerTabs}
          options={{ gestureEnabled: false }}
        />

        {/* Seller Sub-screens that should appear above tabs */}
        <Stack.Group>
          <Stack.Screen name="ContactBuyer" component={ContactBuyer} />
          <Stack.Screen 
            name="SellerAccountPage" 
            component={SellerAccountPage}
            options={{
              animation: 'slide_from_bottom',
              presentation: 'modal',
            }}
          />
        </Stack.Group>
      </Stack.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: 0,
  },
});

export default AppNavigator;