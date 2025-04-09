# E-commerce Frontend

This is the frontend of an e-commerce system developed with Next.js, TypeScript, and Material-UI.

## 🚀 Features

### Authentication and User Management

- Email/password login
- Google OAuth login
- User registration
- Password recovery
- Profile management
- Address management

### Store and Products

- List of establishments
- Menu view by establishment
- Product categorization
- Daily promotions
- Product details
- Product add-ons
- Business hours
- Open/closed status

### Cart and Checkout

- Add products to cart
- Quantity adjustment
- Add-on selection
- Value calculation
- Delivery address selection
- Payment options:
  - Cash
  - Credit card
  - Debit card
- Change calculation
- Order completion

### Orders

- Order tracking
- Real-time order status
- Order history
- Order details
- Reorder previous orders

### Interface

- Responsive design (mobile/desktop)
- Light/dark theme
- Intuitive navigation
- Visual feedback (toasts)
- Loading states
- Animations and transitions

## 🛠️ Technologies

- **Framework**: Next.js
- **Language**: TypeScript
- **UI**: Material-UI (MUI)
- **State Management**: React Context API
- **HTTP Requests**: Axios
- **Cache and Data Management**: React Query
- **Form Validation**: React Hook Form + Yup
- **Authentication**: JWT + Google OAuth
- **Styling**: Emotion
- **Fonts**: Roboto

## 📦 Project Structure

```
src/
├── components/     # Reusable components
├── containers/     # Containers and pages
├── context/        # React contexts
├── helpers/        # Helper functions
├── hooks/          # Custom hooks
├── models/         # Types and interfaces
├── services/       # API services
└── styles/         # Global styles
```

## 🔧 Environment Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   yarn install
   ```
3. Configure environment variables:

   - Create a `.env.local` file based on `.env.example`
   - Set the API URL and other necessary configurations

4. Start the development server:
   ```bash
   yarn dev
   ```

## 🌐 Deployment

The project is configured for production deployment. Make sure to properly configure the environment variables before deployment.

## 📝 License

This project is licensed under the [MIT License](LICENSE).

## 🤝 Contribution

Contributions are welcome! Please read the contribution guidelines before submitting a pull request.
