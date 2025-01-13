
import express from 'express'

const router = express.Router();

router.get('/all', allStudents)

export default router