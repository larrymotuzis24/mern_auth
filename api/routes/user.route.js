import express from 'express';
import { deleteUser, test, updateUser } from '../controllers/user.controller.js';
import { veriftyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/', test);
router.post('/update/:id', veriftyToken, updateUser);
router.delete('/delete/:id', veriftyToken, deleteUser );

export default router;

