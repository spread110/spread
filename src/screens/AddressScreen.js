import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import { addressService } from '../services/api';

const AddressScreen = () => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newAddress, setNewAddress] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const data = await addressService.getAddresses();
      setAddresses(data);
    } catch (error) {
      console.error('Error fetching addresses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAddress = async () => {
    if (!newAddress.trim()) {
      Alert.alert('Error', 'Please enter an address');
      return;
    }

    try {
      await addressService.addAddress({ address: newAddress });
      setNewAddress('');
      setIsAdding(false);
      fetchAddresses();
    } catch (error) {
      console.error('Error adding address:', error);
    }
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      await addressService.deleteAddress(addressId);
      fetchAddresses();
    } catch (error) {
      console.error('Error deleting address:', error);
    }
  };

  const renderAddressItem = ({ item }) => (
    <View style={styles.addressItem}>
      <Text style={styles.addressText}>{item.address}</Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteAddress(item.id)}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {isAdding ? (
        <View style={styles.addAddressContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter new address"
            value={newAddress}
            onChangeText={setNewAddress}
            multiline
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={() => setIsAdding(false)}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.saveButton]}
              onPress={handleAddAddress}
            >
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setIsAdding(true)}
        >
          <Text style={styles.addButtonText}>Add New Address</Text>
        </TouchableOpacity>
      )}

      <FlatList
        data={addresses}
        renderItem={renderAddressItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  addButton: {
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addAddressContainer: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  cancelButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#000',
  },
  saveButton: {
    backgroundColor: '#000',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  listContainer: {
    paddingBottom: 16,
  },
  addressItem: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addressText: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    marginRight: 12,
  },
  deleteButton: {
    padding: 8,
  },
  deleteButtonText: {
    color: '#ff4444',
    fontSize: 14,
  },
});

export default AddressScreen; 