import express from 'express';
import { postprojects, getprojects } from '../controllers/projectControllers.js';
import multer from 'multer'
const upload = multer({ dest: 'project/' })
const router = express.Router();

router.post('/sendprojects', upload.array('file'), postprojects)
router.get('/getprojects', getprojects)

// Middleware to simulate user authentication (for example)
// const authenticateUser = (req, res, next) => {
//     // Assume `req.user` is populated with the authenticated user's details
//     req.user = { year: 3 }; // Replace this with actual authentication logic
//     next();
// };

// // Fetch projects for the user's year of study
// router.get('/projects', authenticateUser, async (req, res) => {
//     try {
//         const year = req.user.year; // Get the user's year of study
//         const projects = await Project.find({ year }); // Fetch projects for that year
//         res.status(200).json(projects);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Failed to fetch projects." });
//     }
// });
export default router;