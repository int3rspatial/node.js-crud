import Router from 'express';
import postController from '../controllers/postController.js';

const router = new Router();

//API routs
router.post('/', postController.createPost);
router.get('/', postController.giveAllPosts);
router.get('/:id', postController.giveOnePost);
router.put('/:id', postController.updateInfoAboutPost);
router.delete('/:id', postController.deletePost);

export default router;
