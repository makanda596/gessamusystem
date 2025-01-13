import express from 'express';
const app = express();

app.listen(5000, (req, res) => {
    app.status(200).json("website listening on port 5000")
})