import { DataTypes } from "sequelize";
import { sequelize } from "../services/Database.js";

const Course = sequelize.define("Course", {
  course_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },

  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  course_color: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  review: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  lessons: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  resource: {
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
});

export default Course;
