import express from 'express';
import makeQuiz from './quizRoutes/makeQuiz.js'
import takeQuiz from './quizRoutes/takeQuiz.js'
const router = express.Router();

router.post("makeQuiz", makeQuiz);
router.get("takeQuiz", takeQuiz);


export default router;