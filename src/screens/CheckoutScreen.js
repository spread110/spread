import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { orderService } from '../services/api';
import paymentService from '../services/paymentService';
import LocationMap from '../components/LocationMap';

const CheckoutScreen = () => {
  const navigation = useNavigation();
  const { cart, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setAddress(location.address);
  };

  const handlePlaceOrder = async () => {
    try {
      if (!address) {
        Alert.alert('Error', 'Please enter your delivery address');
        return;
      }

      setLoading(true);
      
      // Prepare order data
      const orderData = {
        items: cart,
        total: getCartTotal(),
        address,
        paymentMethod,
        coordinates: selectedLocation ? {
          latitude: selectedLocation.latitude,
          longitude: selectedLocation.longitude
        } : null
      };

      if (paymentMethod === 'razorpay') {
        // Create payment order
        const amount = Math.round(getCartTotal() * 100); // Convert to smallest currency unit (paise)
        const orderDetails = await paymentService.createOrder(amount);
        
        // Process payment
        const paymentData = await paymentService.processPayment(orderDetails, {
          name: user?.name || '',
          email: user?.email || '',
          phone: user?.phone || ''
        });
        
        // Add payment info to order
        orderData.paymentInfo = {
          paymentId: paymentData.razorpay_payment_id,
          orderId: paymentData.razorpay_order_id,
          signature: paymentData.razorpay_signature
        };
      }
      
      // Create order
      await orderService.createOrder(orderData);
      clearCart();
      navigation.navigate('OrderConfirmation');
    } catch (error) {
      console.error('Error placing order:', error);
      Alert.alert('Error', 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your delivery address"
            value={address}
            onChangeText={setAddress}
            multiline
          />
          <TouchableOpacity
            style={styles.mapButton}
            onPress={() => setShowMap(!showMap)}
          >
            <Text style={styles.mapButtonText}>
              {showMap ? 'Hide Map' : 'Select on Map'}
            </Text>
          </TouchableOpacity>
          
          {showMap && (
            <LocationMap
              mapHeight={250}
              onLocationSelect={handleLocationSelect}
              style={styles.map}
            />
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <TouchableOpacity
            style={[
              styles.paymentOption,
              paymentMethod === 'cash' && styles.selectedPayment,
            ]}
            onPress={() => setPaymentMethod('cash')}
          >
            <Text style={styles.paymentText}>Cash on Delivery</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.paymentOption,
              paymentMethod === 'razorpay' && styles.selectedPayment,
            ]}
            onPress={() => setPaymentMethod('razorpay')}
          >
            <Text style={styles.paymentText}>Pay Online (Razorpay)</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          {cart.map((item) => (
            <View key={item.id} style={styles.orderItem}>
              <Text style={styles.orderItemName}>
                {item.name} x {item.quantity}
              </Text>
              <Text style={styles.orderItemPrice}>
                ${(item.price * item.quantity).toFixed(2)}
              </Text>
            </View>
          ))}
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalAmount}>${getCartTotal()}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.placeOrderButton}
          onPress={handlePlaceOrder}
          disabled={loading}
        >
          <Text style={styles.placeOrderButtonText}>
            {loading ? 'Processing...' : 'Place Order'}
          </Text>
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
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  mapButton: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  mapButtonText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  map: {
    marginTop: 12,
    borderRadius: 8,
  },
  paymentOption: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 8,
  },
  selectedPayment: {
    borderColor: '#000',
    backgroundColor: '#f8f8f8',
  },
  paymentText: {
    fontSize: 16,
    color: '#000',
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  orderItemName: {
    fontSize: 16,
    color: '#000',
  },
  orderItemPrice: {
    fontSize: 16,
    color: '#000',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  placeOrderButton: {
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  placeOrderButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CheckoutScreen; 