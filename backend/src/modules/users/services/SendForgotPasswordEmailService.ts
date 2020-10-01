import { injectable, inject } from 'tsyringe';
import path from 'path';


import IUsersRepository from '../repositories/IUsersRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import AppError from '@shared/errors/AppError';
import IUserTokenRepository from '../repositories/IUserTokenRepository';

interface Request{
   email: string;
}

@injectable()
class SendForgotPasswordEmailService{

   constructor(
      @inject('UsersRepository')
      private usersRepository:IUsersRepository,

      @inject('MailProvider')
      private mailProvider:IMailProvider,

      @inject('UserTokenRepository')
      private userTokenRepository: IUserTokenRepository
   ){}


   public async execute({ email }: Request): Promise<void>{
      const user = await this.usersRepository.findByEmail(email);

      if(!user){
         throw new AppError('User does not exists.');
      }

      const {token} = await this.userTokenRepository.generate(user.id);

      const forgotPasswordTemplate = path.resolve(
         __dirname,
         '..',
         'views',
         'forgot_password.hbs'
      );

      await this.mailProvider.sendMail({
         to: {
            name: user.name,
            email: user.email
         },
         subject: '[GoBarber] Recuperação de senha',
         templateData: {
            file: forgotPasswordTemplate,
            variables: {
               name: user.name,
               link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`
            }
         }
      });
   }
}

export default SendForgotPasswordEmailService;
