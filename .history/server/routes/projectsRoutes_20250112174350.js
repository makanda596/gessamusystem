import express from 'express';
import { postprojects } from '../controllers/projectControllers';

const router = express.Router();

app.post('/projects', postprojects)
export default router;