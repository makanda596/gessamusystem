import express from 'express';
import { postprojects, getprojects } from '../controllers/projectControllers.js';

const router = express.Router();

router.post('/sendprojects', postprojects)
router.get('/getprojects', getprojects)
export default router;