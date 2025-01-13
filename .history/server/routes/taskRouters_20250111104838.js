import express from 'express';
import { makeTask, takeTask } from '../controllers/taskControllers.js';

const router = express.Router();

router.post("/makeTask", makeTask);
router.get("/takeTask", takeTask);
router.get("/task/:id", task);



export default router;