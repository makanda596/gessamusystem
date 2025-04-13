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
import bcrypt from "bcryptjs"

import multer from 'multer'
const upload = multer({ dest: 'uploads/' })



app.use(cors(
   {
    // origin:"http://localhost:3000",
        origin: ["https://gessamuportal.onrender.com"],  
        credentials: true,  // Allow cookies to be sent with the request
    })
);


app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

dotenv.config()
app.use(cookieParser());


app.get('/api/test', (req, res) => {
    res.json({ message: 'CORS works!' });
});

app.post('/login', (req, res) => {
    const { username, email, admNo } = req.body;  // Extracting multiple details from the request body

    if (username && email && admNo) {  // Ensure all required fields are provided
        req.session.user = username;  // Store the username
        req.session.email = email;    // Store the email
        req.session.admNo = admNo;    // Store the admission number
        // Send a response with all the stored details
        res.send({
            message: 'Logged in',
            user:{
            user: req.session.user,
            email: req.session.email,
            admNo: req.session.admNo}
        });
    } else {
        // If any required field is missing, send an error message
        res.status(400).send({ message: 'Username, email, and admission number are required' });
    }
});

app.get('/', (req, res) => {
 res.json("hello")
});
//uploading a file
//getting the images
app.use('/images', imagesRoutes)
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
//dotenv files
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

// ,.kk