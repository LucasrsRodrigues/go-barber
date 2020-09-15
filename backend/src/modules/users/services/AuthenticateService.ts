import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUserRepository';

import User from '../infra/typeorm/entities/User';

interface Request {
   email: string;
   password: string;
}


class AuthenticateService{
   constructor(private usersRepository:IUsersRepository){}

   public async execute({email, password}:Request): Promise<{ user : User; token: string}>{

      const user = await this.usersRepository.findByEmail(email);

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
