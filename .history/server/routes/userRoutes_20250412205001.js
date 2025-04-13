import express from 'express';
import upload from "../middleware/multerConfig.js"; // Import multer config
import {
    checkAuth, login, logout, signup, forgotPassword,
    resetPassword, getStudent, deleteUser, countStudents,
    getUserInfo, update,
    verifyEmail
} from '../controllers/userControllers.js';
import protectRoute from '../middleware/protectRoute.js';
import { User } from '../models/Usermodel.js';

const router = express.Router();

router.get('/check-auth', protectRoute, checkAuth);
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.post('/password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.get('/getStudents', getStudent);
router.delete('/deleteUser/:id', protectRoute, deleteUser);
router.get("/studentCount", countStudents);
router.post("/verifyEmail", verifyEmail)
router.get('/countAlerts', verifyToken, countAlerts)
router.get('/profile', protectRoute, getUserInfo);
router.put('/update/:id', upload.single("file"), update); // Ensure correct file key


export default router;
