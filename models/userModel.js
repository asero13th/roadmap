import { DataTypes } from "sequelize";
import { sequelize } from "../services/Database.js";

const User = sequelize.define("User", {
  user_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },

  user_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  user_email: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  user_password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  user_fullname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default User;
