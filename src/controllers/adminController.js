import * as adminService from "../services/adminService.js";
import * as userService from "../services/userService.js";
import * as companyService from "../services/companyService.js";

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await userService.deleteUser(id);
    res.json(result);
  } catch (error) {
    return next(error);
  }
};

export const deleteCompany = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await companyService.deleteCompany(id);
    res.json(result);
  } catch (error) {
    return next(error);
  }
};

export const getJobs = async (req, res, next) => {
  try {
    const result = await adminService.getAllJobs();
    res.json(result);
  } catch (error) {
    return next(error);
  }
};
