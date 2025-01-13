import express from 'express';
import { allImages, oneImage } from '../controllers/getimagescontrollers.js';

const router = express.Router()

router.get('/allImages', allImages)
router.get('/oneImage/:id', oneImage)


export default router