import { Router } from 'express';

import appointments from './appointments.routes';
import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

routes.use('/appointments', appointments);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);


export default routes;
