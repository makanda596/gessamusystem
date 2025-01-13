import express from 'express';
import { postprojects } from '../controllers/projectControllers.js';

const router = express.Router();

app.post('/projects', postprojects)
export default router;