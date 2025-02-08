import express from 'express';
const router = express.Router();

router.post("makeAlert", makeAlert);
router.get("takeAlert", takeAlert);


export default router;