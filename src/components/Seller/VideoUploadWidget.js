import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { launchImageLibrary } from 'react-native-image-picker';

const VideoUploadWidget = ({ onVideoSelected, hasVideo }) => {
  const requestAndroidPermission = async () => {
    try {
      let permissions = [];
      
      if (Platform.Version >= 33) {
        // Android 13+ needs READ_MEDIA_VIDEO
        permissions = [
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        ];
      } else {
        // Older versions need WRITE_EXTERNAL_STORAGE
        permissions = [
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        ];
      }

      const granted = await PermissionsAndroid.requestMultiple(permissions);
      
      const allGranted = Object.values(granted).every(
        status => status === PermissionsAndroid.RESULTS.GRANTED
      );
      
      return allGranted;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const selectVideo = async () => {
    try {
      // Check and request permissions on Android
      if (Platform.OS === 'android') {
        const hasPermission = await requestAndroidPermission();
        if (!hasPermission) {
          Alert.alert(
            'Permission required',
            'Please allow storage access to upload videos',
            [{ text: 'OK' }]
          );
          return;
        }
      }

      const result = await launchImageLibrary({
        mediaType: 'video',
        videoQuality: 'high',
        durationLimit: 60,
        selectionLimit: 1,
      });
      
      if (!result.didCancel && !result.errorCode && result.assets?.length) {
        onVideoSelected(result.assets[0].uri);
      }
    } catch (error) {
      console.log('Video selection error:', error);
      Alert.alert(
        'Error',
        'Failed to select video. Please try again.',
        [{ text: 'OK' }]
      );
    }
  };

  return (
    <TouchableOpacity onPress={selectVideo} activeOpacity={0.7}>
      <View style={styles.videoContainer}>
        {hasVideo ? (
          <>
            <Image
              source={{ uri: hasVideo }}
              style={StyleSheet.absoluteFillObject}
              resizeMode="cover"
            />
            <View style={styles.priorityBadge}>
              <Text style={styles.priorityText}>PRIORITY</Text>
            </View>
          </>
        ) : (
          <>
            <Icon name="videocam" size={40} color="#black" />
            <Text style={styles.videoText}>Tap to upload video</Text>
            <Text style={styles.hintText}>60 seconds max</Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  videoContainer: {
    height: 150,
    width: '100%',
    borderWidth: 1,
    borderColor: '#D5D8DC',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    overflow: 'hidden',
    backgroundColor: '#F8F9FA',
  },
  videoText: {
    fontSize: 16,
    color: '#566573',
    marginTop: 8,
  },
  hintText: {
    fontSize: 12,
    color: '#95A5A6',
    marginTop: 4,
  },
  priorityBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#F39C12',
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  priorityText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default VideoUploadWidget;