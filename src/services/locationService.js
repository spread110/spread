import { PermissionsAndroid, Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import mapsConfig from '../config/maps';
import api from './api';

const locationService = {
  // Request location permissions
  requestLocationPermission: async () => {
    try {
      if (Platform.OS === 'ios') {
        const auth = await Geolocation.requestAuthorization('whenInUse');
        return auth === 'granted';
      }

      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Permission",
            message: "This app needs to access your location to show nearby services.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
      
      return false;
    } catch (error) {
      console.error('Location permission error:', error);
      return false;
    }
  },

  // Get current position
  getCurrentPosition: () => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        (position) => {
          resolve(position);
        },
        (error) => {
          reject(error);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    });
  },

  // Get address from coordinates
  getAddressFromCoordinates: async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${
          Platform.OS === 'ios' ? mapsConfig.iosApiKey : mapsConfig.androidApiKey
        }`
      );
      const data = await response.json();
      
      if (data.status === 'OK' && data.results.length > 0) {
        return data.results[0].formatted_address;
      }
      
      throw new Error('No address found');
    } catch (error) {
      console.error('Geocode error:', error);
      throw error;
    }
  },

  // Get coordinates from address
  getCoordinatesFromAddress: async (address) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address
        )}&key=${
          Platform.OS === 'ios' ? mapsConfig.iosApiKey : mapsConfig.androidApiKey
        }`
      );
      const data = await response.json();
      
      if (data.status === 'OK' && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        return { latitude: lat, longitude: lng };
      }
      
      throw new Error('No coordinates found');
    } catch (error) {
      console.error('Geocode error:', error);
      throw error;
    }
  },

  // Save address to user profile
  saveAddress: async (addressData) => {
    try {
      const response = await api.post('/user/addresses', addressData);
      return response.data;
    } catch (error) {
      console.error('Save address error:', error);
      throw error;
    }
  }
};

export default locationService; 