import { DataTypes } from "sequelize";
import { sequelize } from "../services/Database.js";
import Course from "./courseModel.js";

const Rating = sequelize.define("Rating", {
  rating_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  course_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Course,
      key: 'course_id'
    }
  },
  rating_value: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5
    }
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  }
});

// Create association with Course model
Rating.belongsTo(Course, { foreignKey: 'course_id' });
Course.hasMany(Rating, { foreignKey: 'course_id' });

export default Rating; 