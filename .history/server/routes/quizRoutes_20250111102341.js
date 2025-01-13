import express from 'express';
const router = express.Router();

router.post("makeQuiz", makeQuiz);
router.get("takeQuiz", takeQuiz);


export default router;