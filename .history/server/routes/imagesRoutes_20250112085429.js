import express from 'express';
import { allImages } from '../controllers/imagescontrollers.js';

const router = express.Router()

router.get('/allImages', allImages)

export default router