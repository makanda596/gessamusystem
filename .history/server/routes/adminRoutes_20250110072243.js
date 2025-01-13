import express from "express"
import { adminLogin, adminSignup } from "../controllers/adminControllers.js";

const router = express.Router();

router.post('/adminSignup', adminSignup)
router.post('/adminLogin', adminLogin)


export default router;