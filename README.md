# Course Generator Backend

This is a backend service built using Express.js that generates courses using Generative AI. The backend provides endpoints to generate course content dynamically based on user input and serves it through a REST API.

## Features
- Generate courses using Generative AI
- Store generated courses in a database
- Provide REST API endpoints for retrieving and managing courses
- Authentication and authorization
- Logging and error handling
- Course statistics with metrics for total courses, categories, and average ratings
- Course bookmarking functionality for users to save courses for later reference
- Course rating system with detailed analytics and user reviews

## Tech Stack
- Node.js
- Express.js
- Gemini API (Google Generative AI)
- MySQL with Sequelize ORM
- JWT Authentication
- CORS Middleware
- YouTube Data API (for fetching related videos)

## Installation
### Prerequisites
Make sure you have the following installed:
- Node.js (>= 14.x)
- npm or yarn
- MySQL database

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
   PORT=8000
   DB_HOST=localhost
   DB_USER=your_database_user
   DB_PASS=your_database_password
   DB_NAME=your_database_name
   GEMINI_API_KEY=your_gemini_api_key
   YOUTUBE_API_KEY=your_youtube_api_key
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
- `POST /api/course/new` - Generate a new course based on user input
- `GET /api/course/:id` - Retrieve a generated course by ID
- `GET /api/course` - List all generated courses
- `PATCH /api/course/:id` - Update course details
- `DELETE /api/course/:id` - Delete a course
- `GET /api/course/statistics` - Get course statistics and metrics

### Bookmarks
- `POST /api/bookmark` - Add a bookmark for a course
- `GET /api/bookmark/user/:user_id` - Get all bookmarks for a user
- `DELETE /api/bookmark/:bookmark_id` - Remove a bookmark
- `PATCH /api/bookmark/:bookmark_id/notes` - Update bookmark notes

### Ratings
- `POST /api/rating` - Rate a course (add or update rating)
- `GET /api/rating/course/:course_id` - Get all ratings for a course
- `GET /api/rating/user/:user_id` - Get all ratings by a user
- `GET /api/rating/user/:user_id/course/:course_id` - Get a user's rating for a specific course
- `DELETE /api/rating/:rating_id` - Delete a rating

### User Management
- `GET /api/user/:id` - Retrieve user profile
- `PUT /api/user/:id` - Update user profile

## Project Structure
```
backend/
│── src/
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── courseRoutes.js
│   │   ├── bookmarkRoutes.js
│   │   ├── ratingRoutes.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── courseController.js
│   │   ├── bookmarkController.js
│   │   ├── ratingController.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Course.js
│   │   ├── Bookmark.js
│   │   ├── Rating.js
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
   heroku config:set DB_HOST=your_database_host
   heroku config:set DB_USER=your_database_user
   heroku config:set DB_PASS=your_database_password
   heroku config:set DB_NAME=your_database_name
   heroku config:set GEMINI_API_KEY=your_gemini_api_key
   heroku config:set YOUTUBE_API_KEY=your_youtube_api_key
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

