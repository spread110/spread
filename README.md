# Spread - Food Delivery App

A modern food delivery application built with React Native, Firebase, and MongoDB.

## Features

- User Authentication with Firebase
- Real-time Order Tracking
- Push Notifications
- Payment Integration (Razorpay)
- Location-based Services
- Socket.IO for Real-time Updates

## Tech Stack

- **Frontend**: React Native, Expo
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: Firebase
- **Real-time**: Socket.IO
- **Payments**: Razorpay
- **Maps**: Google Maps SDK
- **Notifications**: Firebase Cloud Messaging

## Project Structure

```
spread/
├── backend/           # Node.js backend
│   ├── config/       # Configuration files
│   ├── models/       # MongoDB models
│   ├── routes/       # API routes
│   └── server.js     # Express server
├── src/              # React Native source
│   ├── components/   # Reusable components
│   ├── config/       # App configuration
│   ├── context/      # React Context
│   ├── screens/      # App screens
│   └── services/     # API services
└── assets/           # Images and other assets
```

## Setup Instructions

### Prerequisites

- Node.js (v14.x or higher)
- npm or yarn
- Expo CLI
- MongoDB Atlas account
- Firebase project
- Razorpay account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/spread110/spread.git
   cd spread
   ```

2. Install dependencies:
   ```bash
   # Install frontend dependencies
   npm install

   # Install backend dependencies
   cd backend
   npm install
   ```

3. Configure environment variables:
   - Copy `.env.example` to `.env` in both root and backend directories
   - Fill in your configuration values

4. Start the development server:
   ```bash
   # Start backend
   cd backend
   npm run dev

   # Start frontend (in a new terminal)
   npm start
   ```

## Deployment

The application is deployed on:
- Frontend: Expo
- Backend: Render
- Database: MongoDB Atlas

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [React Navigation](https://reactnavigation.org/)
