//write a back backend that listen on port
import express from "express";
import bodyParser from "body-parser";
import path from "path";
import roadmapRoutes from "../routes/roadmapRoutes.js";
import userRoues from "../routes/userRoutes.js";
import authRoutes from "../routes/authRoutes.js";
import courseRoutes from "../routes/courseRoutes.js";
import cors from "cors";

export default async (app) => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(
    cors({
      origin: "*", // or specify your Flutter app's URL
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );

  //   app.use("/images", express.static(path.join(__dirname, "images")));

  app.use("/api/roadmap", roadmapRoutes);
  app.use("/api/user", userRoues);
  app.use("/api/auth", authRoutes);
  app.use("/api/course", courseRoutes);

  return app;
};
