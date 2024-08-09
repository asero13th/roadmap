import { DataTypes } from "sequelize";
import { sequelize } from "../services/Database.js";
import Course from "./courseModel.js";

const Lesson = sequelize.define("Lesson", {
  lesson_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },

  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  video_link: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },

  course_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Course,
      key: "course_id",
    },
  },
});

export default Lesson;
