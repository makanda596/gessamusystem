import express from 'express';
import {
    takeProject, deleteProject, getUserProject, 
     countUserProject} from '../controllers/userProjectControllers.js';
import { verifyToken } from '../middleware/verifyToken.js'

const router = express.Router();

router.get("/takeProject", takeProject);
router.delete("/deleteProject/:id", deleteProject);
router.post('/getUserProject', verifyToken, getUserProject);
router.get('/countUserProject', verifyToken, countUserProject);
// router.get('/getSubmittedTask', getSubmittedTask)


export default router;