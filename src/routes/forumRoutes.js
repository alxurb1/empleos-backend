import { Router } from "express";
import * as forumController from "../controllers/forumController.js";

const router = Router();

router.get("/", forumController.getPosts); 

router.post("/", forumController.createPost);

router.put("/:id", forumController.updatePost);

router.delete("/:id", forumController.deletePost);

export default router;