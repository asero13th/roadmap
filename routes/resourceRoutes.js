import express from "express";
import { getOrCreateResources } from "../controllers/resourceController.js";

const router = express.Router();

router.post("/:lesson_id", getOrCreateResources);

export default router;