import express from 'express';
import makeQuiz from './quizRoutes/makeQuiz.js'
const router = express.Router();

router.post("makeQuiz", makeQuiz);
router.get("takeQuiz", takeQuiz);


export default router;