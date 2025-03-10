import express from 'express';
import {
    makeAlert,
    takeAlert,
    alertCount,
    // allalert,
    getAlert,
    // getAllAlert,
    deleteAlert  // Import the delete function
} from '../controllers/alertControllers.js';

const router = express.Router();

router.post("/makeAlert", makeAlert);
// router.post('/allalert', allalert) 
// router.get('/getAllAlert', getAllAlert);
router.get("/takeAlert/:userId",takeAlert);
router.get('/countAlert/userId',alertCount);
router.get('/getAlert', getAlert);

router.delete('/deleteAlert/:id', deleteAlert); // Add delete alert route

export default router;
 