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
import studentsRoutes from './routes/studentsRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import imagesRoutes from './routes/imagesRoutes.js'
import projectsRoutes from './routes/projectsRoutes.js'
import alertRoutes from './routes/alertRoutes.js'

import UserprojectRoutes from './routes/UserprojectRoutes.js'




app.use(cors(
   {
    origin:"http://localhost:3000",
        // origin: ["https://gessamuportal.onrender.com"],  
        credentials: true, 
    })
);


app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

dotenv.config()
app.use(cookieParser());


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
//getstudents
app.use('/students', studentsRoutes)
//post projects
app.use('/projects', projectsRoutes)
//post Alert
app.use('/alert', alertRoutes)

const PORT = process.env.PORT || 6000;
const MONGO_URL = "mongodb+srv://oumab743:makandabrian123@cluster0.qj7my.mongodb.net/Gessamu?retryWrites=true&w=majority&appName=Cluster0"
//mongo db connect

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
