import example_response from "../utils/example_json.json" assert { type: "json" };
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const getRoadmap = async (req, res) => {
  try {
    res.json("Hello World!");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createRoadmap = async (req, res) => {
  try {
    const { skill } = req.body;
    const exampleResponseString = JSON.stringify(example_response, null, 2);

    const base_prompt =
      "Generate a detailed learning roadmap for mastering " +
      skill +
      ". Include the key topics to cover, recommended resources, milestones, and an estimated timeline. The roadmap should be structured in a step-by-step manner, suitable for a beginner to become proficient in " +
      skill +
      ". Provide additional tips and best practices for effective learning. and do not include any scaping charaters just give me the json string";
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

    res.json(jsonObject);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
