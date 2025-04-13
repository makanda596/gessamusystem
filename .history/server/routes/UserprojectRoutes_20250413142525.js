import express from 'express';
import {
    takeProject, deleteProject, getUserProject, submitProject,
     countUserProject} from '../controllers/userProjectControllers.js';
import { verifyToken } from '../middleware/verifyToken.js'

const router = express.Router();

router.get("/takeProject", takeProject);
router.post("/submitProject", verifyToken, submitProject)
router.delete("/deleteProject/:id", deleteProject);
router.get('/getUserProject', verifyToken, getUserProject);
router.post('/deleteProject', verifyToken, deleteProject);
router.get('/countUserProject', verifyToken, countUserProject);
// router.get('/getSubmittedTask', getSubmittedTask)


export default router;