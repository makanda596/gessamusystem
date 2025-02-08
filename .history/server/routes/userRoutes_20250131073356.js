import express from 'express';
import { checkAuth, login, logout, signup, forgotPassword, resetPassword, getStudent, } from '../controllers/userControllers.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.get('/check-auth', verifyToken, checkAuth)
router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)
router.post('/password', forgotPassword)
router.post('/reset-password/:token', resetPassword)
router.get('/getStudents', getStudent)
router.delete('/deleteUser', deleteUser)
export default router;  