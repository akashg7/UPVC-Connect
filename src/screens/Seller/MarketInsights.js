import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AppText from '../../components/AppText';

const { width } = Dimensions.get('window');

const MarketInsights = () => {
  const [activeTab, setActiveTab] = useState('featured');
  const [likedPosts, setLikedPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);
 
  const ads = [
    {
      id: '1',
      type: 'video',
      url: 'https://www.w3schools.com/html/mov_bbb.mp4',
      thumbnail: 'https://www.sony.co.in/image/bc6d25fa6371c2899ce704a2bed7614c?fmt=png-alpha&wid=960',
      title: 'New Product Launch',
      description: 'Discover our revolutionary new product line',
      likes: 243,
      isLiked: false,
      isSaved: false,
    },
    {
      id: '2',
      type: 'image',
      url: 'https://www.sony.co.in/image/bc6d25fa6371c2899ce704a2bed7614c?fmt=png-alpha&wid=960',
      title: 'uPVC Collection',
      description: 'Check out our exclusive summer collection',
      likes: 156,
      isLiked: false,
      isSaved: false,
    }, 
  ];

  const toggleLike = (id) => {
    if (likedPosts.includes(id)) {
      setLikedPosts(likedPosts.filter(postId => postId !== id));
    } else {
      setLikedPosts([...likedPosts, id]);
    }
  };

  const toggleSave = (id) => {
    if (savedPosts.includes(id)) {
      setSavedPosts(savedPosts.filter(postId => postId !== id));
    } else {
      setSavedPosts([...savedPosts, id]);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.postContainer}>
      <View style={styles.postHeader}>
        <AppText weight='SemiBold' style={styles.postTitle}>{item.title}</AppText> 
      </View>
      
      {item.type === 'video' ? (
        <View style={styles.videoContainer}>
          <Video
            source={{ uri: item.url }}
            style={styles.video}
            resizeMode="cover"
            poster={item.thumbnail}
            posterResizeMode="cover"
            controls
            paused
          />
        </View>
      ) : (
        <Image source={{ uri: item.url }} style={styles.image} resizeMode="cover" />
      )}
      
      <AppText weight='Inter' style={styles.postDescription}>{item.description}</AppText>
      
      <View style={styles.postFooter}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => toggleLike(item.id)}
        >
          <Icon 
            name={likedPosts.includes(item.id) ? "favorite" : "favorite-border"} 
            size={24} 
            color={likedPosts.includes(item.id) ? "red" : "black"} 
          />
          <AppText weight='Inter' style={styles.actionText}>{item.likes + (likedPosts.includes(item.id) ? 1 : 0)}</AppText>
        </TouchableOpacity>
         
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="share" size={22} color="black" />
          <AppText weight='Inter' style={styles.actionText}>Share</AppText>
        </TouchableOpacity>
         
      </View>
    </View>
  );

  return (
    <View style={styles.container}> 
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logo}
        />
      <View style={styles.tabs}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'featured' && styles.activeTab]}
          onPress={() => setActiveTab('featured')}
        >
          <AppText weight='SemiBold' style={[styles.tabText, activeTab === 'featured' && styles.activeTabText]}>Featured</AppText>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'latest' && styles.activeTab]}
          onPress={() => setActiveTab('latest')}
        >
          <AppText weight='SemiBold' style={[styles.tabText, activeTab === 'latest' && styles.activeTabText]}>Latest</AppText>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'trending' && styles.activeTab]}
          onPress={() => setActiveTab('trending')}
        >
          <AppText weight='SemiBold' style={[styles.tabText, activeTab === 'trending' && styles.activeTabText]}>Trending</AppText>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={ads}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom:80,
    paddingTop:20,
  },  
  logo: { 
    alignSelf:"center",
    width: 100, 
    height: 100,  
    resizeMode: 'contain', 
  },
  tabs: {
    flexDirection: 'row', 
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 15,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: 'black', 
  },
  tabText: {
    fontSize: 16,
    color: '#888',
    // fontWeight: '500',
  },
  activeTabText: { 
    color: 'black',
  },
  listContent: {
    paddingBottom: 20,
  },
  postContainer: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  postHeader: { 
    marginBottom: 10,
  },
  postTitle: {
    textAlign:"center",
    fontSize: 18,
    // fontWeight: '600',
    color: 'black',
  },
  videoContainer: {
    width: '100%',
    aspectRatio: 9 / 16,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  image: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },
  postDescription: {
    fontSize: 14,
    color: '#333',
    marginTop: 10,
    lineHeight: 20,
  },
  postFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    justifyContent:"space-between"
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  actionText: {
    fontSize: 14,
    color: 'black',
    marginLeft: 5,
  },
});

export default MarketInsights;