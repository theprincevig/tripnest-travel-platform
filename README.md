# TripNest — Travel Listing Platform

TripNest is a modern travel listing marketplace built with a dedicated React frontend and an Express/MongoDB backend. It supports listing creation, search and filtering, reservations, reviews, profile management, currency conversion, and Google OAuth authentication.

## Key Features

- User authentication with email/password and Google sign-in
- Role-based access control for regular users, hosts, and admins
- Full listings lifecycle: create, update, view, and delete listings
- Listing search and filters by category, location, price, and owner
- Reservation flow with date validation, guest count checks, and booking conflicts prevention
- Cancellation policy handling with cancellation fees and refund calculation
- Reviews for listings, including create and delete actions
- Profile management with editable user information, profile picture upload, and currency preference
- Multi-currency pricing and formatting using live exchange rates
- Cloudinary image uploads for listing photos
- Geolocation support for listings via geocoding service

## Highlights or Key Differentiators

These are the distinct or specially implemented features in TripNest:

- Multi-currency support with dynamic exchange rate fetching
- Google OAuth login alongside traditional email/password auth
- Host-specific dashboard views and protected listing management routes
- Reservation cancellation with time-based cancellation charge calculation
- Search across listing title, location, and country with pagination and sorting
- Cloudinary-backed image upload flow for listings

> Note: New or unique features should always be mentioned separately in future documentation updates.

## Tech Stack

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-000000?style=for-the-badge&logo=react&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![React Leaflet](https://img.shields.io/badge/React_Leaflet-199900?style=for-the-badge&logo=leaflet&logoColor=white)
![React Hot Toast](https://img.shields.io/badge/React_Hot_Toast-FF6B6B?style=for-the-badge)
![React Icons](https://img.shields.io/badge/React_Icons-E91E63?style=for-the-badge&logo=react&logoColor=white)
![Lucide React](https://img.shields.io/badge/Lucide-000000?style=for-the-badge&logo=lucide&logoColor=white)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)
![Multer](https://img.shields.io/badge/Multer-FF6F00?style=for-the-badge)
![Google OAuth](https://img.shields.io/badge/Google_OAuth-4285F4?style=for-the-badge&logo=google&logoColor=white)

### Authentication & Security
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Bcrypt](https://img.shields.io/badge/Bcrypt-003A70?style=for-the-badge)
![Helmet](https://img.shields.io/badge/Helmet-000000?style=for-the-badge)
![CORS](https://img.shields.io/badge/CORS-00599C?style=for-the-badge)
![Cookie Parser](https://img.shields.io/badge/Cookie_Parser-6DB33F?style=for-the-badge)

### Dev Tools
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)
![Nodemon](https://img.shields.io/badge/Nodemon-76D04B?style=for-the-badge&logo=nodemon&logoColor=white)

## Installation

1. Install root dependencies (optional):
   ```bash
   npm install
   ```
2. Install frontend dependencies:
   ```bash
   npm run install-frontend
   ```
3. Install backend dependencies:
   ```bash
   npm run install-backend
   ```

## Run Locally

### Backend

```bash
cd backend
npm run dev
```

### Frontend

```bash
cd frontend
npm run dev
```

## Environment Variables

### Backend `.env`

- `PORT`
- `MONGO_URI`
- `JWT_SECRET`
- `CLOUD_NAME`
- `CLOUD_API_KEY`
- `CLOUD_API_SECRET`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`

### Frontend `.env`

- `VITE_API_BASE_URL`
- `VITE_GOOGLE_CLIENT_ID`

> These variables are required to run the project locally.

## Project Structure

- `backend/` — Express API, controllers, routes, models, services, utilities
- `frontend/` — React application, pages, components, stores, configuration

## Notes

- This README highlights all main tech stacks, core features, and unique platform capabilities.
- If you add new functionality later, include it in the Highlights or Key Differentiators section where appropriate.

## License

This project is licensed under the MIT License.

## Author

Built with ❤ by **[@theprincevig](https://github.com/theprincevig)**