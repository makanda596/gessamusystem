import express from 'express';
import {
    makeAlert,
    takeAlert,
    alertCount,
    getAlert,
    deleteAlert  // Import the delete function
} from '../controllers/alertControllers.js';

const router = express.Router();

router.post("/makeAlert", makeAlert);
router.get("/takeAlert/:id", takeAlert);
router.get('/countAlert/:id', alertCount);
router.get('/getAlert', getAlert);
router.delete('/deleteAlert/:id', deleteAlert); // Add delete alert route

export default router;
