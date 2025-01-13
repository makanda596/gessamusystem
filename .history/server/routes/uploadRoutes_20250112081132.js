import express from 'express';

const router = express.Router();

router.post('/image', imageUpload)

export default router