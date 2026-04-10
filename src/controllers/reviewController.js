import * as reviewService from "../services/reviewService.js";

export const getReviewsByCompany = async (req, res, next) => {
  try {
    const { id } = req.params; 
    const result = await reviewService.getReviewsByCompany(id);
    res.json(result);
  } catch (error) {
    return next(error);
  }
};

export const createReview = async (req, res, next) => {
  try {
    const { id } = req.params; 
    
    const reviewData = { 
      ...req.body, 
      company_id: id 
    };
    const result = await reviewService.createReview(reviewData);
    res.json(result);
  } catch (error) {
    return next(error);
  }
};

export const deleteReview = async (req, res, next) => {
  try {
    const { id } = req.params; 
    const result = await reviewService.deleteReview(id);
    
    res.json(result);
  } catch (error) {
    return next(error);
  }
};