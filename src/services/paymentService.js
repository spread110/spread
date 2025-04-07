import RazorpayCheckout from 'react-native-razorpay';
import razorpayConfig from '../config/razorpay';
import api from './api';

const paymentService = {
  // Create order in backend
  createOrder: async (amount) => {
    try {
      // Create order in backend first
      const response = await api.post('/payments/create-order', { amount });
      return response.data;
    } catch (error) {
      console.error('Create order error:', error);
      throw error;
    }
  },

  // Process payment with Razorpay
  processPayment: async (orderDetails, userInfo) => {
    try {
      const options = {
        description: razorpayConfig.description,
        image: 'https://your-app-logo-url.png', // Replace with your logo URL
        currency: razorpayConfig.currency,
        key: razorpayConfig.keyId,
        amount: orderDetails.amount,
        name: razorpayConfig.name,
        order_id: orderDetails.id,
        prefill: {
          email: userInfo.email || '',
          contact: userInfo.phone || '',
          name: userInfo.name || '',
        },
        theme: razorpayConfig.theme
      };

      // Open Razorpay payment interface
      const paymentData = await new Promise((resolve, reject) => {
        RazorpayCheckout.open(options)
          .then((data) => {
            console.log('Payment success:', data);
            resolve(data);
          })
          .catch((error) => {
            console.log('Payment error:', error);
            reject(error);
          });
      });

      // Verify payment with backend
      await api.post('/payments/verify', {
        razorpay_payment_id: paymentData.razorpay_payment_id,
        razorpay_order_id: paymentData.razorpay_order_id,
        razorpay_signature: paymentData.razorpay_signature,
      });

      return paymentData;
    } catch (error) {
      console.error('Payment processing error:', error);
      throw error;
    }
  },

  // Get payment details
  getPaymentDetails: async (paymentId) => {
    try {
      const response = await api.get(`/payments/${paymentId}`);
      return response.data;
    } catch (error) {
      console.error('Get payment details error:', error);
      throw error;
    }
  }
};

export default paymentService; 