import * as resourcesServices from "../services/resourcesService.js";

export const getResources = async (req, res, next) => {
  try {
    const filters = req.query;
    const result = await resourcesServices.getAllResources(filters);
    res.json(result);
  } catch (error) {
    return next(error);
  }
};

export const getResourceById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await resourcesServices.getResourceById(id);
    res.json(result);
  } catch (error) {
    return next(error);
  }
};

export const createResource = async (req, res, next) => {
  try {
    const result = await resourcesServices.postNewResource(req.body);
    res.json(result);
  } catch (error) {
    return next(error);
  }
};

export const deleteResource = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await resourcesServices.deleteResource(id);
    res.json(result);
  } catch (error) {
    return next(error);
  }
};
