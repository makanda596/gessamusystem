import express from 'express';
const app = express();
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import quizRoutes from './routes/quizRoutes.js'
import taskRoutes from './routes/taskRouters.js'
import projectsRoutes from './routes/projectsRoutes.js'
import alertRoutes from './routes/alertRoutes.js'

import UserprojectRoutes from './routes/UserprojectRoutes.js'
import helmet from "helmet"


app.use(cors(
   {
    // origin:"http://localhost:3000",
        origin: ["https://gessamu.onrender.com"],
        credentials: true, 
    })
);


app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

dotenv.config()
app.use(cookieParser());

app.use(helmet())

//uploading a file
//getting the images
app.use('/auth', userRoutes)

//admin router
app.use('/admin', adminRoutes)

//questions  
app.use('/quiz', quizRoutes)
//tasks
app.use('/task', taskRoutes)
app.use('/userProjects',UserprojectRoutes)
//post projects
app.use('/projects', projectsRoutes)
//post Alert
app.use('/alert', alertRoutes)

const PORT = process.env.PORT || 6000;
const MONGO_URL =process.env.MONGO_URL
mongoose.connect(MONGO_URL)
try {
    console.log("mongodb connected")
}
catch (error) {
    console.error(error)
}
app.listen(PORT, () => {
    console.log(`app listening on port ${PORT} `)
}
)
