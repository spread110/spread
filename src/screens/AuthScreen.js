import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import FastImageComponent from '../components/FastImageComponent';

const AuthScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const { signInWithPhone, confirmOTP, loading, confirmation } = useAuth();

  // Auto detect when confirmation changes
  useEffect(() => {
    if (confirmation) {
      setShowOtpInput(true);
    }
  }, [confirmation]);

  const handleSendOTP = async () => {
    if (!phoneNumber) {
      Alert.alert('Error', 'Please enter your phone number');
      return;
    }
    
    try {
      await signInWithPhone(phoneNumber);
      // setShowOtpInput will be triggered by useEffect
    } catch (error) {
      Alert.alert('Error', 'Failed to send OTP. Please try again.');
      console.error(error);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp) {
      Alert.alert('Error', 'Please enter the OTP');
      return;
    }
    
    try {
      await confirmOTP(otp);
      // Navigation will be handled in AppNavigator based on auth state
    } catch (error) {
      Alert.alert('Error', 'Invalid OTP. Please try again.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <FastImageComponent
          source={require('../../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      
      <Text style={styles.title}>Welcome to Spread</Text>
      <Text style={styles.subtitle}>Enter your phone number to continue</Text>

      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        maxLength={10}
        editable={!loading && !showOtpInput}
      />

      {showOtpInput && (
        <TextInput
          style={styles.input}
          placeholder="Enter OTP"
          value={otp}
          onChangeText={setOtp}
          keyboardType="number-pad"
          maxLength={6}
          editable={!loading}
        />
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={showOtpInput ? handleVerifyOTP : handleSendOTP}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" size="small" />
        ) : (
          <Text style={styles.buttonText}>
            {showOtpInput ? 'Verify OTP' : 'Send OTP'}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
    color: '#666',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AuthScreen; 