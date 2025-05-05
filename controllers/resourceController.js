import lesson from "../utils/lesson.json" assert { type: "json" };
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import resourceModel from "../models/resourceModel.js";
import pkg from "body-parser";
import { v4 as uuidv4 } from "uuid";

import resourceData from "../utils/resourceData.json" assert { type: "json" };
dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const { json } = pkg;
export const getOrCreateResources = async (req, res) => {
  const { lesson_id } = req.params;
  const { topic } = req.body;

  const existingResource = await resourceModel.findAll({
    where: { lesson_id },
  });
  if (existingResource) {
    return res.status(400).json({
      message: "Resource already exists for this lesson",
      status: false,
      data: existingResource,
    });
  }
  const base_prompt = `Generate a a plain text string in JSON format of resources on ${topic}. The JSON should include only one field: title which is a url. The title should be a concise and relevant resource url. The JSON should look like this \n ${JSON.stringify(
    resourceData
  )}`;
  const important = `IMPORTANT: The output must be a plain text string in JSON format without any additional text or formatting. and number of resources doesn't have to be equal to the number of lessons in the example.`;

  const prompt = `${base_prompt} ${important}`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  const jsondata = JSON.parse(text);
  const newResources = await resourceModel.bulkCreate(
    jsondata.map((resource) => ({
      title: resource.title,
      lesson_id: lesson_id,
      id: uuidv4(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }))
  );

  //   await newResources.save();
  return res.status(200).json({
    message: "Resources created successfully",
    status: true,
    data: newResources,
  });
};

export const getResources = async (req, res) => {
  const { lesson_id } = req.params;

  const resources = await resourceModel.findAll({
    where: { lesson_id },
  });

  if (!resources) {
    return res.status(404).json({
      message: "Resources not found",
      status: false,
      data: [],
    });

  }
  return res.status(200).json({
    message: "Resources fetched successfully",
    status: true,
    data: resources,
  });
};
