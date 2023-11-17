import express from 'express'
import { createUser, deleteUser, updateUser, fetchUser, fetchUserWithFilter, singleUser } from '../controllers/userController.js';
const router = express.Router();

router.get('/getuser', fetchUser);
router.get('/getuserfilter', fetchUserWithFilter);
router.post('/new',createUser);
router.post('/getone', singleUser);
router.post('/delete',deleteUser);
router.post('/update',updateUser);
export default router;