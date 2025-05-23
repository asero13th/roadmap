import { DataTypes } from "sequelize";
import { sequelize } from "../services/Database.js";

const Course = sequelize.define("Course", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },

  title: {
    type: DataTypes.STRING,
  },

  description: {
    type: DataTypes.STRING,
  },

  thumbnail: {
    type: DataTypes.STRING,
  },
  category: {
    type: DataTypes.STRING,
  },
  duration: {
    type: DataTypes.INTEGER,
  },
  courseColor: {
    type: DataTypes.STRING,
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

export default Course;
