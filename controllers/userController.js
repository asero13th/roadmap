import User from "../models/userModel.js";

export const getAllUsers = (req, res) => {
  const users = User.findAll();
  res.send({ data: users });
};

export const getUserById = (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).send({ message: "Invalid user ID" });
    }

    const user = User.findByPk(id);
    res.send({ data: user });
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
    const { user_fullname, user_email, user_name } = req.body;
    const userId = req.user.user_id;

    if (isNaN(id)) {
      return res.status(400).send({ message: "Invalid user ID" });
    }

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    user.user_fullname = user_fullname;
    user.user_email = user_email;
    user.user_name = user_name;

    await user.save();
    res.send({ message: "User updated successfully" });
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

    if (isNaN(id)) {
      return res.status(400).send({ message: "Invalid user ID" });
    }

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
