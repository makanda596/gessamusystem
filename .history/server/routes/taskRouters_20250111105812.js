import express from 'express';
import { makeTask, takeTask, task } from '../controllers/taskControllers.js';

const router = express.Router();

router.post("/makeTask", makeTask);
router.get("/takeTask", takeTask);
router.get("/onetask/:{id}", task);



export default router;