import { Router } from 'express';

import SessionsController from '../controllers/SessionsController';

const sessionsRouter = Router();
const sessiosnControler = new SessionsController();

sessionsRouter.post('/', sessiosnControler.create);


export default sessionsRouter;
