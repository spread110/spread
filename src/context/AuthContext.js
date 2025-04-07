import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authService from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // Store phone auth confirmation state for OTP verification
  const [confirmation, setConfirmation] = useState(null);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      setLoading(true);
      const userData = await authService.getCurrentUser();
      if (userData) {
        setUser(userData);
      }
    } catch (error) {
      console.error('Error checking user:', error);
    } finally {
      setLoading(false);
    }
  };

  const signInWithPhone = async (phoneNumber) => {
    try {
      setLoading(true);
      const confirmationResult = await authService.signInWithPhoneNumber(phoneNumber);
      setConfirmation(confirmationResult);
      return confirmationResult;
    } catch (error) {
      console.error('Error signing in with phone:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const confirmOTP = async (otp) => {
    try {
      setLoading(true);
      if (!confirmation) {
        throw new Error('No confirmation pending');
      }
      
      const userData = await authService.confirmOTP(confirmation, otp);
      setUser(userData.user);
      setConfirmation(null);
      return userData;
    } catch (error) {
      console.error('Error confirming OTP:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await authService.signOut();
      setUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        loading, 
        confirmation,
        signInWithPhone, 
        confirmOTP, 
        logout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 