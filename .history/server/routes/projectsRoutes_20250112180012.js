import express from 'express';
import { postprojects } from '../controllers/projectControllers.js';

const router = express.Router();

router.post('/sendprojects', postprojects)
export default router;