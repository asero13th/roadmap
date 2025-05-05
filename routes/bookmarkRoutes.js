import express from "express";
import {
  addBookmark,
  removeBookmark,
  getUserBookmarks,
  updateBookmarkNotes
} from "../controllers/bookmarkController.js";

const router = express.Router();

// Add a bookmark
router.post("/", addBookmark);

// Get user's bookmarks
router.get("/user/:user_id", getUserBookmarks);

// Remove a bookmark
router.delete("/:bookmark_id", removeBookmark);

// Update bookmark notes
router.patch("/:bookmark_id/notes", updateBookmarkNotes);

export default router; 