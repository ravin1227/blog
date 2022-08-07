import express from 'express';
import { getAllUser, sigin, signup } from '../controllers/user-controller';
const router = express.Router();

router.get("/", getAllUser);
router.post("/signup",signup); 
router.post("/login", sigin)

export default router;