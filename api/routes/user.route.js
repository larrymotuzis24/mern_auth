import express from 'express';
import { test, updateUser } from '../controllers/user.controller.js';
import { veriftyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/', test);
router.post('/update/:id', veriftyToken, updateUser);

export default router;

