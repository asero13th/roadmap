import { DataTypes } from "sequelize";
import { sequelize } from "../services/Database.js";

const Roadmap = sequelize.define("Roadmap", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  introduction: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  additional_tips: {
    type: DataTypes.TEXT,
  },
});

export default Roadmap;
