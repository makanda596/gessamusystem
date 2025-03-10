import express from "express"
import { adminLogin, adminLogout, adminSignup, countStudents } from "../controllers/adminControllers.js";

const router = express.Router();

router.post('/adminSignup', adminSignup)
router.post('/adminLogin', adminLogin)
router.post('/adminLogout', adminLogout)
router.get('/count', countStudents)

export default router; 