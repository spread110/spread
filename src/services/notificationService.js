import { Platform, PermissionsAndroid } from 'react-native';
import { firebaseMessaging } from '../config/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './api';

const FCM_TOKEN_KEY = 'fcm_token';

const notificationService = {
  // Request permissions for notifications
  requestUserPermission: async () => {
    try {
      if (Platform.OS === 'android') {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
        );
      }
      
      const authStatus = await firebaseMessaging.requestPermission();
      const enabled =
        authStatus === firebaseMessaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === firebaseMessaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Notification permission granted');
        await notificationService.getFCMToken();
      }
      
      return enabled;
    } catch (error) {
      console.error('Permission request error:', error);
      return false;
    }
  },

  // Get FCM token
  getFCMToken: async () => {
    try {
      const fcmToken = await firebaseMessaging.getToken();
      if (fcmToken) {
        console.log('FCM Token:', fcmToken);
        await AsyncStorage.setItem(FCM_TOKEN_KEY, fcmToken);
        
        // Send the token to your backend
        try {
          await api.post('/notifications/register-device', { token: fcmToken });
        } catch (error) {
          console.error('Error sending FCM token to backend:', error);
        }
        
        return fcmToken;
      }
    } catch (error) {
      console.error('FCM token error:', error);
      return null;
    }
  },

  // Handle background notifications
  setupBackgroundHandler: () => {
    // Register background handler
    firebaseMessaging.setBackgroundMessageHandler(async (remoteMessage) => {
      console.log('Message handled in the background:', remoteMessage);
      return Promise.resolve();
    });
  },

  // Set up foreground notification handlers
  setupForegroundListeners: (onNotificationReceived) => {
    // When the app is in foreground
    const unsubscribe = firebaseMessaging.onMessage(async (remoteMessage) => {
      console.log('Foreground notification received:', remoteMessage);
      if (typeof onNotificationReceived === 'function') {
        onNotificationReceived(remoteMessage);
      }
    });

    return unsubscribe;
  },

  // Handle notification open events
  setupNotificationOpenedListener: (onNotificationOpened) => {
    // When the app is opened from a notification
    const unsubscribe = firebaseMessaging.onNotificationOpenedApp((remoteMessage) => {
      console.log('Notification opened app:', remoteMessage);
      if (typeof onNotificationOpened === 'function') {
        onNotificationOpened(remoteMessage);
      }
    });

    return unsubscribe;
  },

  // Check if app was opened from a notification
  checkInitialNotification: async (onInitialNotification) => {
    // Check if app was opened from a quit state
    const initialNotification = await firebaseMessaging.getInitialNotification();
    
    if (initialNotification) {
      console.log('App opened from quit state:', initialNotification);
      if (typeof onInitialNotification === 'function') {
        onInitialNotification(initialNotification);
      }
    }
  }
};

export default notificationService; 