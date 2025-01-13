import express from 'express';

const router = express.Router();

router.post("makeQuiz", makeQuiz);

export default router;