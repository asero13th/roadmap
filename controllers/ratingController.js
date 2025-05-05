import Rating from "../models/ratingModel.js";
import Course from "../models/courseModel.js";
import { sequelize } from "../services/Database.js";

// Add or update a rating
export const rateACourse = async (req, res) => {
  try {
    const { user_id, course_id, rating_value, comment } = req.body;

    // Validate required fields
    if (!user_id || !course_id || !rating_value) {
      return res.status(400).json({ 
        message: "User ID, Course ID, and rating value are required" 
      });
    }

    // Validate rating value (1-5)
    if (rating_value < 1 || rating_value > 5) {
      return res.status(400).json({ 
        message: "Rating value must be between 1 and 5" 
      });
    }

    // Check if course exists
    const courseExists = await Course.findOne({ where: { course_id } });
    if (!courseExists) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Check if rating already exists for this user and course
    const existingRating = await Rating.findOne({
      where: { user_id, course_id }
    });

    if (existingRating) {
      // Update existing rating
      existingRating.rating_value = rating_value;
      existingRating.comment = comment || existingRating.comment;
      existingRating.updated_at = new Date();
      await existingRating.save();

      // Update course average rating
      await updateCourseAverageRating(course_id);

      return res.status(200).json({
        message: "Rating updated successfully",
        rating: existingRating
      });
    } else {
      // Create new rating
      const newRating = await Rating.create({
        user_id,
        course_id,
        rating_value,
        comment: comment || null,
        created_at: new Date(),
        updated_at: new Date()
      });

      // Update course average rating
      await updateCourseAverageRating(course_id);

      return res.status(201).json({
        message: "Course rated successfully",
        rating: newRating
      });
    }
  } catch (error) {
    console.error("Error rating course:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all ratings for a course
export const getCourseRatings = async (req, res) => {
  try {
    const { course_id } = req.params;

    if (!course_id) {
      return res.status(400).json({ message: "Course ID is required" });
    }

    // Check if course exists
    const courseExists = await Course.findOne({ where: { course_id } });
    if (!courseExists) {
      return res.status(404).json({ message: "Course not found" });
    }

    const ratings = await Rating.findAll({
      where: { course_id },
      order: [['created_at', 'DESC']]
    });

    // Calculate rating statistics
    const totalRatings = ratings.length;
    const ratingCounts = {
      1: 0, 2: 0, 3: 0, 4: 0, 5: 0
    };
    
    let ratingSum = 0;
    ratings.forEach(rating => {
      const value = rating.rating_value;
      ratingCounts[value]++;
      ratingSum += value;
    });
    
    const averageRating = totalRatings > 0 ? (ratingSum / totalRatings).toFixed(1) : 0;
    
    return res.status(200).json({
      totalRatings,
      averageRating,
      ratingDistribution: ratingCounts,
      ratings
    });
  } catch (error) {
    console.error("Error getting course ratings:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get a user's rating for a specific course
export const getUserCourseRating = async (req, res) => {
  try {
    const { user_id, course_id } = req.params;

    if (!user_id || !course_id) {
      return res.status(400).json({ 
        message: "User ID and Course ID are required" 
      });
    }

    const rating = await Rating.findOne({
      where: { user_id, course_id }
    });

    if (!rating) {
      return res.status(404).json({ 
        message: "Rating not found for this user and course" 
      });
    }

    return res.status(200).json(rating);
  } catch (error) {
    console.error("Error getting user course rating:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a rating
export const deleteRating = async (req, res) => {
  try {
    const { rating_id } = req.params;

    const rating = await Rating.findOne({
      where: { rating_id }
    });

    if (!rating) {
      return res.status(404).json({ message: "Rating not found" });
    }

    const course_id = rating.course_id;
    
    await rating.destroy();
    
    // Update course average rating
    await updateCourseAverageRating(course_id);
    
    return res.status(200).json({ message: "Rating deleted successfully" });
  } catch (error) {
    console.error("Error deleting rating:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all ratings by a user
export const getUserRatings = async (req, res) => {
  try {
    const { user_id } = req.params;

    if (!user_id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const ratings = await Rating.findAll({
      where: { user_id },
      include: [{
        model: Course,
        attributes: ['course_id', 'title', 'description', 'category', 'course_color']
      }],
      order: [['created_at', 'DESC']]
    });

    return res.status(200).json({ ratings });
  } catch (error) {
    console.error("Error getting user ratings:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Helper function to update course average rating
const updateCourseAverageRating = async (course_id) => {
  try {
    // Get all ratings for the course
    const ratings = await Rating.findAll({
      where: { course_id }
    });

    // Calculate average
    let totalRatings = ratings.length;
    let ratingSum = 0;
    
    ratings.forEach(rating => {
      ratingSum += rating.rating_value;
    });
    
    const averageRating = totalRatings > 0 ? parseFloat((ratingSum / totalRatings).toFixed(1)) : 0;
    
    // Update course with new average rating
    const course = await Course.findOne({ where: { course_id } });
    if (course) {
      course.review = averageRating;
      await course.save();
    }
    
    return averageRating;
  } catch (error) {
    console.error("Error updating course average rating:", error);
    throw error;
  }
}; 