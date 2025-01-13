import express from 'express';
import { imageUpload } from '../controllers/imagecontrollers';

const router = express.Router();

router.post('/image', imageUpload)

export default router