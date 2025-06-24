import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', 
    paddingHorizontal: 15,
  },
  descriptionContainer: {
    marginVertical: 15,
  },
  descriptionTitle: {
    fontSize: 22, 
    color: '#000000', 
    marginBottom: 8,
    textAlign: 'center',
  },
  descriptionText: {
    fontSize: 14, 
    color: '#333333', 
    lineHeight: 22,
    textAlign: 'center',
  },
  videoContainer: { 
    width: '100%',
    aspectRatio: 13 / 16,  
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 15,
  },
  videoPlayer: {
    width: '100%',
    height: '100%',
  },
  videoFallback: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  fallbackText: {
    color: '#FFFFFF',
    marginTop: 10,
    fontSize: 16,
  },
  carouselContainer: {
    marginVertical: 20,
  },
  carouselTitle: {
    fontSize: 18, 
    color: '#000000',
    textAlign: 'center',
    marginBottom: 15,
    letterSpacing: 1,
  },
  carouselContent: { 
  },
  carouselItem: {
    width: width * 0.75,  
    height: 90,
    backgroundColor: '#FFFFFF', 
    borderRadius: 10,
    marginRight: 15,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E0E0E0', 
  },
  carouselContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  carouselTextContainer: {
    flex: 1,
  },
  carouselText: {
    fontSize: 16, 
    color: '#000000',
    marginBottom: 5,
  },
  carouselTimestamp: {
    fontSize: 12,
    color: '#A0A0A0', 
  },
  playIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F0', 
    justifyContent: 'center',
    alignItems: 'center',
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
  letterSpacing: 1,
},
});