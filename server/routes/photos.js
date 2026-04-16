import { Router } from 'express';
import { getPhotos, getPhoto, createPhoto, updatePhoto, deletePhoto } from '../controllers/photoController.js';
import auth from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = Router();

router.get('/', getPhotos);
router.get('/:id', getPhoto);
router.post('/', auth, upload.single('image'), createPhoto);
router.put('/:id', auth, updatePhoto);
router.delete('/:id', auth, deletePhoto);

export default router;
