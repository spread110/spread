import { initializeApp } from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import storage from '@react-native-firebase/storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDa7Y1dcyi_RfJvoaAYDXPNlE2zbAW833U",
  authDomain: "spread-d2c62.firebaseapp.com",
  databaseURL: "https://spread-d2c62-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "spread-d2c62",
  storageBucket: "spread-d2c62.firebasestorage.app",
  messagingSenderId: "540250202728",
  appId: "1:540250202728:web:9bc44a59c0943efe1611dd",
  measurementId: "G-ZH36MGPSGN"
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Export the Firebase services
export const firebaseAuth = auth();
export const firebaseStorage = storage();
export const firebaseMessaging = messaging();

export default firebaseConfig; 