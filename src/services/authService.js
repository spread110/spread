import { firebaseAuth } from '../config/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './api';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'user';

const authService = {
  // Sign in with phone number
  signInWithPhoneNumber: async (phoneNumber) => {
    try {
      // Format phone number correctly
      const formattedNumber = phoneNumber.startsWith('+') 
        ? phoneNumber 
        : `+91${phoneNumber}`; // Assuming default country code is India
      
      const confirmation = await firebaseAuth.signInWithPhoneNumber(formattedNumber);
      return confirmation;
    } catch (error) {
      console.error('Firebase phone auth error:', error);
      throw error;
    }
  },

  // Verify OTP code
  confirmOTP: async (confirmation, otp) => {
    try {
      await confirmation.confirm(otp);
      const currentUser = firebaseAuth.currentUser;
      
      if (currentUser) {
        // Get token from Firebase
        const idToken = await currentUser.getIdToken();
        
        // Authenticate with backend to get JWT
        const response = await api.post('/auth/login', {
          firebaseToken: idToken
        });
        
        // Save the JWT and user data
        await AsyncStorage.setItem(TOKEN_KEY, response.data.token);
        await AsyncStorage.setItem(USER_KEY, JSON.stringify(response.data.user));
        
        return response.data;
      }
      
      throw new Error('Authentication failed');
    } catch (error) {
      console.error('OTP verification error:', error);
      throw error;
    }
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      const userData = await AsyncStorage.getItem(USER_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  },

  // Get auth token
  getToken: async () => {
    try {
      return await AsyncStorage.getItem(TOKEN_KEY);
    } catch (error) {
      console.error('Get token error:', error);
      return null;
    }
  },

  // Sign out
  signOut: async () => {
    try {
      await firebaseAuth.signOut();
      await AsyncStorage.removeItem(TOKEN_KEY);
      await AsyncStorage.removeItem(USER_KEY);
      return true;
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  },

  // Check if user is authenticated
  isAuthenticated: async () => {
    try {
      const token = await AsyncStorage.getItem(TOKEN_KEY);
      return !!token;
    } catch (error) {
      console.error('Auth check error:', error);
      return false;
    }
  }
};

export default authService; 