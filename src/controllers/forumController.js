import * as forumService from "../services/forumService.js";

export const getPosts = async (req, res, next) => {
  try {
    const { category } = req.query;

    const result = await forumService.getPosts(category);
    res.json(result);
  } catch (error) {
    return next(error);
  }
};

export const createPost = async (req, res, next) => {
  try {
    const result = await forumService.createPost(req.body);

    res.json(result);
  } catch (error) {
    return next(error);
  }
};

export const updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await forumService.updatePost(id, req.body);

    res.json(result);
  } catch (error) {
    return next(error);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await forumService.deletePost(id);

    res.json(result);
  } catch (error) {
    return next(error);
  }
};
