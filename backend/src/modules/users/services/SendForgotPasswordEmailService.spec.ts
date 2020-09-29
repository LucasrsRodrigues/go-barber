import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUserTokenRepository from '../repositories/fakes/FakeUserTokenRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';


let fakeUserRepository:FakeUsersRepository;
let fakeUserTokenRepository:FakeUserTokenRepository;
let fakeMailProvider:FakeMailProvider;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;


describe('SendForgotPasswordEmail',() => {
   beforeEach(() => {
      fakeUserRepository = new FakeUsersRepository();
      fakeMailProvider = new FakeMailProvider();
      fakeUserTokenRepository = new FakeUserTokenRepository;

      sendForgotPasswordEmail = new SendForgotPasswordEmailService(
         fakeUserRepository,
         fakeMailProvider,
         fakeUserTokenRepository
      );
   });




   it('should be able to recover the password using the email', async () => {

      const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

      await fakeUserRepository.create({
         name: 'John Doe',
         email: 'johndoe@example.com',
         password: '123456'
      });

      await sendForgotPasswordEmail.execute({
         email: 'johndoe@example.com',
      });

      await expect(sendMail).toHaveBeenCalled();

   });

   it('should not be able to recover a non-existing user password', async () => {
      await expect(
         sendForgotPasswordEmail.execute({
            email: 'johndoe@example.com',
         }),
      ).rejects.toBeInstanceOf(AppError);
   })

   it('should generate a forgot password token', async ()=> {
      const generateToken = jest.spyOn(fakeUserTokenRepository, 'generate');

      const user = await fakeUserRepository.create({
         name: 'John Doe',
         email: 'johndoe@example.com',
         password: '123456'
      });

      await sendForgotPasswordEmail.execute({
         email: 'johndoe@example.com',
      });

      await expect(generateToken).toHaveBeenCalledWith(user.id);
   });

});


