# Course Generator Backend

This is a backend service built using Express.js that generates courses using Generative AI. The backend provides endpoints to generate course content dynamically based on user input and serves it through a REST API.

## Features
- Generate courses using Generative AI
- Store generated courses in a database
- Provide REST API endpoints for retrieving and managing courses
- Authentication and authorization
- Logging and error handling

## Tech Stack
- Node.js
- Express.js
- Gemini API (or any other AI model for course generation)
- PostgreSQL (or any preferred database)
- JWT Authentication
- CORS Middleware

## Installation
### Prerequisites
Make sure you have the following installed:
- Node.js (>= 14.x)
- npm or yarn
- MongoDB/PostgreSQL (if using a database)

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/course-generator-backend.git
   cd course-generator-backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file in the root directory and configure the following:
   ```env
   PORT=5000
   DATABASE_URL=your_database_connection_string
   OPENAI_API_KEY=your_openai_api_key
   JWT_SECRET=your_jwt_secret
   ```
4. Run the server:
   ```sh
   npm start
   ```
   Or run in development mode with nodemon:
   ```sh
   npm run dev
   ```

## API Endpoints
### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Authenticate user and return a token

### Course Generation
- `POST /api/courses/new` - Generate a new course based on user input
- `GET /api/courses/:id` - Retrieve a generated course by ID
- `GET /api/courses` - List all generated courses

### User Management
- `GET /api/users/:id` - Retrieve user profile
- `PUT /api/users/:id` - Update user profile

## Project Structure
```
backend/
│── src/
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── courseRoutes.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── courseController.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Course.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   ├── config/
│   │   ├── db.js
│   ├── server.js
│── package.json
│── .env
│── README.md
```

## Deployment
### Deploy on Heroku (Example)
1. Login to Heroku:
   ```sh
   heroku login
   ```
2. Create a new Heroku app:
   ```sh
   heroku create course-generator-backend
   ```
3. Add environment variables to Heroku:
   ```sh
   heroku config:set DATABASE_URL=your_database_connection_string
   heroku config:set OPENAI_API_KEY=your_openai_api_key
   heroku config:set JWT_SECRET=your_jwt_secret
   ```
4. Deploy to Heroku:
   ```sh
   git push heroku main
   ```

## Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature-name`)
3. Commit changes (`git commit -m 'Add feature'`)
4. Push to the branch (`git push origin feature-name`)
5. Open a pull request

## License
This project is licensed under the MIT License.

