import { DataTypes } from "sequelize";
import { sequelize } from "../services/Database";
import Course from "./courseModel";
import User from "./userModel";
const Review = sequelize.define("Review", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.STRING,
    references: {
      model: User,
      key: "id",
    },
  },
  course_id: {
    type: DataTypes.STRING,
    references: {
      model: Course,
      key: "id",
    },
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  review: {
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

export default Review;
