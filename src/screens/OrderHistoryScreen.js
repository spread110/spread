import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import { useRoute } from '@react-navigation/native';

const OrderHistoryScreen = () => {
  const route = useRoute();
  const { order } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.orderId}>Order #{order.id}</Text>
        <Text style={styles.orderDate}>{order.date}</Text>
        <Text style={styles.orderStatus}>{order.status}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Delivery Address</Text>
        <Text style={styles.address}>{order.address}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Items</Text>
        {order.items.map((item) => (
          <View key={item.id} style={styles.item}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>${item.price}</Text>
              <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Details</Text>
        <View style={styles.paymentDetails}>
          <Text style={styles.paymentLabel}>Payment Method:</Text>
          <Text style={styles.paymentValue}>{order.paymentMethod}</Text>
        </View>
        <View style={styles.paymentDetails}>
          <Text style={styles.paymentLabel}>Total Amount:</Text>
          <Text style={styles.paymentValue}>${order.total}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  orderId: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  orderDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  orderStatus: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 12,
  },
  address: {
    fontSize: 16,
    color: '#000',
    lineHeight: 24,
  },
  item: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 12,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  itemQuantity: {
    fontSize: 14,
    color: '#666',
  },
  paymentDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  paymentLabel: {
    fontSize: 16,
    color: '#000',
  },
  paymentValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
});

export default OrderHistoryScreen; 