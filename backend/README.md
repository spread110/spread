# Spread Backend API

This is the backend API for the Spread application, built with Node.js, Express, MongoDB, and Socket.IO.

## Setup Instructions

### Prerequisites

- Node.js installed (v14.x or higher)
- npm or yarn
- MongoDB Atlas account (already configured)

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables:
   - Rename `.env.example` to `.env` if it's not already done
   - Fill in any missing environment variables

3. Run the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Authenticate with Firebase token
- `POST /api/auth/notifications/register-device` - Register FCM token for notifications

### Users
- `GET /api/users/me` - Get current user
- `PUT /api/users/me` - Update current user
- `GET /api/users/addresses` - Get user addresses
- `POST /api/users/addresses` - Add new address
- `PUT /api/users/addresses/:id` - Update address
- `DELETE /api/users/addresses/:id` - Delete address

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product details
- `GET /api/categories` - Get all categories
- `GET /api/products/category/:categoryId` - Get products by category

### Orders
- `POST /api/orders` - Create a new order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get order details
- `GET /api/orders/:id/track` - Track order status

### Payments
- `POST /api/payments/create-order` - Create Razorpay order
- `POST /api/payments/verify` - Verify Razorpay payment
- `GET /api/payments/:id` - Get payment details

## Socket.IO Events

### Client to Server
- `join` - Join a room (e.g., for order tracking)
- `leave` - Leave a room
- `orderUpdate` - Send order status update

### Server to Client
- `orderUpdated` - Receive order status update

## Database Models

- **User** - User information, addresses, and FCM tokens
- **Product** - Product details, ratings, and inventory
- **Order** - Order information, items, payment, and delivery details
- **Category** - Product categories

## Tech Stack

- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB object modeling
- **Socket.IO** - Real-time communication
- **Firebase Admin SDK** - Authentication and cloud messaging
- **Razorpay** - Payment processing 