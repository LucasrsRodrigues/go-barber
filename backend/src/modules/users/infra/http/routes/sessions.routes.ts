import { Router } from 'express';
import { container } from 'tsyringe';

import AuthenticateService from '@modules/users/services/AuthenticateService';

const sessionsRouter = Router();


sessionsRouter.post('/',async ( req, res )=>{

      const {email, password} = req.body;


      const authenticateUser = container.resolve(AuthenticateService);

      const { user, token } = await authenticateUser.execute({
         email,
         password
      });

      delete user.password;

      return res.json({ user, token });


});


export default sessionsRouter;