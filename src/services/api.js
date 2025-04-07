import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { mockProducts, mockOrders, mockAddresses } from './mockData';
import authService from './authService';

// Use this flag to switch between mock data and actual API
const USE_MOCK_DATA = true; // Set to false when connecting to real backend

// API configuration
const API_CONFIG = {
  baseURL: 'YOUR_API_BASE_URL', // Replace with your actual API URL
  timeout: 15000, // 15 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
};

const api = axios.create(API_CONFIG);

// Add a request interceptor to add the auth token to requests
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await authService.getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error getting token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Handle token expiration and refresh
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Attempt to refresh token or re-authenticate
        // This would be implemented in your Auth service
        // const newToken = await refreshToken();
        // If successful, retry the original request
        // return api(originalRequest);
      } catch (refreshError) {
        // If refresh fails, you might want to log the user out
        // await authService.signOut();
      }
    }
    
    return Promise.reject(error);
  }
);

export const authService = {
  login: async (phoneNumber) => {
    if (USE_MOCK_DATA) {
      // Simulate API call with a delay
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ success: true });
        }, 1000);
      });
    }
    const response = await api.post('/auth/login', { phoneNumber });
    return response.data;
  },
  verifyOTP: async (phoneNumber, otp) => {
    if (USE_MOCK_DATA) {
      // Simulate API call with a delay
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ 
            success: true, 
            user: { 
              id: '1', 
              name: 'Test User', 
              phone: phoneNumber, 
              avatar: 'https://via.placeholder.com/150' 
            } 
          });
        }, 1000);
      });
    }
    const response = await api.post('/auth/verify-otp', { phoneNumber, otp });
    return response.data;
  },
};

export const productService = {
  getCategories: async () => {
    if (USE_MOCK_DATA) {
      // Return fixed categories defined in HomeScreen
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            { id: '1', name: 'Food', icon: 'fast-food' },
            { id: '2', name: 'Groceries', icon: 'cart' },
            { id: '3', name: 'Electronics', icon: 'laptop' },
            { id: '4', name: 'Fashion', icon: 'shirt' },
            { id: '5', name: 'Home & Living', icon: 'home' },
            { id: '6', name: 'Beauty', icon: 'sparkles' },
          ]);
        }, 500);
      });
    }
    const response = await api.get('/categories');
    return response.data;
  },
  getProducts: async (categoryId) => {
    if (USE_MOCK_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(mockProducts[categoryId] || []);
        }, 500);
      });
    }
    const response = await api.get(`/products?category=${categoryId}`);
    return response.data;
  },
  getProductDetails: async (productId) => {
    if (USE_MOCK_DATA) {
      // Find the product in all categories
      return new Promise((resolve) => {
        setTimeout(() => {
          let product = null;
          Object.values(mockProducts).forEach(categoryProducts => {
            const found = categoryProducts.find(p => p.id === productId);
            if (found) product = found;
          });
          resolve(product);
        }, 500);
      });
    }
    const response = await api.get(`/products/${productId}`);
    return response.data;
  },
};

export const orderService = {
  createOrder: async (orderData) => {
    if (USE_MOCK_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const newOrder = {
            id: `${1000 + mockOrders.length + 1}`,
            date: new Date().toISOString().split('T')[0],
            status: 'Processing',
            ...orderData
          };
          mockOrders.push(newOrder);
          resolve(newOrder);
        }, 1000);
      });
    }
    const response = await api.post('/orders', orderData);
    return response.data;
  },
  getOrders: async () => {
    if (USE_MOCK_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(mockOrders);
        }, 500);
      });
    }
    const response = await api.get('/orders');
    return response.data;
  },
  getOrderDetails: async (orderId) => {
    if (USE_MOCK_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const order = mockOrders.find(o => o.id === orderId);
          resolve(order || null);
        }, 500);
      });
    }
    const response = await api.get(`/orders/${orderId}`);
    return response.data;
  },
  trackOrder: async (orderId) => {
    if (USE_MOCK_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            id: orderId,
            status: 'Out for Delivery',
            estimatedDelivery: '30 minutes',
            currentLocation: {
              latitude: 37.7749,
              longitude: -122.4194,
            }
          });
        }, 500);
      });
    }
    const response = await api.get(`/orders/${orderId}/track`);
    return response.data;
  }
};

export const addressService = {
  getAddresses: async () => {
    if (USE_MOCK_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(mockAddresses);
        }, 500);
      });
    }
    const response = await api.get('/addresses');
    return response.data;
  },
  addAddress: async (addressData) => {
    if (USE_MOCK_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const newAddress = {
            id: `${mockAddresses.length + 1}`,
            ...addressData
          };
          mockAddresses.push(newAddress);
          resolve(newAddress);
        }, 1000);
      });
    }
    const response = await api.post('/addresses', addressData);
    return response.data;
  },
  updateAddress: async (addressId, addressData) => {
    if (USE_MOCK_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const index = mockAddresses.findIndex(a => a.id === addressId);
          if (index !== -1) {
            mockAddresses[index] = { ...mockAddresses[index], ...addressData };
            resolve(mockAddresses[index]);
          } else {
            resolve(null);
          }
        }, 1000);
      });
    }
    const response = await api.put(`/addresses/${addressId}`, addressData);
    return response.data;
  },
  deleteAddress: async (addressId) => {
    if (USE_MOCK_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const index = mockAddresses.findIndex(a => a.id === addressId);
          if (index !== -1) {
            mockAddresses.splice(index, 1);
          }
          resolve({ success: true });
        }, 1000);
      });
    }
    const response = await api.delete(`/addresses/${addressId}`);
    return response.data;
  },
};

export default api; 