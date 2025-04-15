import express from 'express';
import {
    checkAuth, login, logout, signup, forgotPassword,
    resetPassword, getStudent, deleteUser, countStudents, countAlerts,
    getUserInfo,  EmailVerificationResend,
    verifyEmail
} from '../controllers/userControllers.js';

import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.get('/check-auth', verifyToken, checkAuth);
router.post('/signup', signup);
router.post('/resendcode', EmailVerificationResend)

router.post('/login', login);
router.post('/logout', logout);
router.post('/password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.get('/getStudents', getStudent);
router.delete('/deleteUser', verifyToken, deleteUser);
router.get("/studentCount", countStudents);
router.post("/verifyEmail", verifyEmail)
router.get('/countAlerts', verifyToken, countAlerts)
router.get('/profile', verifyToken, getUserInfo);


export default router;
