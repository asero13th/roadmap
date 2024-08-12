import example_response from "../utils/example_json.json" assert { type: "json" };
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import courseModel from "../models/courseModel.js";
import { google } from "googleapis";
import { Op } from "sequelize";
// const youtube = google.youtube('v3');

dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const youtubeApiKey = process.env.YOUTUBE_API_KEY;

const youtube = google.youtube({
  version: "v3",
  auth: youtubeApiKey,
});

export const createCourse = async (req, res) => {
  try {
    const { skill } = req.body;
    const exampleResponseString = JSON.stringify(example_response, null, 2);

    const base_prompt =
      "Generate a detailed learning roadmap for mastering " + skill;

    const prompt_with_example =
      "IMPORTANT: the output should be a json format. \nexample out put:" +
      exampleResponseString +
      "\nNOTE: do not include escaping charachters";

    const prompt = base_prompt + prompt_with_example;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    const cleanedJsonString = text.replace(/\\n|\\\"|\\|```json/g, (match) => {
      if (match === '\\"') return '"';
      return "";
    });

    const jsonObject = JSON.parse(cleanedJsonString);
    const newCourse = new courseModel();

    newCourse.title = jsonObject.title ? jsonObject.title : "No title";
    newCourse.description = jsonObject.description
      ? jsonObject.description
      : "No description";
    newCourse.category = jsonObject.category
      ? jsonObject.category
      : "No category";
    newCourse.lessons = jsonObject.lessons ? jsonObject.lessons : [];
    newCourse.course_color = "0XFF3D5CFF";
    newCourse.review = jsonObject.review ? jsonObject.review : 0.0;
    newCourse.resource = jsonObject.resource ? jsonObject.resource : [];
    newCourse.createdAt = new Date();
    newCourse.updatedAt = new Date();

    newCourse.lessons.forEach(async (lesson) => {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // 2 second delay

      const query = `${lesson.title} ${lesson.topic} tutorial`;

      const response = await youtube.search.list({
        part: "snippet",
        q: query,
        maxResults: 5, // Adjust as needed
        order: "viewCount",
        type: "video",
      });

      if (!response || !response.data) {
        console.error("Invalid response from YouTube API:", response);
        return res
          .status(500)
          .json({ message: "Invalid response from YouTube API" });
      }

      const videos = response.data.items;

      if (!videos) {
        console.error("No videos found in response:", response.data);
        return res.status(404).json({ message: "No videos found" });
      }

      const video_Link =
        "https://www.youtube.com/watch?v=" + videos[0].id.videoId;

      lesson.videoLink = video_Link;
    });
    // Replace with the desired video link

    await newCourse.save();
    res.json({ data: jsonObject });
  } catch (error) {
    res.status(404).json({ message: error.message });
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
    const {
      title,
      description,
      category,
      course_color,
      review,
      lessons,
      resource,
    } = req.body;
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
    if (course_color) {
      course.course_color = course_color;
    }
    if (review) {
      course.review = review;
    }
    if (lessons) {
      course.lessons = lessons;
    }
    if (resource) {
      course.resource = resource;
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
    const course = await courseModel.findOne({ where: { course_id: id } });
    res.status(200).json(course);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getLessonDetail = async (req, res) => {
  try {
    const { title, topic, lessonNumber, id } = req.body;

    if (!title || !topic || !lessonNumber || !id) {
      return res.status(400).json({
        message: "Title, topic, lessonNumber, and course_id are required",
      });
    }

    const course = await courseModel.findOne({
      where: { course_id: id },
    });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({ message: course });
  } catch (error) {
    console.error("Error searching videos:", error);
    res.status(500).json({ message: "Internal server error" });
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

    const courses = await courseModel.findAll({
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
