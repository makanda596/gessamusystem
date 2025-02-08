import express from "express"
import { adminLogin, adminLogout, adminSignup ,admDetails} from "../controllers/adminControllers.js";

const router = express.Router();

router.post('/adminSignup', adminSignup)
router.post('/adminLogin', adminLogin)
router.post('/adminLogout', adminLogout)
router.get("/admDetails",admDetails)
// router.get('/count', countStudents)

export default router; 