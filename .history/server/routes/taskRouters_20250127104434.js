import express from 'express';
import { makeTask, takeTask, task, deleteTask } from '../controllers/taskControllers.js';

const router = express.Router();

router.post("/makeTask", makeTask);
router.get("/takeTask", takeTask);
router.get("/onetask/:id", task);
router.delete("/deleteTask/:id", deleteTask);
router.put('/task/toggleComplete/:id', async (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;

    try {
        const task = await Task.findByIdAndUpdate(id, { completed }, { new: true }); // MongoDB example
        res.json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update task.' });
    }
});


export default router;