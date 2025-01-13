import express from 'express';
import { makeQuiz, takeQuiz } from '../controllers/quizControllers.js';
const router = express.Router();

router.post("makeQuiz", makeQuiz);
router.get("takeQuiz", takeQuiz);


export default router;