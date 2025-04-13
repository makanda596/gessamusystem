import express from 'express';
import upload from "../middleware/multerConfig.js"; // Import multer config
import {
    checkAuth, login, logout, signup, forgotPassword,
    resetPassword, getStudent, deleteUser, countStudents, countAlerts,
    getUserInfo, update,
    verifyEmail
} from '../controllers/userControllers.js';
import protectRoute from '../middleware/protectRoute.js';
import { User } from '../models/Usermodel.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.get('/check-auth', verifyToken, checkAuth);
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.post('/password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.get('/getStudents', getStudent);
router.delete('/deleteUser/:id', verifyToken, deleteUser);
router.get("/studentCount", countStudents);
router.post("/verifyEmail", verifyEmail)
router.get('/countAlerts', verifyToken, countAlerts)
router.get('/profile', verifyToken, getUserInfo);
router.put('/update/:id', upload.single("file"), update); // Ensure correct file key


export default router;
