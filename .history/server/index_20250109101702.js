import express from 'express';
const app = express();

app.use(express.json())

app.listen(5000, (req, res) => {
    res.json("website listening on port 5000")
})
