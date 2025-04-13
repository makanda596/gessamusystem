import express from 'express';
import {
    takeProject, deleteProject, getUserProject, 
     countUserProject} from '../controllers/userProjectControllers.js';
import { verifyToken } from '../middleware/verifyToken.js'

const router = express.Router();

router.get("/takeTask", takeTask);
router.delete("/deleteTask/:id", deleteTask);
router.post('/submitTask', verifyToken, submitTask);
router.get('/countUserTask', verifyToken, countUserTask);
router.get('/getSubmittedTask', getSubmittedTask)


export default router;