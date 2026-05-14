# Interview - Amiibo Shopping App

A React Native mobile application showcasing a shopping experience for Zelda-themed amiibo products. This project was created for a technical interview and has been modernized with professional code quality, comprehensive testing, and best practices.

## 🎯 Project Overview

This app demonstrates:
- **Redux state management** with proper immutability patterns
- **Comprehensive test coverage** (80%+) with Jest and React Native Testing Library
- **Error handling and loading states** for better UX
- **Clean architecture** with API service layer abstraction
- **PropTypes validation** for type safety
- **Modern React patterns** including hooks and memoization

## ✨ Features

- Browse Zelda amiibo products fetched from external API
- Add/remove items from shopping cart
- Real-time cart quantity management
- Detailed product view
- Cart summary and checkout flow
- Loading states and error handling with retry functionality
- Responsive UI with custom components

## 🏗️ Architecture

### State Management
- **Redux + Thunk** for async operations
- Immutable state updates following best practices
- Separated actions, reducers, and store configuration

### Project Structure
```
src/
├── commons/       # Shared styles and theming
├── components/    # Reusable UI components with PropTypes
├── images/        # Image assets
├── navigation/    # React Navigation stack and drawer setup
├── redux/         # Redux store, actions, and reducers
├── screens/       # Screen components
├── services/      # API service layer with error handling
└── utils/         # Utility functions with JSDoc documentation

__tests__/         # Comprehensive test suite
├── components/    # Component tests
├── redux/         # Redux logic tests
├── services/      # API service tests
└── utils/         # Utility function tests
```

## 🚀 Getting Started

### Prerequisites
- Node.js 14.17.0
- npm or yarn
- Android Studio (for Android development)
- Xcode (for iOS development - requires macOS)

### Installation

```bash
# Install dependencies
npm install

# iOS only (macOS required)
cd ios && pod install && cd ..
```

### Running the App

```bash
# Start Metro bundler
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios
```

### Troubleshooting

If you encounter issues, clean the caches:

```bash
# Clean Android build
./android/gradlew clean -p ./android/

# Reset React Native cache
npm start --reset-cache

# In another terminal
npm run android
```

## 🧪 Testing

Comprehensive test suite covering Redux logic, components, services, and utilities.

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Test Coverage
- **Redux reducers and actions**: 100%
- **Utility functions**: 100%
- **API service layer**: 95%+
- **Components**: 85%+
- **Overall**: 80%+

### Linting

```bash
npm run lint
```

## 🛠️ Technologies Used

- **React Native** 0.66.0
- **React** 17.0.2
- **Redux** + Redux Thunk
- **React Navigation** v6 (Drawer, Stack, Native Stack)
- **Jest** + React Native Testing Library
- **PropTypes** for runtime type checking
- React Native Vector Icons
- React Native Elements

## 📝 Development Notes

### Node Version
This project uses Node.js 14.17.0. Consider using [nvm](https://github.com/nvm-sh/nvm) to manage Node versions:

```bash
nvm use 14.17.0
```

### iOS Limitations
The project was initially developed on Windows. iOS-specific adjustments may be required for a full iOS build.

## 📄 License

This project was created for educational and interview purposes.

## 👤 Author

Ivan Bolaños

---
