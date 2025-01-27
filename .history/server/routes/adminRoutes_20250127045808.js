import express from "express"
import { adminLogin, adminLogout, adminSignup } from "../controllers/adminControllers.js";

const router = express.Router();

router.post('/adminSignup', adminSignup)
router.post('/adminLogin', adminLogin)
router.post('/adminLogout', adminLogout)


export default router; 