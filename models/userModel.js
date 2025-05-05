import { DataTypes } from "sequelize";
import { sequelize } from "../services/Database.js";

const User = sequelize.define("Users", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dateOFBirth: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  streak: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },

  role: {
    type: DataTypes.STRING,
    defaultValue: "student",
  },

  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

export default User;
