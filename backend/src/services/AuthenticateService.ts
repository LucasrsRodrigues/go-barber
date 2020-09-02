import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';

import AppError from '../errors/AppError';

import User from '../models/User';

interface Request {
   email: string;
   password: string;
}


class AuthenticateService{
   public async execute({email, password}:Request): Promise<{ user : User; token: string}>{
      const userRepository = getRepository(User);

      const user = await userRepository.findOne({
         where: {email}
      });

      if(!user){
         throw new AppError('Incorrect email/password combination.', 401);
      }

      const passwordMatched = await compare(password, user.password);

      if(!passwordMatched){
         throw new AppError('Incorrect email/password combination.', 401);
      }

      const {secret, expiresIn} = authConfig.jwt;

      const token = sign({  }, secret, {
         subject: user.id,
         expiresIn,
      });

      return {user, token};
   }
}

export default AuthenticateService;
