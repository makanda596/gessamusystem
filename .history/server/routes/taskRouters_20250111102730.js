import express from 'express';
import { makeTask, takeTask } from '../controllers/taskControllers';

const router = express.Router();

router.post("makeTask", makeTask);
router.get("takeTask", takeTask);


export default router;