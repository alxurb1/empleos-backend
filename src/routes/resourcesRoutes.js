import * as resourcesController from "../controllers/resourcesController.js";

import { Router } from "express";

const router = Router();

router.get("/", resourcesController.getResources);
router.get("/:id", resourcesController.getResourceById);

router.post("/", resourcesController.createResource);

router.delete("/:id", resourcesController.deleteResource);

export default router;
