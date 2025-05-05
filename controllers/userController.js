import User from "../models/userModel.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
    });

    res.send({
      data: users,
      status: true,
      message: "Users fetched successfully",
    });
  } catch (error) {
    res.status(500).send({
      message: "An error occurred while fetching users",
      error: error.message,
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] },
    });
    res.send({
      data: user,
      status: true,
      message: "User fetched successfully",
    });
  } catch (error) {
    res.status(500).send({
      message: "An error occurred while fetching the user",
      error: error.message,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { firstName, lastName, dateOFBirth } = req.body;
    const userId = req.user.user_id;

    if (isNaN(id)) {
      return res.status(400).send({ message: "Invalid user ID" });
    }

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    if (user.id !== userId) {
      return res
        .status(403)
        .send({ message: "You do not have permission to update this user" });
    }

    user.firstName = firstName;
    user.lastName = lastName;
    user.dateOFBirth = dateOFBirth;

    await user.save();
    const userWithoutPassword = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      streak: user.streak,
      role: user.role,
      dateOFBirth: user.dateOFBirth,
    };

    res.send({
      message: "User updated successfully",
      data: userWithoutPassword,
      status: true,
    });
  } catch (error) {
    res.status(500).send({
      message: "An error occurred while updating the user",
      error: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    if (user.id !== userId) {
      return res
        .status(403)
        .send({ message: "You do not have permission to delete this user" });
    }

    await user.destroy();
    res.send({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).send({
      message: "An error occurred while deleting the user",
      error: error.message,
    });
  }
};
