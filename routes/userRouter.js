import Router from 'express';
import userController from '../controllers/userController.js';
import { verifyUser, verifyAdmin } from '../middlevare/verifyToken.js';

const router = new Router();

//API
router.post('/', userController.createUser);
router.get('/', verifyAdmin, userController.giveAllUsers);
router.get('/:id', verifyUser, userController.giveOneUser);
router.put('/:id', verifyUser, userController.updateInfoAboutUser);
router.delete('/:id', verifyUser, userController.deleteUser);

export default router;
