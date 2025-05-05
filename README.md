
# Course Generator Backend

This is a backend service built using Express.js that generates courses using Generative AI. The backend provides endpoints to generate course content dynamically based on user input and serves it through a REST API.

## Features
- Generate courses using Generative AI
- Store generated courses in a database
- Provide REST API endpoints for retrieving and managing courses
- Authentication and authorization
- Logging and error handling

## Tech Stack
- **Node.js**: JavaScript runtime (>= 14.x)
- **Express.js**: Web framework for building the REST API
- **Generative AI**: Gemini API or OpenAI API for course generation
- **Database**: PostgreSQL (recommended) or MongoDB
- **JWT Authentication**: Secure user authentication
- **CORS Middleware**: Enable cross-origin requests

## Installation
### Prerequisites
Make sure you have the following installed:
- Node.js (>= 14.x)
- npm or yarn
- Database (PostgreSQL or MongoDB)

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
3. Set up the database:
   - For **PostgreSQL**: Install PostgreSQL, create a database, and note the connection string (e.g., `postgresql://user:password@localhost:5432/dbname`).
   - For **MongoDB**: Install MongoDB, start the MongoDB server, and note the connection string (e.g., `mongodb://localhost:27017/dbname`).
4. Set up environment variables:
   Create a `.env` file in the root directory and configure the following:
   ```env
   PORT=5000
   DATABASE_URL=your_database_connection_string
   OPENAI_API_KEY=your_openai_api_key
   JWT_SECRET=your_jwt_secret
   ```
5. Run the server:
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

## Testing
- Unit tests are written using Jest and Supertest.
- Run tests with:
  ```sh
  npm test
  ```
- Ensure all tests pass before submitting a pull request.
- Test coverage reports can be generated with:
  ```sh
  npm run test:coverage
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

## Troubleshooting
- **Database Connection Issues**: Verify the `DATABASE_URL` in your `.env` file matches your database setup. Ensure the database server is running.
- **API Key Errors**: Confirm that `OPENAI_API_KEY` is valid and has sufficient credits.
- **Port Conflicts**: If port 5000 is in use, update the `PORT` in your `.env` file.
- **CORS Errors**: Ensure the frontend URL is allowed in the CORS middleware configuration.

## Contributing
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-name`).
3. Commit changes (`git commit -m 'Add feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.
6. Report issues or suggest features by creating a new issue in the repository.

## License
This project is licensed under the MIT License.


