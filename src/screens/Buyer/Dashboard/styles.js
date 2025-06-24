import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: { 
    backgroundColor: 'white', 
  }, 
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom:20, 
  },
    logo: { 
    width: 100, 
    height: 30,  
    // resizeMode: 'contain', 
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    letterSpacing: 1,
  },
  tabScrollContainer: {
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
  },
  tabText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'black',
    letterSpacing: 1,
  },
  activeTabText: {
    color: 'black',
  },
});