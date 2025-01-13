import express from "express"

const router = express.Router();

router.post('/adminSignup', adminSignup)
router.post('/adminLogin', adminLogin)


export default router;