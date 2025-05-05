import express from "express";
import {
  rateACourse,
  getCourseRatings,
  getUserCourseRating,
  deleteRating,
  getUserRatings
} from "../controllers/ratingController.js";

const router = express.Router();

// Rate a course (create or update rating)
router.post("/", rateACourse);

// Get all ratings for a specific course
router.get("/course/:course_id", getCourseRatings);

// Get a user's rating for a specific course
router.get("/user/:user_id/course/:course_id", getUserCourseRating);

// Get all ratings by a user
router.get("/user/:user_id", getUserRatings);

// Delete a rating
router.delete("/:rating_id", deleteRating);

export default router; 