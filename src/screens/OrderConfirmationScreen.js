import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const OrderConfirmationScreen = () => {
  const navigation = useNavigation();

  const handleContinueShopping = () => {
    navigation.navigate('Home');
  };

  const handleViewOrders = () => {
    navigation.navigate('Orders');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.checkmarkCircle}>
          <Text style={styles.checkmarkText}>✓</Text>
        </View>
        <Text style={styles.title}>Order Confirmed!</Text>
        <Text style={styles.subtitle}>
          Your order has been placed successfully.
        </Text>
        <Text style={styles.message}>
          We'll send you a confirmation email with the order details.
        </Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinueShopping}
        >
          <Text style={styles.continueButtonText}>Continue Shopping</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.ordersButton}
          onPress={handleViewOrders}
        >
          <Text style={styles.ordersButtonText}>View Orders</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  checkmarkCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkmarkText: {
    fontSize: 60,
    color: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#000',
    marginBottom: 10,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  continueButton: {
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  ordersButton: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
  },
  ordersButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OrderConfirmationScreen; 