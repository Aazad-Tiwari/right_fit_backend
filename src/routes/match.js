import express from 'express';
import { matchUniversities } from '../controllers/matchController.js';

const router = express.Router();

router.post('/', matchUniversities);

export default router;
