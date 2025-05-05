import lessonModel from "../models/lessonModel.js";
import courseData from "../utils/courseData.json" assert { type: "json" };
import LessonVideoModel from "../models/videoLinkModel.js";
import { google } from "googleapis";
import { Op } from "sequelize";
import pkg from "body-parser";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { v4 as uuidv4 } from "uuid";
import lessons from "../utils/lesson.json" assert { type: "json" };
const { json } = pkg;

// const youtube = google.youtube('v3');

dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const youtubeApiKey = process.env.YOUTUBE_API_KEY;

const youtube = google.youtube({
  version: "v3",
  auth: youtubeApiKey,
});

export const getLessonDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const lesson = await lessonModel.findOne({
      where: { id },
    });

    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    return res.status(200).json({
      message: "lesson fetched successfully",
      sucess: true,
      data: lesson,
    });
  } catch (error) {
    console.error("Error searching videos:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createLessons = async (req, res) => {
  try {
    const { course_id } = req.params;
    const { topic } = req.body;

    const existingLessons = await lessonModel.findAll({ where: { course_id } });
    if (existingLessons.length > 0) {
      return res.status(200).json({
        message: "Course already has lessons",
        data: existingLessons,
        status: true,
      });
    }

    const base_prompt = `Generate a plain text string in JSON format for lessons for the course with the topic ${topic}. each lesson in The JSON should include only 5 fields: title, introduction, content, conclusion, LessonOrder. The title should be a concise and relevant name for the lesson, the content should provide a brief detail of what the lesson covers, and the lessonOrder should specify the order of the lesson in the course. The JSON should look like this \n ${JSON.stringify(
      lessons
    )}`;
    const important = `IMPORTANT: The output must be a plain text string in JSON format without any additional text or formatting. and number of lessons doesn't have to be equal to the number of lessons in the course.`;

    const prompt = `${base_prompt} ${important}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const jsondata = JSON.parse(text);

    const newLessons = await lessonModel.bulkCreate(
      jsondata.map((lesson) => ({
        title: lesson.title,
        introduction: lesson.introduction,
        content: lesson.content,
        conclusion: lesson.conclusion,
        lessonOrder: lesson.lessonOrder,
        course_id: course_id,
        id: uuidv4(),
      }))
    );

    for (const lesson of newLessons) {
      await lesson.save(); // Perform any additional operations here
    }
    return res.status(200).json({
      message: "Lessons created successfully",
      status: true,
      data: newLessons,
    });
  } catch (error) {
    console.error("Error creating lessons:", error);
    res.status(404).json({ message: error });
  }
};

export const getVideoLink = async (req, res) => {
  const { lesson_id } = req.params;
  const { topic, title } = req.body;

  const query = `${topic} ${title} tutorial `;
  try {
    const videoLink = await LessonVideoModel.findAll({
      where: { lesson_id },
    });

    if (videoLink.length > 0) {
      return res.status(200).json({
        message: "video link fetched Successfully",
        status: true,
        data: videoLink,
      });
    }

    const response = await youtube.search.list({
      part: "snippet",
      q: query,
      maxResults: 5, // Number of results to return
      type: "video",
      order: "viewCount",
    });

    // Extract and display relevant information from the response
    const videos = response.data.items;

    const newVideos = await LessonVideoModel.bulkCreate(
      videos.map((video) => ({
        id: uuidv4(),
        lesson_id,
        videoLink: `https://www.youtube.com/watch?v=${video.id.videoId}`,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      }))
    );

    // await newVideos.save();
    return res.status(200).json({
      message: "Video link fetched successfully",
      success: true,
      data: newVideos,
    });
  } catch (error) {
    console.error("Error searching video link:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
