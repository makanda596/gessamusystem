import express from 'express';
import { allImages } from '../controllers/getimagescontrollers.js.js';

const router = express.Router()

router.get('/allImages', allImages)

export default router