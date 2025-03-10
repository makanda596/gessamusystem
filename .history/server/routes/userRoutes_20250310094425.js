import express from 'express';
import { checkAuth, login, logout, signup, forgotPassword, resetPassword, getStudent, deleteUser, countStudents, getUserInfo, update } from '../controllers/userControllers.js';
import protectRoute from '../middleware/protectRoute.js';
const router = express.Router();
const upload = multer({ storage: storage });


router.get('/check-auth', protectRoute , checkAuth)
router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)
router.post('/password', forgotPassword)
router.post('/reset-password/:token', resetPassword)
router.get('/getStudents', getStudent)
router.delete('/deleteUser/:id', protectRoute, deleteUser)
router.get("/studentCount", countStudents)
router.get('/profile', protectRoute ,getUserInfo)
router.put('/update/:id', upload.single("file"), update)

export default router;    