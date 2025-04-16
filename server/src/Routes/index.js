// import { Router } from 'express'
import express from 'express';


import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';
import dashboardRoutes from './dashboardRoutes.js'
const router = express.Router();

router.use("/auth", authRoutes)
router.use("/user", userRoutes)
router.use("/dashboard", dashboardRoutes)
export default router
