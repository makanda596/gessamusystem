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
import session from 'express-session'

import multer from 'multer'
const upload = multer({ dest: 'uploads/' })
//uploading a file 

// import multer from 'multer'
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, '/public/images')
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//         cb(null, file.fieldname + '-' + uniqueSuffix);
//     }
// })
// const upload = multer({ storage: storage })



// app.post('/uploads', upload.single('file'), (req, res) => {
//     console.log(req.file)
// })
//user routes
// const FRONTEND_URL ="https://gessamuportal.vercel.app"

app.use(
    cors({
        origin: ['https://gessamufrontend.vercel.app/'],  // Specific frontend URL
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin'],
        credentials: true,  // Allow cookies to be sent with the request
    })
);

// Handle preflight requests (important for CORS with credentials)
// app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

dotenv.config()
app.use(cookieParser());
//session setup
app.use(session({
    secret:"secret",
    resave:false,
    saveUninitialized: false, //for making a save withouth the app being modified
    cookie:{secure:false} //coz we using http but in the pro change to true (https)
}))

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

app.get('/profile', (req, res) => {
    // Check if the user is logged in by verifying if session data exists
    if (req.session.user) {
        res.send({
            message: 'Profile details',
            user: req.session.user,
            email: req.session.email,
            admNo: req.session.admNo
        });
    } else {
        // If the session doesn't exist, send an error indicating the user needs to log in
        res.status(401).send({ message: 'You need to log in first' });
    }
});
//uploading a file
app.use('/uploads', upload.single('file'), uploadRoutes)
//getting the images
app.use('/images', imagesRoutes)
app.use('/auth', userRoutes)

//admin router
app.use('/admin', adminRoutes)

//questions  
app.use('/quiz', quizRoutes)
//tasks
app.use('/task', taskRoutes)
//getstudents
app.use('/students', studentsRoutes)
//post projects
app.use('/projects', projectsRoutes)
//post Alert
app.use('/alert', alertRoutes)
//dotenv files
const PORT = process.env.PORT || 6000;
const MONGO_URL = process.env.MONGO_URL
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
