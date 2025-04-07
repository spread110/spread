# Spread - Delivery App

A React Native mobile application for delivery services with a clean white design and black buttons.

## Features

- Phone authentication with OTP verification
- Browse products by categories (Food, Groceries, Electronics, etc.)
- View product details with add to cart functionality
- Shopping cart management
- Checkout process
- Address management
- Order tracking and history
- User profile management

## Tech Stack

- React Native with Expo
- React Navigation for navigation
- Context API for state management
- Axios for API calls (with mock data for development)

## Getting Started

### Prerequisites

- Node.js (v12 or higher)
- npm or yarn
- Expo CLI
- Expo Go app on your mobile device or an Android/iOS emulator

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/spread.git
cd spread
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm start
# or
yarn start
```

4. Scan the QR code with Expo Go app (Android) or Camera app (iOS) to run the app on your device, or run on an emulator.

## Development

The app is set up to use mock data for development. You can find the mock data in `src/services/mockData.js`. To switch to real API calls, change the `USE_MOCK_DATA` flag to `false` in `src/services/api.js`.

### Folder Structure

- `/src/screens`: All app screens
- `/src/components`: Reusable UI components
- `/src/navigation`: Navigation configuration
- `/src/services`: API and service functions
- `/src/context`: Context providers for state management
- `/src/assets`: Images, icons and other assets

## Authentication Flow

The app uses phone number authentication with OTP verification. For development, any phone number and OTP will work.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [React Navigation](https://reactnavigation.org/) 