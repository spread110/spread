# Spread App Configuration Guide

This document provides instructions for setting up the configuration keys and variables needed for the Spread application.

## Firebase Setup

### 1. Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Follow the setup wizard to create your project

### 2. Add Apps to Your Firebase Project

1. In the Firebase console, select your project
2. Click the gear icon next to "Project Overview" and select "Project settings"
3. Scroll down to "Your apps" and click the Android/iOS icons to add your apps
4. Follow the setup instructions to register your apps

### 3. Configure Firebase Authentication

1. In the Firebase console, go to "Authentication"
2. Click "Get started"
3. Enable "Phone" authentication method
4. Set up the SMS verification (you may need to set up a billing account)

### 4. Configure Firebase Storage

1. In the Firebase console, go to "Storage"
2. Click "Get started" 
3. Follow the setup wizard to create your storage bucket

### 5. Configure Firebase Cloud Messaging

1. In the Firebase console, go to "Cloud Messaging"
2. Set up your Firebase Cloud Messaging credentials

### 6. Update Firebase Configuration

Update the `src/config/firebase.js` file with your Firebase project details:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};
```

## Google Maps Setup

### 1. Create Google Maps API Key

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Navigate to "APIs & Services" > "Credentials"
4. Create an API key
5. Enable the following APIs:
   - Maps SDK for Android
   - Maps SDK for iOS
   - Geocoding API
   - Places API

### 2. Update Google Maps Configuration

Update the `src/config/maps.js` file with your Google Maps API keys:

```javascript
const mapsConfig = {
  androidApiKey: "YOUR_ANDROID_API_KEY",
  iosApiKey: "YOUR_IOS_API_KEY",
};
```

## Razorpay Setup

### 1. Create a Razorpay Account

1. Sign up for a [Razorpay account](https://razorpay.com/)
2. Go to the Dashboard and get your API keys

### 2. Update Razorpay Configuration

Update the `src/config/razorpay.js` file with your Razorpay API keys:

```javascript
const razorpayConfig = {
  keyId: "YOUR_RAZORPAY_KEY_ID",
  keySecret: "YOUR_RAZORPAY_KEY_SECRET", // Only for backend usage
  currency: "INR",
  name: "Spread",
  description: "Payment for your order",
  theme: { color: "#000000" }
};
```

## Backend API Setup

### 1. Update API Configuration

Update the `src/config/api.js` file with your backend API URL:

```javascript
const apiConfig = {
  baseURL: 'YOUR_API_BASE_URL', // e.g., 'https://api.yourapp.com'
  timeout: 15000,
  socketURL: 'YOUR_SOCKET_URL', // e.g., 'https://socket.yourapp.com'
  useMockData: false // Set to false to use the real backend
};
```

## Setting Up Development Environment

### iOS

For iOS, you'll need to run the following commands:

```bash
cd ios
pod install
cd ..
```

### Android

For Android, you may need to add your Google Maps API key to `android/app/src/main/AndroidManifest.xml`.

## Running the App

After setting up all the configurations, you can run the app using:

```bash
# For iOS
npm run ios

# For Android
npm run android
```

## Troubleshooting

If you encounter any issues:

1. Make sure all API keys are correctly entered in the configuration files
2. Check that you've enabled the necessary services in Firebase
3. Verify that your backend API is running and accessible 