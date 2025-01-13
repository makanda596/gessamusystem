import express from 'express';
import { allImages, oneImage } from '../controllers/getimagescontrollers.js.js';

const router = express.Router()

router.get('/allImages', allImages)
router.get('/oneImage', oneImage)


export default router