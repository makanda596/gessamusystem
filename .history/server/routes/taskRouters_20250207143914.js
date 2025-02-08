import express from 'express';
import { makeTask, takeTask, task, deleteTask, submitTask } from '../controllers/taskControllers.js';
import { Task } from '../models/taskmodel.js';

const router = express.Router();

router.post("/makeTask", makeTask);
router.get("/takeTask", takeTask);
router.get("/onetask/:id", task);
router.delete("/deleteTask/:id", deleteTask);
router.post('/submitTask/:id', verifyToken, submitTask);
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