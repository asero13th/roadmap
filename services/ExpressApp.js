//write a back backend that listen on port
import express from "express";
import bodyParser from "body-parser";
import path from "path";
import roadmapRoutes from "../routes/roadmapRoutes.js";
import userRoues from "../routes/userRoutes.js";
import authRoutes from "../routes/authRoutes.js";
import courseRoutes from "../routes/courseRoutes.js";
import bookmarkRoutes from "../routes/bookmarkRoutes.js";
import ratingRoutes from "../routes/ratingRoutes.js";
import lessonRoutes from "../routes/lessonRoutes.js";
import resourceRoutes from "../routes/resourceRoutes.js";
import cors from "cors";
import authMiddleware from "../middleware/authMiddleaware.js";

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
  app.use("/api/auth", authRoutes);
  app.use("/api/user", authMiddleware, userRoues);
  app.use("/api/course", authMiddleware, courseRoutes);
  app.use("/api/bookmark", authMiddleware, bookmarkRoutes);
  app.use("/api/rating", authMiddleware, ratingRoutes);
  app.use("/api/lesson", authMiddleware, lessonRoutes);
  app.use("/api/resource", authMiddleware, resourceRoutes);

  return app;
};
