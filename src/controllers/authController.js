import * as authService from "../services/authService.js";

export const registerCandidate = async (req, res, next) => {
  try {
    const result = await authService.registerCandidate(req.body);
    res.json(result);
  } catch (error) {
    return next(error);
  }
};

export const registerCompany = async (req, res, next) => {
  try {
    const result = await authService.registerCompany(req.body);
    res.json(result);
  } catch (error) {
    return next(error);
  }
};

export const loginCandidate = async (req, res, next) => {
  try {
    const result = await authService.loginCandidate(req.body);
    res.json(result);
  } catch (error) {
    return next(error);
  }
};

export const loginCompany = async (req, res, next) => {
  try {
    const result = await authService.loginCompany(req.body);
    res.json(result);
  } catch (error) {
    return next(error);
  }
};

export const loginAdmin = async (req, res, next) => {
  try {
    const result = await authService.loginAdmin(req.body);
    res.json(result);
  } catch (error) {
    return next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    const result = await authService.logout(req.body);
    res.json(result);
  } catch (error) {
    return next(error);
  }
};
