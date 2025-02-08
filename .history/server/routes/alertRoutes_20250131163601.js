import express from 'express';
import { makeAlert } from '../controllers/alertControllers';
const router = express.Router();

router.post("makeAlert", makeAlert);
// router.get("takeAlert", takeAlert);


export default router;