import { DataTypes } from "sequelize";
import { sequelize } from "../services/Database.js";
import Course from "./courseModel.js";
import Category from "./categoryModel.js";

const CourseCategory = sequelize.define("CourseCategory", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  course_id: {
    type: DataTypes.STRING,
    references: {
      model: Course,
      key: "id",
    },
  },
  category_id: {
    type: DataTypes.STRING,
    references: {
      model: Category,
      key: "id",
    },
  },
});

export default CourseCategory;