import { DataTypes } from "sequelize";
import { sequelize } from "../services/Database.js";
import Lesson from "./lessonModel.js";
const Resource = sequelize.define("Resource", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  lesson_id: {
    type: DataTypes.STRING,
    references: {
      model: Lesson,
      key: "id",
    },
  },
  title: {
    type: DataTypes.STRING,
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

export default Resource;
