import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { productService } from '../services/api';
import Icon from 'react-native-vector-icons/Ionicons';

const categories = [
  { id: '1', name: 'Food', icon: 'fast-food' },
  { id: '2', name: 'Groceries', icon: 'cart' },
  { id: '3', name: 'Electronics', icon: 'laptop' },
  { id: '4', name: 'Fashion', icon: 'shirt' },
  { id: '5', name: 'Home & Living', icon: 'home' },
  { id: '6', name: 'Beauty', icon: 'sparkles' },
];

const HomeScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  const handleCategoryPress = (category) => {
    navigation.navigate('ProductList', { categoryId: category.id });
  };

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryItem}
      onPress={() => handleCategoryPress(item)}
    >
      <View style={styles.categoryIcon}>
        <Icon name={item.icon} size={30} color="#fff" />
      </View>
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categories</Text>
      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  listContainer: {
    paddingBottom: 20,
  },
  categoryItem: {
    flex: 1,
    margin: 8,
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconText: {
    fontSize: 24,
    color: '#fff',
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
  },
});

export default HomeScreen; 