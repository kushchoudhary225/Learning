import express from 'express'
import { createUser, deleteUser, updateUser, fetchUser, fetchUserWithFilter } from '../controllers/userController.js';
const router = express.Router();

router.get('/getuser', fetchUser);
router.get('/getuserfilter', fetchUserWithFilter);
router.post('/new',createUser);
router.delete('/delete',deleteUser);
router.put('/update',updateUser);
export default router;