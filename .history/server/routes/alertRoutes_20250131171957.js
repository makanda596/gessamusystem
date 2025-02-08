import express from 'express';
import { makeAlert, takeAlert } from '../controllers/alertControllers.js';
const router = express.Router();

router.post("/makeAlert", makeAlert);
router.get("/takeAlert/:userId", takeAlert);


export default router;