# Portfolio Website

A full-stack portfolio website built with React, Node.js, Express, and MongoDB.

## Features

- Modern and responsive design
- Project showcase
- Services section
- Contact form with email notifications
- Admin dashboard for managing content
- Dark mode theme

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Setup

1. Clone the repository
2. Install backend dependencies:
   ```bash
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd client
   npm install
   ```

4. Create a `.env` file in the root directory with the following variables:
   ```
   MONGODB_URI=mongodb://localhost:27017/portfolio
   JWT_SECRET=your_jwt_secret_key
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_app_password
   PORT=5000
   ```

5. Start the development servers:
   ```bash
   # Start backend server
   npm run server

   # In a new terminal, start frontend server
   npm run client
   ```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Admin Dashboard

Access the admin dashboard at `/admin` to:
- Add/remove projects
- Add/remove services
- View contact form submissions

## Technologies Used

- Frontend:
  - React
  - Material-UI
  - Framer Motion
  - Axios

- Backend:
  - Node.js
  - Express
  - MongoDB
  - JWT Authentication
  - Nodemailer

## License

MIT 