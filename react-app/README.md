# Ticket Management System - React Implementation

This is the React implementation of the Ticket Management System, a web application for creating, tracking, and managing tickets.

## Features

- **Landing Page**: Welcoming page with wavy background, decorative elements, and call-to-action buttons
- **Authentication**: Secure login and signup with form validation and session management
- **Dashboard**: Overview of ticket statistics with navigation to ticket management
- **Ticket Management**: Full CRUD operations (Create, Read, Update, Delete) with validation
- **Responsive Design**: Mobile, tablet, and desktop adaptations
- **Toast Notifications**: User-friendly feedback for actions
- **Form Validation**: Client-side validation with error messages

## Project Structure

```
react-app/
├── public/
│   └── index.html          # Main HTML file
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   └── ProtectedRoute.js  # Route protection component
│   │   └── ui/
│   │       └── ToastContainer.js  # Toast notification component
│   ├── pages/
│   │   ├── auth/
│   │   │   ├── LoginPage.js       # Login page component
│   │   │   └── SignupPage.js      # Signup page component
│   │   ├── DashboardPage.js       # Dashboard page component
│   │   ├── LandingPage.js         # Landing page component
│   │   └── TicketManagementPage.js # Ticket management page component
│   ├── utils/
│   │   └── index.js               # Utility functions
│   ├── App.js                     # Main app component
│   ├── index.css                  # App-specific styles
│   ├── index.js                   # App entry point
│   └── reportWebVitals.js         # Performance metrics
├── package.json                   # Project dependencies and scripts
└── README.md                      # This file
```

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd ticket-management-system/react-app
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Scripts

- `npm start` - Starts the development server
- `npm run build` - Builds the app for production
- `npm test` - Runs the test suite
- `npm run eject` - Ejects from Create React App (irreversible)

## Usage

### Authentication

1. **Login**: Navigate to `/auth/login` and enter your credentials
   - Demo credentials: `admin@example.com` / `password123`

2. **Signup**: Navigate to `/auth/signup` to create a new account

### Dashboard

After logging in, you'll be redirected to the dashboard at `/dashboard` which shows:
- Ticket statistics (total, open, in progress, closed)
- Recent tickets table
- Navigation to ticket management

### Ticket Management

Navigate to `/tickets` to:
- View all tickets in a table format
- Filter tickets by status (all, open, in progress, closed)
- Create new tickets
- View ticket details
- Edit existing tickets
- Delete tickets

### Routes

- `/` - Landing page
- `/auth/login` - Login page
- `/auth/signup` - Signup page
- `/dashboard` - Dashboard (protected)
- `/tickets` - Ticket management (protected)
- `/tickets/:id` - Ticket details (protected)

## Technology Stack

- **React** - JavaScript library for building user interfaces
- **React Router** - Routing library for React
- **Create React App** - Toolchain for React applications
- **CSS Variables** - For theming and consistent design
- **LocalStorage** - For session management and data persistence

## State Management

This implementation uses React's built-in state management:
- Component state with `useState` hook
- Context API for global state (if needed)
- LocalStorage for session persistence and data storage

## Data Persistence

For demonstration purposes, this implementation uses LocalStorage to persist:
- User session information
- Ticket data

In a production environment, this would be replaced with a backend API.

## Styling

The application uses:
- Shared CSS from `../shared-assets/css/common.css`
- React-specific styles in `src/index.css`
- CSS custom properties for consistent theming
- Responsive design with media queries

## Testing

To run the test suite:

```bash
npm test
```

## Build for Production

To create an optimized production build:

```bash
npm run build
```

This will create a `build` folder with optimized assets ready for deployment.

## Deployment

The `build` folder can be deployed to any static hosting service like:
- Netlify
- Vercel
- GitHub Pages
- Firebase Hosting

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](../../LICENSE) file for details.