import * as userService from "../services/userService.js";

export const getUsers = async (req, res, next) => {
  try {
    const result = await userService.getAllUsers();
    res.json(result);
  } catch (error) {
    return next(error);
  }
};

export const getUserByName = async (req, res, next) => {
  try {
    const { name } = req.params;
    const resultByName = await userService.getUserByName(name);
    res.json(resultByName);
  } catch (error) {
    return next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const resultById = await userService.getUserById(id);
    res.json(resultById);
  } catch (error) {
    return next(error);
  }
};

export const postUser = async (req, res, next) => {
  try {
    const result = await userService.postCreateUser(req.body);
    res.status(201).json(result);
  } catch (error) {
    return next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await userService.putUpdateUser(id, req.body);
    res.json(result);
  } catch (error) {
    return next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await userService.deleteUser(id);
    res.json(result);
  } catch (error) {
    return next(error);
  }
};
