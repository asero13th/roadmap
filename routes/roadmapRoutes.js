import express from "express";
import { getRoadmap, createRoadmap } from "../controllers/roadmapController.js";
const router = express.Router();

router.get("/", getRoadmap);
router.post("/", createRoadmap);

export default router;
