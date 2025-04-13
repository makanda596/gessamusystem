import express from 'express';
import { oneImage } from '../controllers/imagecontrollers.js'
const router = express.Router()

router.post('/oneImage', oneImage)


export default router