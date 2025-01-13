import express from 'express';
const app = express();
import dotenv from 'dotenv';

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
dotenv.config()


const PORT = PORT
app.listen(PORT, () => {
    console.log(`app listening on port${PORT} `)
}
)
