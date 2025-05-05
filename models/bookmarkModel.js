import { DataTypes } from "sequelize";
import { sequelize } from "../services/Database.js";
import Course from "./courseModel.js";

const Bookmark = sequelize.define("Bookmark", {
  bookmark_id: {
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
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  notes: {
    type: DataTypes.STRING,
    allowNull: true,
  }
});

// Create association with Course model
Bookmark.belongsTo(Course, { foreignKey: 'course_id' });

export default Bookmark; 