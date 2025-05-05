import express from "express";
import {
  getLessonDetail,
  createLessons,
  getVideoLink,
} from "../controllers/lessonController.js";

const router = express.Router();

router.post("/:lesson_id/video", getVideoLink);
router.post("/:course_id/new", createLessons);
router.get("/:id", getLessonDetail);

export default router;
