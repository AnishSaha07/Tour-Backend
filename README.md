# Tour Backend API

This is a Node.js backend project for a tour booking application, built with Express and MongoDB (via Mongoose). It provides RESTful APIs for user authentication, tour management, and booking operations.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [API Endpoints](#api-endpoints)
- [Models](#models)
- [Utilities](#utilities)
- [License](#license)

## Features

- User authentication (signup, login) with JWT
- Role-based access control (user, admin, moderator)
- CRUD operations for tours
- Booking tours (authenticated users)
- MongoDB integration via Mongoose
- Error handling and async utilities

## Project Structure

```
server/
  config/
    db.js                # MongoDB connection logic
  controllers/
    authController.js    # Authentication logic (signup, login, protect, restrict)
    bookingController.js # Booking creation logic
    tourController.js    # CRUD operations for tours
  models/
    Booking.js           # Booking schema
    User.js              # User schema
    Tour.js              # Tour schema
  routes/
    authRoutes.js        # Auth endpoints (signup, login)
    bookingRoutes.js     # Booking endpoint
    tourRoutes.js        # Tour endpoints (CRUD)
  utils/
    appError.js          # Custom error class
    catchAsync.js        # Async error handler
  server.js              # Main Express app entry point
  package.json           # Project metadata and dependencies
  package-lock.json      # Dependency lock file
  .gitignore             # Ignored files and folders
  README.md              # Project documentation
```

### Key Files & Folders

- **config/db.js**: MongoDB connection logic
- **controllers/**: Business logic for authentication, tours, and bookings
- **models/**: Mongoose schemas for User, Tour, and Booking
- **routes/**: API route definitions for auth, tours, and bookings
- **utils/**: Custom error and async handler utilities
- **server.js**: Express app setup, middleware, and route mounting

## Installation

1. Clone the repository
2. Run `npm install` to install dependencies
3. Set up a `.env` file with the following variables:
   - `PORT` (e.g., 3000)
   - `MONGODB_URI` (your MongoDB connection string)
   - `JWT_SECRET` (secret for JWT)
   - `JWT_EXPIRES_IN` (e.g., 90d)
   - `JWT_COOKIE_EXPIRES_IN` (e.g., 90)
   - `NODE_ENV` (development/production)

## Scripts

- `npm start` — Starts the server with nodemon

## API Endpoints

### Auth

- `POST /api/v1/auth/signup` — Register a new user
- `POST /api/v1/auth/login` — Login and receive JWT

### Tours

- `GET /api/v1/tours/` — List all tours (auth required)
- `POST /api/v1/tours/` — Create a new tour (auth required)
- `GET /api/v1/tours/:id` — Get a tour by ID
- `PATCH /api/v1/tours/:id` — Update a tour (admin/moderator only)
- `DELETE /api/v1/tours/:id` — Delete a tour (admin/moderator only)

### Bookings

- `POST /api/v1/bookings/bookings` — Book a tour (auth required)

### Products (Demo)

- `GET /products` — List demo products
- `POST /products` — Add a demo product
- `GET /products/:id` — Get a demo product by ID
- `PUT /products/:id` — Update a demo product
- `DELETE /products/:id` — Delete a demo product

## Models

- **User**: name, email, password (hashed), role
- **Tour**: name, price, description, image
- **Booking**: user (ref), tour (ref)

## Utilities

- **appError.js**: Custom error class for consistent error responses
- **catchAsync.js**: Wrapper for async route handlers to catch errors

## License

ISC

---

> **.gitignore**: Ignores `node_modules`, `package-lock.json`, and `.env` files.
