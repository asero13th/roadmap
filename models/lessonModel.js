import { DataTypes } from "sequelize";
import { sequelize } from "../services/Database.js";
import Course from "./courseModel.js";

const Lesson = sequelize.define("Lesson", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  course_id: {
    type: DataTypes.STRING,
    references: {
      model: Course,
      key: "course_id",
    },
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  introduction: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  conclusion: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  lessonOrder: {
    type: DataTypes.INTEGER,
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
});

export default Lesson;
