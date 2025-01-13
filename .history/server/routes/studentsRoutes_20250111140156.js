
import express from 'express'
import { allStudents } from '../controllers/stundentsControllers.js';

const router = express.Router();

router.get('/all', allStudents)

export default router