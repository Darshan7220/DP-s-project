import express from 'express';
import { dashboardCount } from '../Controllers/dashboard.js';

const router = express.Router();

router.get('/count', dashboardCount)

export default router