import { injectable, inject } from 'tsyringe';

// import AppError from '@shared/errors/AppError';

// import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUserRepository';
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

      await this.userTokenRepository.generate(user.id);


      this.mailProvider.sendMail(
         email,
         'Pedido de recuperacoa de senha recebido'
      );
   }
}

export default SendForgotPasswordEmailService;
