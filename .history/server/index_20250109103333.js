import express from 'express';
const app = express();
import dotenv from 'dotenv';
import mongoose from 'mongoose';

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
dotenv.config()


//user routes
app.use('/auth', userRoutes)
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
