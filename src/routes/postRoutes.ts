import { Router } from "express";
import { createPost } from "../controllers/postController";

const router = Router();

router.post("/", createPost);

export default router;
