import express from 'express';
import {
    makeTask, takeTask, task, deleteTask, submitTask, getSubmittedTask, getUserSubmittedTask, countUserCompletedTask ,
    getUserCompletedTask, countUserTask, toggleonetask } from '../controllers/taskControllers.js';
import { Task } from '../models/taskmodel.js';
import { verifyToken } from '../middleware/verifyToken.js'

const router = express.Router();

router.post("/makeTask", makeTask);
router.get("/takeTask", takeTask);
router.get("/onetask/:id", task);
router.get("/getUserCompletedTask", verifyToken, getUserCompletedTask)
router.post("/toggleonetask/:id", toggleonetask);
router.delete("/deleteTask/:id", deleteTask);
router.post('/submitTask', verifyToken, submitTask);
router.get('/countUserCompletedTask', verifyToken, countUserCompletedTask);
router.get('/countUserTask', verifyToken, countUserTask);
router.get('/getSubmittedTask', getSubmittedTask)
router.get('/getUserSubmittedTask', verifyToken, getUserSubmittedTask)

export default router;