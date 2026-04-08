import { Router } from "express";

import * as userController from "../controllers/userController.js";

const router = Router();

router.get("/", userController.getUsers);
router.get("/usuarioNombre/:name", userController.getUserByName);
router.get("/usuarioId/:id", userController.getUserById);

router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

export default router;
