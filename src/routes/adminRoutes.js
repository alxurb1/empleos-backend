import { Router } from "express";
import { verifyToken } from "../middlewares/auth.js";
import { requireRole } from "../middlewares/role.js";
import * as adminController from "../controllers/adminController.js";
import { getUsers } from "../controllers/userController.js";
import { getCompanies } from "../controllers/companyController.js";
import { updateVacancyStatus } from "../controllers/vacancyController.js";

import { ROLES } from "../constants/roles.js";

const router = Router();

router.use(verifyToken, requireRole(ROLES.ADMIN));

// router.get("/metrics", adminController.getMetrics);
router.get("/users", getUsers); //lista
// router.put("/users/:id/status", adminController.updateUserStatus);
router.delete("/users/:id", adminController.deleteUser); //lista
router.get("/companies", getCompanies); //lista
// router.put("/companies/:id/status", adminController.updateCompanyStatus);
router.delete("/companies/:id", adminController.deleteCompany); //lista
router.get("/jobs", adminController.getJobs); //lista
router.put("/jobs/:id/status", updateVacancyStatus); //lista
// router.get("/reviews", adminController.getReviews);
// router.put("/reviews/:id/status", adminController.updateReviewStatus);
// router.delete("/reviews/:id", adminController.deleteReview);
// router.get("/forum", adminController.getForumPosts);
// router.delete("/forum/:id", adminController.deleteForumPost);

export default router;
