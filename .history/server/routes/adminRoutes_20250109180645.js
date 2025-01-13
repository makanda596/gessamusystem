import express from "express"

const router = express.Router();

router.post('/adminSignup', adminSignup)
router.post('/adminSignup', adminLogin)


export default router;