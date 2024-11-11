# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

# E-commerce Application (Frontend)

## Overview

This repository contains the frontend code for an e-commerce application built with the MERN stack (MongoDB, Express, React, Node). The project provides a comprehensive user experience, integrating payment via Stripe, product listing and filtering, a wishlist, shopping cart, and user profile management, among other functionalities.

### Key Features
- **User Authentication**: Register, login, logout, and email verification.
- **Product Management**: Add products, view all products, single product pages, recommendations, products filtering and search.
- **Cart & Wishlist**: Add to cart and wishlist with easy management.
- **Order & Payment**: Place orders, integrate Stripe payments, and view order history.
- **Coupon System**: Apply coupons at checkout for discounts.
- **Product Reviews**: Leave reviews and update/delete votes.
- **Socket.IO Real-Time Communication**: Connect users and admins for chat.

## Project Structure

```folder structure
Client/
├── public
├── src/
│   ├── __tests__      # 
│   ├── assets         # 
│   ├── components     # Reusable UI components
│   ├── pages/         # Main pages of the 
│   │   ├── admin      # 
│   │   ├── charts     # 
│   │   ├── static     # 
│   ├── redux/         # Redux slices and RTK Query hooks
│   │   ├── api        # API service files
│   │   ├── constants  # 
│   │   ├── reducers   # 
│   ├── styles/        # Global and component-specific styles
│   │   ├── admin      # 
│   │   ├── components # 
│   │   ├── pages      # 
│   ├── App.tsx        # 
│   ├── Chatbot.tsx    # 
│   ├── ChatbotAdmin.tsx # 
│   ├── main.tsx       # Main application file
│   ├── Messanger.tsx  # 
│   ├── vite-end.d.ts  # 
├── .env               # Environment variables
├── README.md          # Documentation
├── tsconfig.json      # 
├── tsconfig.node.json # 
├── vercel.json        # 
└── vite.config.ts     # Vite configuration
```

### Primary Technologies
- **React**: The frontend library.
- **Redux Toolkit**: State management, including RTK Query for API requests.
- **TypeScript**: For static typing.
- **Sass**: Styling with SCSS files.
- **Stripe**: Payment processing.
- **Socket.IO Client**: Real-time chat support.
- **Testing**: Jest, Testing Library, and Vitest for unit and integration testing.

### API Setup with RTK Query

Using Redux Toolkit's `createApi`, the frontend is connected to a RESTful backend. The setup includes queries and mutations for various endpoints:

- **Authentication Endpoints**: Register, login, logout, and verify email.
- **Product Endpoints**: Fetch all products, fetch single products, add products, product recommendations, and search.
- **Cart & Wishlist Endpoints**: Add to and remove from cart and wishlist.
- **Order & Payment Endpoints**: Create payments, place new orders.
- **Review Endpoints**: Create, delete, and vote on reviews.
- **Coupon Endpoints**: Apply, view, and manage coupons.
- **Chat Support**: Connect users to admins in real-time for support.
- **User Activity Tracking**: Tracks user actions like sign-ins, sign-outs, purchases, and profile updates etc.

### Dependencies

```json
{
  "dependencies": {
    "@reduxjs/toolkit": "^2.2.5",
    "@stripe/react-stripe-js": "^2.7.3",
    "@stripe/stripe-js": "^4.1.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-hot-toast": "^2.4.1",
    "react-icons": "^5.2.1",
    "react-redux": "^9.1.2",
    "react-router-dom": "^6.23.1",
    "sass": "^1.77.6",
    "socket.io-client": "^4.7.5"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.4.8",
    "@testing-library/react": "^16.0.0",
    "@types/jest": "^29.5.12",
    "@types/react": "^18.2.66",
    "@types/react-dom": "^18.2.22",
    "@typescript-eslint/eslint-plugin": "^7.2.0",
    "@typescript-eslint/parser": "^7.2.0",
    "@vitejs/plugin-react-swc": "^3.5.0",
    "eslint": "^8.57.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.6",
    "jsdom": "^24.1.1",
    "typescript": "^5.2.2",
    "vite": "^5.2.0",
    "vitest": "^2.0.5"
  }
}
```

### Environment Variables

To run this project, create a `.env` file in the root directory with the following variables:

```plaintext
VITE_SERVER_URL=<Your Backend URL>
VITE_STRIPE_PUBLISHABLE_KEY=<Your stripe publishable key>
```

### Scripts

- **`dev`**: Starts the development server using Vite.
- **`build`**: Compiles TypeScript and builds the project.
- **`lint`**: Runs ESLint on the project files.
- **`preview`**: Previews the production build.
- **`test`**: Runs tests using Vitest.

## Getting Started

1. **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd client
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Run the application**:
    ```bash
    npm run dev
    ```

4. **Build for production**:
    ```bash
    npm run build
    ```

5. **Run tests**:
    ```bash
    npm run test
    ```

## Testing

- **Testing Library**: Used for testing React components.
- **Vitest**: For running unit and integration tests.

## Contributing

Feel free to contribute to this project by submitting issues or pull requests.

## License

This project is licensed under the MIT License.

Let me know if you need any adjustments based on additional features or setup requirements.