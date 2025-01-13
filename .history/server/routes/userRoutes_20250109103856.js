import express from 'express';

const router = express.Router();

router.get('/signup', (req, res) => {
    res.send('Signup Page');
})
router.get('/login', (req, res) => {
    res.send('login Page');
})
export default router;