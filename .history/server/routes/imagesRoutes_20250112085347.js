import express from 'express';
import { allImages } from '../controllers/imagescontrollers';

const router = express.Router()

router.get('/allImages', allImages)

export default router