import { Router } from "express";
import * as reviewController from "../controllers/reviewController.js";

const router = Router();

router.get("/company/:id", reviewController.getReviewsByCompany);

router.post("/company/:id", reviewController.createReview);

router.delete("/:id", reviewController.deleteReview);

export default router;