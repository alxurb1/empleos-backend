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
