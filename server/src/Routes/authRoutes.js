// import { Router } from 'express'
import express from 'express';

import { login, register, superAdmin } from '../Controllers/authController.js'
import { uploadAvatar } from '../Middlewares/uploads.js';
const router = express.Router();

router.post('/super/admin', superAdmin)


router.post('/register', uploadAvatar, register)
router.post('/login', login)

export default router
