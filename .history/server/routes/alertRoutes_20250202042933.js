import express from 'express';
import { makeAlert, takeAlert ,alertCount} from '../controllers/alertControllers.js';
const router = express.Router();

router.post("/makeAlert", makeAlert);
router.get("/takeAlert/:userId", takeAlert);
router.get('/countAlert/:userId',alertCount )

export default router;