// import { Router } from 'express';
import express from 'express';
import Auth from '../Middlewares/auth.js'

import { getAllUsers, deleteUser, updateUser, activeInactiveUser } from '../Controllers/userController.js';

const router = express.Router();


router.get('/list', Auth, getAllUsers)
router.post('/delete/:id', deleteUser)
router.post('/update/:id', updateUser)
router.post('/activeinactive/:id', activeInactiveUser)


export default router;