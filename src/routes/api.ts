import express from "express";

import { postSub, deleteSub } from "../controllers/subscriptionController";

const router = express.Router();

router.post('/coin', postSub);
router.delete('/coin/:name', deleteSub);

export default router;