import React, { useEffect } from 'react';
import { LogBox } from 'react-native';
import { AuthProvider } from './src/context/AuthContext';
import { CartProvider } from './src/context/CartContext';
import AppNavigator from './src/navigation/AppNavigator';
import notificationService from './src/services/notificationService';
import socketService from './src/services/socketService';
import apiConfig from './src/config/api';

// Ignore specific warnings
LogBox.ignoreLogs([
  'Sending `onAnimatedValueUpdate` with no listeners registered',
  'Setting a timer for a long period of time',
]);

export default function App() {
  useEffect(() => {
    // Set up notifications
    const setupNotifications = async () => {
      await notificationService.requestUserPermission();
      notificationService.setupBackgroundHandler();
      
      // Handle notification when app is opened
      notificationService.checkInitialNotification((notification) => {
        console.log('App opened from notification:', notification);
        // Handle notification based on data - could navigate to specific screen
      });
    };
    
    // Initialize Socket.IO when backend is ready
    const initializeSocket = async () => {
      try {
        if (!apiConfig.useMockData && apiConfig.socketURL) {
          await socketService.init(apiConfig.socketURL);
        }
      } catch (error) {
        console.error('Socket initialization failed:', error);
      }
    };
    
    setupNotifications();
    initializeSocket();
    
    // Cleanup
    return () => {
      // Disconnect socket when app is closed
      socketService.disconnect();
    };
  }, []);

  return (
    <AuthProvider>
      <CartProvider>
        <AppNavigator />
      </CartProvider>
    </AuthProvider>
  );
} 