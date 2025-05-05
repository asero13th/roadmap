import lessons from "../utils/lesson.json" assert { type: "json" };
import courseData from "../utils/courseData.json" assert { type: "json" };
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import courseModel from "../models/courseModel.js";
import lessonModel from "../models/lessonModel.js";

import { Op } from "sequelize";
import pkg from "body-parser";
const { json } = pkg;
import { v4 as uuidv4 } from "uuid";
// const youtube = google.youtube('v3');

dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const createCourse = async (req, res) => {
  try {
    const { topic } = req.body;

    const base_prompt = `Generate a JSON object for an online course on ${topic}. The JSON should include only three fields: title, description, and category. The title should be a concise and relevant course name, the description should provide a brief overview of what the course covers, and the category should specify the general subject area of the course. The JSON should look like this \n ${JSON.stringify(
      courseData
    )}`;

    const important = `IMPORTANT: The output should be a plain text string in JSON format without any additional text or formatting.`;
    const prompt = `${base_prompt} ${important}`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const jsondata = JSON.parse(text);

    const newCourse = await courseModel.create({
      title: jsondata.title,
      description: jsondata.description,
      category: jsondata.category,
      id: uuidv4(),
      creadAt: Date.now(),
      updatedAt: Date.now(),
    });

    res.status(200).json({
      message: "Course created succefully",
      status: true,
      data: newCourse,
    });
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(404).json({ message: error });
  }
};

export const getCourses = async (req, res) => {
  try {
    const courses = await courseModel.findAll();
    res.status(200).json({ data: courses });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//delete course by id
export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    await courseModel.destroy({ where: { course_id: id } });
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category, courseColor } = req.body;
    const course = await courseModel.findOne({ where: { course_id: id } });

    if (title) {
      course.title = title;
    }
    if (description) {
      course.description = description;
    }
    if (category) {
      course.category = category;
    }
    if (courseColor) {
      course.courseColor = courseColor;
    }

    await course.save();
    res.status(200).json({ message: "Course updated successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await courseModel.findOne({ where: { id } });
    res.status(200).json(course);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getLessonsByCourseId = async (req, res) => {
  const { course_id } = req.params;

  try {
    const lessons = await lessonModel.findAll({ where: { course_id } });
    res.status(200).json({
      message: "Lessons fetched successfully",
      sucess: true,
      data: lessons,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const searchCourses = async (req, res) => {
  try {
    const { search } = req.query;

    if (!search) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const searchWords = search.split("+").filter((word) => word.trim() !== "");

    const searchConditions = searchWords.map((word) => ({
      title: {
        [Op.like]: `%${word}%`,
      },
    }));

    const courses  = await courseModel.findAll({
      where: {
        [Op.and]: searchConditions,
      },
    });

    res.status(200).json({ data: courses });
  } catch (error) {
    console.error("Error searching courses:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// New function for course statistics
export const getCoursesStatistics = async (req, res) => {
  try {
    // Get all courses
    const courses = await courseModel.findAll();
    
    // Calculate total number of courses
    const totalCourses = courses.length;
    
    // Calculate courses per category
    const categoryCounts = {};
    courses.forEach(course => {
      const category = course.category;
      if (categoryCounts[category]) {
        categoryCounts[category]++;
      } else {
        categoryCounts[category] = 1;
      }
    });
    
    // Calculate average review score
    let totalReviews = 0;
    courses.forEach(course => {
      totalReviews += parseFloat(course.review || 0);
    });
    const averageReviewScore = totalCourses > 0 ? (totalReviews / totalCourses).toFixed(1) : 0;
    
    // Calculate total lessons across all courses
    let totalLessons = 0;
    courses.forEach(course => {
      totalLessons += course.lessons ? course.lessons.length : 0;
    });
    
    // Calculate rating distribution
    const ratingDistribution = {
      5: 0, 4: 0, 3: 0, 2: 0, 1: 0, 0: 0
    };
    
    courses.forEach(course => {
      const rating = Math.round(parseFloat(course.review || 0));
      if (rating >= 0 && rating <= 5) {
        ratingDistribution[rating]++;
      }
    });
    
    // Return statistics
    res.status(200).json({
      totalCourses,
      categoryCounts,
      averageReviewScore,
      totalLessons,
      ratingDistribution
    });
  } catch (error) {
    console.error("Error fetching course statistics:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
