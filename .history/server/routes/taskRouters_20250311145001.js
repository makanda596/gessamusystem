import express from 'express';
import { makeTask, takeTask, task, deleteTask, submitTask, getSubmittedTask } from '../controllers/taskControllers.js';
import { Task } from '../models/taskmodel.js';
import { verifyToken } from '../middleware/verifyToken.js'

const router = express.Router();

router.post("/makeTask", makeTask);
router.get("/takeTask", takeTask);
router.get("/onetask/:id", task);
router.delete("/deleteTask/:id", deleteTask);
router.post('/submitTask/:id', submitTask);
router.get('/getSubmittedTask', getSubmittedTask)
// router.get('/getonesubmitedTask/:id', getOneSubmittedTask)
router.put('/toggleComplete/:id', async (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;

    try {
        const task = await Task.findByIdAndUpdate(id, { completed }, { new: true }); // MongoDB example
        res.status(400).json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update task.' });
    }
});


export default router;