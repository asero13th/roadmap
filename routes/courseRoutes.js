import express from "express";
import {
  getCourses,
  createCourse,
  deleteCourse,
  getLessonDetail,
  updateCourse,
  getCourseById,
  searchCourses,
} from "../controllers/courseController.js";

const router = express.Router();

router.post("/new", createCourse);
router.get("/", getCourses);
router.patch("/update", getLessonDetail);

router.get("/search/:search", searchCourses);
router.delete("/:id", deleteCourse);
router.patch("/:id", updateCourse);
router.get("/:id", getCourseById);

export default router;
