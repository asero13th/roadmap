import Bookmark from "../models/bookmarkModel.js";
import Course from "../models/courseModel.js";

// Add a bookmark
export const addBookmark = async (req, res) => {
  try {
    const { user_id, course_id, notes } = req.body;

    // Validate required fields
    if (!user_id || !course_id) {
      return res.status(400).json({ message: "User ID and Course ID are required" });
    }

    // Check if course exists
    const courseExists = await Course.findOne({ where: { course_id } });
    if (!courseExists) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Check if bookmark already exists
    const existingBookmark = await Bookmark.findOne({
      where: { user_id, course_id }
    });

    if (existingBookmark) {
      return res.status(400).json({ message: "Course already bookmarked" });
    }

    // Create new bookmark
    const newBookmark = await Bookmark.create({
      user_id,
      course_id,
      notes: notes || null,
      created_at: new Date()
    });

    res.status(201).json({
      message: "Course bookmarked successfully",
      bookmark: newBookmark
    });
  } catch (error) {
    console.error("Error adding bookmark:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Remove a bookmark
export const removeBookmark = async (req, res) => {
  try {
    const { bookmark_id } = req.params;

    const bookmark = await Bookmark.findOne({
      where: { bookmark_id }
    });

    if (!bookmark) {
      return res.status(404).json({ message: "Bookmark not found" });
    }

    await bookmark.destroy();
    
    res.status(200).json({ message: "Bookmark removed successfully" });
  } catch (error) {
    console.error("Error removing bookmark:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get user's bookmarks
export const getUserBookmarks = async (req, res) => {
  try {
    const { user_id } = req.params;

    if (!user_id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const bookmarks = await Bookmark.findAll({
      where: { user_id },
      include: [{
        model: Course,
        attributes: ['course_id', 'title', 'description', 'category', 'course_color', 'review']
      }]
    });

    res.status(200).json({ bookmarks });
  } catch (error) {
    console.error("Error fetching bookmarks:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update bookmark notes
export const updateBookmarkNotes = async (req, res) => {
  try {
    const { bookmark_id } = req.params;
    const { notes } = req.body;

    const bookmark = await Bookmark.findOne({
      where: { bookmark_id }
    });

    if (!bookmark) {
      return res.status(404).json({ message: "Bookmark not found" });
    }

    bookmark.notes = notes;
    await bookmark.save();
    
    res.status(200).json({
      message: "Bookmark notes updated successfully",
      bookmark
    });
  } catch (error) {
    console.error("Error updating bookmark notes:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}; 