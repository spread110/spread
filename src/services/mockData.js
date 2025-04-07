// Mock data for products, orders, and addresses
// This is to be used for development and testing

export const mockProducts = {
  1: [
    {
      id: '101',
      name: 'Veggie Pizza',
      price: 12.99,
      image: 'https://via.placeholder.com/300x200?text=Veggie+Pizza',
      description: 'A delicious pizza topped with fresh vegetables, mozzarella cheese, and tomato sauce on a crispy crust.',
      categoryId: '1',
    },
    {
      id: '102',
      name: 'Chicken Burger',
      price: 8.99,
      image: 'https://via.placeholder.com/300x200?text=Chicken+Burger',
      description: 'A juicy chicken patty with lettuce, tomato, and special sauce in a soft bun.',
      categoryId: '1',
    },
    {
      id: '103',
      name: 'Pasta Alfredo',
      price: 10.99,
      image: 'https://via.placeholder.com/300x200?text=Pasta+Alfredo',
      description: 'Creamy alfredo sauce with fettuccine pasta, topped with parmesan cheese and parsley.',
      categoryId: '1',
    },
  ],
  2: [
    {
      id: '201',
      name: 'Fresh Milk',
      price: 2.99,
      image: 'https://via.placeholder.com/300x200?text=Fresh+Milk',
      description: 'Fresh whole milk, pasteurized and homogenized, 1 gallon.',
      categoryId: '2',
    },
    {
      id: '202',
      name: 'Organic Eggs',
      price: 4.99,
      image: 'https://via.placeholder.com/300x200?text=Organic+Eggs',
      description: 'Farm-fresh organic eggs from free-range chickens, dozen.',
      categoryId: '2',
    },
    {
      id: '203',
      name: 'Whole Wheat Bread',
      price: 3.49,
      image: 'https://via.placeholder.com/300x200?text=Wheat+Bread',
      description: 'Freshly baked whole wheat bread, perfect for sandwiches and toast.',
      categoryId: '2',
    },
  ],
  3: [
    {
      id: '301',
      name: 'Wireless Earbuds',
      price: 79.99,
      image: 'https://via.placeholder.com/300x200?text=Wireless+Earbuds',
      description: 'True wireless earbuds with noise cancellation and excellent sound quality.',
      categoryId: '3',
    },
    {
      id: '302',
      name: 'Smart Watch',
      price: 149.99,
      image: 'https://via.placeholder.com/300x200?text=Smart+Watch',
      description: 'Track your fitness, receive notifications, and more with this smart watch.',
      categoryId: '3',
    },
    {
      id: '303',
      name: 'Bluetooth Speaker',
      price: 59.99,
      image: 'https://via.placeholder.com/300x200?text=Bluetooth+Speaker',
      description: 'Portable Bluetooth speaker with deep bass and 20-hour battery life.',
      categoryId: '3',
    },
  ],
};

export const mockOrders = [
  {
    id: '1001',
    date: '2023-08-15',
    status: 'Delivered',
    total: 31.97,
    address: '123 Main St, Apt 4B, New York, NY 10001',
    paymentMethod: 'Credit Card',
    items: [
      {
        id: '101',
        name: 'Veggie Pizza',
        price: 12.99,
        quantity: 1,
        image: 'https://via.placeholder.com/300x200?text=Veggie+Pizza',
      },
      {
        id: '102',
        name: 'Chicken Burger',
        price: 8.99,
        quantity: 2,
        image: 'https://via.placeholder.com/300x200?text=Chicken+Burger',
      },
    ],
  },
  {
    id: '1002',
    date: '2023-08-10',
    status: 'Processing',
    total: 149.99,
    address: '456 Park Ave, New York, NY 10022',
    paymentMethod: 'Cash on Delivery',
    items: [
      {
        id: '302',
        name: 'Smart Watch',
        price: 149.99,
        quantity: 1,
        image: 'https://via.placeholder.com/300x200?text=Smart+Watch',
      },
    ],
  },
];

export const mockAddresses = [
  {
    id: '1',
    address: '123 Main St, Apt 4B, New York, NY 10001',
  },
  {
    id: '2',
    address: '456 Park Ave, New York, NY 10022',
  },
]; 