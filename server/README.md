# QuickNotes Auth - Backend Server

Express.js backend API with MySQL database integration for user authentication and notes management.

## Features

- User registration and login with bcrypt password hashing
- Notes CRUD operations
- MySQL database integration
- CORS enabled for frontend integration

## Prerequisites

- Node.js (v18 or higher)
- MySQL Server running
- Database setup completed (see `../database/README.md`)

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure database connection:
   - Open `index.js`
   - Update the MySQL password on line 11:
     ```javascript
     password: "YOUR_MYSQL_PASSWORD"
     ```

## Running the Server

Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

Server will run on `http://localhost:3000`

## API Endpoints

### Authentication

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "User registered"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "user_id": 1,
  "name": "John Doe"
}
```

### Notes

#### Create Note
```http
POST /api/notes
Content-Type: application/json

{
  "title": "My Note",
  "content": "Note content here",
  "user_id": 1
}
```

**Response:**
```json
{
  "message": "Note added"
}
```

#### Get User's Notes
```http
GET /api/notes/:user_id
```

**Response:**
```json
[
  {
    "note_id": 1,
    "title": "My Note",
    "content": "Note content here",
    "user_id": 1,
    "created_at": "2026-01-02T10:30:00.000Z"
  }
]
```

## Testing with cURL

### Register a new user:
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Test User\",\"email\":\"test@example.com\",\"password\":\"test123\"}"
```

### Login:
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"test@example.com\",\"password\":\"test123\"}"
```

### Create a note:
```bash
curl -X POST http://localhost:3000/api/notes \
  -H "Content-Type: application/json" \
  -d "{\"title\":\"Test Note\",\"content\":\"This is a test\",\"user_id\":1}"
```

### Get notes:
```bash
curl http://localhost:3000/api/notes/1
```

## Testing with PowerShell

### Register:
```powershell
Invoke-RestMethod -Uri http://localhost:3000/api/auth/register -Method Post -ContentType "application/json" -Body '{"name":"Test User","email":"test@example.com","password":"test123"}'
```

### Login:
```powershell
Invoke-RestMethod -Uri http://localhost:3000/api/auth/login -Method Post -ContentType "application/json" -Body '{"email":"test@example.com","password":"test123"}'
```

### Create note:
```powershell
Invoke-RestMethod -Uri http://localhost:3000/api/notes -Method Post -ContentType "application/json" -Body '{"title":"Test Note","content":"This is a test","user_id":1}'
```

### Get notes:
```powershell
Invoke-RestMethod -Uri http://localhost:3000/api/notes/1
```

## Project Structure

```
server/
├── index.js          # Main server file with all routes
├── package.json      # Dependencies and scripts
├── .env.example      # Environment variables template
└── README.md         # This file
```

## Security Notes

⚠️ **For Production:**
- Use environment variables for sensitive data (dotenv package)
- Implement JWT tokens for authentication
- Add input validation and sanitization
- Implement rate limiting
- Add proper error handling and logging
- Use HTTPS
- Implement password strength requirements
- Add email verification

## Troubleshooting

**Error: Cannot find module**
- Ensure `"type": "module"` is in package.json
- Check all dependencies are installed

**Error: ER_ACCESS_DENIED_ERROR**
- Verify MySQL credentials in index.js
- Ensure MySQL server is running

**Error: ER_BAD_DB_ERROR**
- Run the database schema first (see `../database/README.md`)

**Port already in use**
- Change port number in index.js
- Or kill the process using port 3000

## Next Steps

- Connect the frontend to these API endpoints
- Add update and delete operations for notes
- Implement JWT authentication
- Add input validation middleware
