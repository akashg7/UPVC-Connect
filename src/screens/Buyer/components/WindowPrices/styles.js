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
    // fontWeight: '600',
  },
  descriptionText: {
    fontSize: 14,
    color: '#333333',
    lineHeight: 22,
    textAlign: 'center',
  },
  videoContainer: {
    width: '100%',
    aspectRatio: 6 / 9,
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 15,
    backgroundColor: '#000000',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
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
    marginTop: 25,
    marginBottom: 10,
  },
  carouselTitle: {
    fontSize: 18,
    // color: '',
    textAlign: 'center',
    marginBottom: 15,
    letterSpacing: 1,
    // fontWeight: '600',
  },
  carouselListContent: {
    paddingHorizontal: 10,
  },
  carouselItem: {
    width: width * 0.75,
    height: 100,
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth:1,
    marginRight: 15,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: 'white',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 40,
  },
  carouselContent: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
  },
  thumbnailImage: {
    width: 100,
    height: '100%',
    backgroundColor: '#F0F0F0',
  },
  carouselTextContainer: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  carouselText: {
    fontSize: 15,
    color: '#000000',
    marginBottom: 5,
    // fontWeight: '500',
  },
  carouselTimestamp: {
    fontSize: 12,
    color: '#666666',
  },
  playIconContainer: {
    paddingRight: 15,
  },
  buyNowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
    marginBottom: 30,
  },
  buyNowButton: {
    width: '70%',
    backgroundColor: '#000000',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buyNowText: {
    color: '#FFFFFF',
    fontSize: 16,
    letterSpacing: 1, 
  },
  // Add these to your existing styles
activeCarouselItem: {
  // borderColor: 'black',
  borderWidth: 2,
},
activeCarouselText: {
  color: 'black',
  // fontWeight: '600',
},
activeCarouselTimestamp: {
  color: 'black',
},
thumbnailImage: {
  width: 100,
  height: '100%',
  backgroundColor: 'black',
},
});