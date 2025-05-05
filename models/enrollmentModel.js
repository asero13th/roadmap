import { DataTypes } from "sequelize";
import { sequelize } from "../services/Database";
import Course from "./courseModel";
import User from "./userModel";

const Enrollment = sequelize.define("Enrollment", {
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
  progress: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  enrolledAT: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

export default Enrollment;
