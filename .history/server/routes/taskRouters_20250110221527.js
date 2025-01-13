import express from 'express';

const router = express.Router();

router.post("makeTask", makeTask);
router.get("takeTask", takeTask);


export default router;