
# Scholar Insights Backend

This is the backend server for the Scholar Insights educational platform.

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Configure environment variables:
   - Copy `.env` file and update with your MySQL credentials
   - Change JWT_SECRET to something secure for production

3. Create database schema:
   - Use MySQL Workbench to execute the SQL script in `db/schema.sql`
   - Load sample data using `db/seed.sql` (optional)

4. Start development server:
   ```
   npm run dev
   ```

## API Documentation

### Authentication
- POST `/api/auth/login`: Login with email/password
- GET `/api/auth/me`: Get current user data
- POST `/api/auth/logout`: Logout current user

### Teachers
- GET `/api/teacher/dashboard`: Teacher dashboard data
- GET `/api/teacher/students`: List teacher's students
- GET `/api/teacher/student/:id`: Get student details
- GET `/api/teacher/attendance`: Get attendance records
- POST `/api/teacher/attendance`: Mark attendance
- GET `/api/teacher/performance`: Get performance records
- POST `/api/teacher/performance`: Record student performance
- GET `/api/teacher/calendar`: Get calendar events

### Parents
- GET `/api/parent/dashboard`: Parent dashboard data
- GET `/api/parent/children`: List parent's children
- GET `/api/parent/children/:id`: Get child details
- GET `/api/parent/attendance/:studentId`: Get child's attendance
- GET `/api/parent/performance/:studentId`: Get child's performance
- GET `/api/parent/calendar`: Get calendar events

### Admin
- GET `/api/admin/dashboard`: Admin dashboard data
- GET `/api/admin/teachers`: List all teachers
- POST `/api/admin/teachers`: Create teacher
- GET `/api/admin/students`: List all students
- POST `/api/admin/students`: Create student
- GET `/api/admin/classes`: List all classes
- POST `/api/admin/classes`: Create class
- GET `/api/admin/system-status`: Get system status
- GET `/api/admin/calendar`: Get calendar events

## Authentication

This API uses JWT (JSON Web Token) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Development

This project uses:
- Express.js for the API server
- MySQL for database storage
- JSON Web Tokens for authentication
- bcrypt.js for password hashing

