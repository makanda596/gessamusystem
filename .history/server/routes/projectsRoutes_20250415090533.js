import express from "express";
import {
    postprojects,
    getprojects,
    weeklyProject,
    getweeklyProjects,
    project,
    getAllProjects,
    deleteProject,
    countProjects,
    countWeeklyProjects,
} from "../controllers/projectControllers.js";
import multer from "multer";
const upload = multer({ dest: "project/" }); 
const router = express.Router();
 
router.post("/sendprojects", upload.single("file"), postprojects);
router.get("/getprojects", getprojects);
router.post("/weekly-projects", upload.single("file"), weeklyProject);
router.get("/getweekly-projects", getweeklyProjects);
router.get("/oneproject/:id", project);
router.get("/getAllprojects", getAllProjects);
router.delete("/deleteProject/:id", deleteProject);
router.get("/countWeekly", countWeeklyProjects);
router.get('/countProject', countProjects)


export default router;
