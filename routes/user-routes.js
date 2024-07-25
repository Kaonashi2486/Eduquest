import express from "express";
import { Login, getAllUser, signin } from "../controllers/user-controllers.js";

const router=express.Router();

router.get("/",getAllUser);
router.post("/signin",signin);
router.post("/login",Login);
export default router;