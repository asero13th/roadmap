import express from "express";
import {
  getCourses,
  createCourse,
  deleteCourse,
  updateCourse,
  getCourseById,
  searchCourses,
  getLessonsByCourseId,
} from "../controllers/courseController.js";

const router = express.Router();

router.post("/new", createCourse);
router.get("/", getCourses);

router.get("/search/:search", searchCourses);

router.get("/:course_id/lessons", getLessonsByCourseId);
router.delete("/:id", deleteCourse);
router.patch("/:id", updateCourse);
router.get("/:id", getCourseById);

export default router;