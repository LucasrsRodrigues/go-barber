import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';
import authConfig from '@config/auth';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUserRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import User from '../infra/typeorm/entities/User';

interface Request {
   email: string;
   password: string;
}

@injectable()
class AuthenticateService{
   constructor(
      @inject('UsersRepository')
      private usersRepository:IUsersRepository,

      @inject('HashProvider')
      private hashProvider: IHashProvider
   ){}

   public async execute({email, password}:Request): Promise<{ user : User; token: string}>{

      const user = await this.usersRepository.findByEmail(email);

      if(!user){
         throw new AppError('Incorrect email/password combination.', 401);
      }

      const passwordMatched = await this.hashProvider.compareHash(password, user.password);

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
