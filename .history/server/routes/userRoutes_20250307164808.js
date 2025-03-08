import express from 'express';
import { checkAuth, login, logout, signup, forgotPassword, resetPassword, getStudent, deleteUser, countStudents,getUserInfo } from '../controllers/userControllers.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();

router.get('/check-auth', verifyToken, checkAuth)
router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)
router.post('/password', forgotPassword)
router.post('/reset-password/:token', resetPassword)
router.get('/getStudents', getStudent)
router.delete('/deleteUser/:id', deleteUser)
router.get("/studentCount", countStudents)
router.get('/profile', protectRoute ,getUserInfo)

export default router;  