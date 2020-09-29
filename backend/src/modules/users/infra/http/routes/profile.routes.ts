import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import ProfileController from '../controllers/ProfileController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';


const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAuthenticated);

profileRouter.get('/',profileController.show);
profileRouter.put('/',profileController.update);

export default profileRouter;
