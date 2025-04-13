import express from 'express';
import {
    takeProject, deleteProject, getUserProject, submitProject, deleteUserProject, getAllProject,
     countUserProject} from '../controllers/userProjectControllers.js';
import { verifyToken } from '../middleware/verifyToken.js'

const router = express.Router();

router.get("/takeProject", takeProject);
router.post("/submitProject", verifyToken, submitProject)
router.delete("/deleteProject/:id", deleteProject);
router.get('/getUserProject', verifyToken, getUserProject);
router.delete('/deleteUserProject/:postId', verifyToken, deleteUserProject);
router.get('/countUserProject', verifyToken, countUserProject);
// router.get('/getSubmittedTask', getSubmittedTask)
router.get("/getAllProject", getAllProject)


export default router;