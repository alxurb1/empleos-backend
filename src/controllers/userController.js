import * as userService from "../services/userService.js";

export const getUsers = async (req, res, next) => {
  try {
    const result = await userService.getAllUsers();
    res.json(result);
  } catch (error) {
    return next(error);
  }
};
