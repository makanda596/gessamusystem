import express from 'express';
const app = express();
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import quizRoutes from './routes/quizRoutes.js'
import taskRoutes from './routes/taskRouters.js'
import studentsRoutes from './routes/studentsRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
dotenv.config()

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

app.post('/uploads', upload.single('file'), uploadRoutes)
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
// app.use('/projects', projectsRoutes)
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
