# QuickNotes Auth

A full-stack authentication and notes management application with React, Express.js, and MySQL.

## Project Structure

```
quicknotes-auth/
├── client/          # React + Vite + Tailwind CSS frontend
├── server/          # Express.js + MySQL backend
├── database/        # MySQL schema and sample data
└── README.md
```

## Features

- User registration and authentication
- Create and manage personal notes
- Secure password hashing with bcrypt
- RESTful API
- Responsive UI with Tailwind CSS

## Prerequisites

- Node.js (v18 or higher)
- MySQL Server (v5.7 or higher)
- npm or yarn

## Quick Start

### 1. Database Setup

```bash
# Login to MySQL
mysql -u root -p

# Create database and tables
source database/schema.sql

# (Optional) Load sample data
source database/sample_data.sql
```

### 2. Backend Setup

```bash
cd server
npm install

# Update MySQL password in index.js (line 14)
# Change: password: "root" to your actual password

# Start backend server
node index.js
```

Backend will run on: `http://localhost:3000`

### 3. Frontend Setup

```bash
cd client
npm install
npm run dev
```

Frontend will run on: `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Notes
- `POST /api/notes` - Create note
- `GET /api/notes/:user_id` - Get user's notes

## Usage

1. Open http://localhost:5173 in your browser
2. Register a new account
3. Login with your credentials
4. Start creating notes!

## Tech Stack

**Frontend:**
- React 18
- Vite
- Tailwind CSS
- Axios
- React Router

**Backend:**
- Express.js
- MySQL2
- Bcrypt
- CORS

**Database:**
- MySQL

## Project Details

For detailed setup instructions, see:
- [Database Setup](database/README.md)
- [Backend Documentation](server/README.md)
- [Frontend Documentation](client/README.md)

## License

ISC
