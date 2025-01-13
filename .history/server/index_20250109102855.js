import express from 'express';
const app = express();
import dotenv from 'dotenv';
import mongoose from 'mongoose';

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
dotenv.config()

const PORT = process.env.PORT || 6000;
const MONGO_URL = process.env.MEGA_URL
mongoose.connect(MONGO_URL, () => {
    console.log("mongo db connected succesufly")
})
app.listen(PORT, () => {
    console.log(`app listening on port ${PORT} `)
}
)
