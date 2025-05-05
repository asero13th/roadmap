import { DataTypes } from "sequelize";
import { sequelize } from "../services/Database.js";
import Lesson from "./lessonModel.js";
const LessonVideo = sequelize.define("LessonVideos", {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  lesson_id: {
    type: DataTypes.STRING,
    references: {
      model: Lesson,
      key: "id",
    },
  },
  videoLink: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },

  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

export default LessonVideo;
