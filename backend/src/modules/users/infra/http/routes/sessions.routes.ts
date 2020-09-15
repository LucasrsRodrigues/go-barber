import { Router } from 'express';

import AuthenticateService from '@modules/users/services/AuthenticateService';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

const sessionsRouter = Router();


sessionsRouter.post('/',async ( req, res )=>{
      const {email, password} = req.body;

      const userRepository = new UsersRepository();

      const authenticateUser = new AuthenticateService(userRepository);

      const { user, token } = await authenticateUser.execute({
         email,
         password
      });

      delete user.password;

      return res.json({ user, token });


});


export default sessionsRouter;
