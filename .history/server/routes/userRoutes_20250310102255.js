import express from 'express';
import upload from "../middleware/multerConfig.js"; // Import multer config
import {
    checkAuth, login, logout, signup, forgotPassword,
    resetPassword, getStudent, deleteUser, countStudents,
    getUserInfo, update
} from '../controllers/userControllers.js';
import protectRoute from '../middleware/protectRoute.js';

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
router.get('/profile', protectRoute, getUserInfo);
router.put('/update/:id', upload.single("file"), update); // Ensure correct file key
app.get('/getimage', async (req, res) => {
    try {
        const data = await image.find({}); // Await directly without .then()
        res.status(200).json({ status: 200, data: data });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Error fetching images" });
    }
});

export default router;
