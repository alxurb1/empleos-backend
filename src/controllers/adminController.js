import * as adminService from "../services/adminService.js";
import * as userService from "../services/userService.js";
import * as companyService from "../services/companyService.js";

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await adminService.deleteUser(id);
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

export const getMetrics = async (req, res, next) => {
  try {
    const result = await adminService.getAllMetrics();
    res.json(result);
  } catch (error) {
    return next(error);
  }
};

export const updateUserStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { is_active } = req.body;

    const result = await adminService.updateUserStatus(id, is_active);
    res.json(result);
  } catch (error) {
    return next(error);
  }
};

export const updateCompanyStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { is_active } = req.body;

    const result = await adminService.updateCompanyStatus(id, is_active);

    res.json(result);
  } catch (error) {
    return next(error);
  }
};

export const getReviews = async (req, res, next) => {
  try {
    const result = await adminService.getAllReviews();

    res.json(result);
  } catch (error) {
    return next(error);
  }
};

export const updateReviewStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const result = await adminService.updateReviewStatus(id, status);

    res.json(result);
  } catch (error) {
    return next(error);
  }
};

export const deleteReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await adminService.deleteReview(id);

    res.json(result);
  } catch (error) {
    return next(error);
  }
};

export const getForumPosts = async (req, res, next) => {
  try {
    const result = await adminService.getAllForumPosts();

    res.json(result);
  } catch (error) {
    return next(error);
  }
};

export const deleteForumPost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await adminService.deleteForumPost(id);

    res.json(result);
  } catch (error) {
    return next(error);
  }
};
