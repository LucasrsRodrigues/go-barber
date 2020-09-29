import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokenRepository from '../repositories/fakes/FakeUserTokenRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import ResetPasswordService from './ResetPasswordService';


let fakeUserRepository:FakeUsersRepository;
let fakeUserTokenRepository:FakeUserTokenRepository;
let fakeHashProvider: FakeHashProvider;
let resetPassword: ResetPasswordService;

describe('ResetPasswordService',() => {
   beforeEach(() => {
      fakeUserRepository = new FakeUsersRepository();
      fakeUserTokenRepository = new FakeUserTokenRepository;
      fakeHashProvider = new FakeHashProvider;

      resetPassword = new ResetPasswordService(
         fakeUserRepository,
         fakeUserTokenRepository,
         fakeHashProvider
      );
   });


   it('should be able to reset the password', async () => {


      const user = await fakeUserRepository.create({
         name: 'John Doe',
         email: 'johndoe@example.com',
         password: '123456'
      });

      const { token } = await fakeUserTokenRepository.generate(user.id);

      const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');



      await resetPassword.execute({
         password: '123123',
         token
      });

      const updatedUser = await fakeUserRepository.findById(user.id);

      expect(generateHash).toHaveBeenCalledWith('123123');
      expect(updatedUser?.password).toBe('123123');

   });

   it('should not be able to reset the password with non-existing token', async() => {
      await expect(
         resetPassword.execute({
            token: 'non-existing-token',
            password: '123456'
         })
      ).rejects.toBeInstanceOf(AppError);
   });

   it('should not be able to reset the password with non-existing user', async() => {
      const { token } = await fakeUserTokenRepository.generate(
         'non-existing-user'
      );

      await expect(
         resetPassword.execute({
            token,
            password: '123456'
         })
      ).rejects.toBeInstanceOf(AppError);
   });

   it('should not be able to reset password if passed more than 2 hours', async () => {
      const user = await fakeUserRepository.create({
         name: 'John Doe',
         email: 'johndoe@example.com',
         password: '123456'
      });

      const { token } = await fakeUserTokenRepository.generate(user.id);

      jest.spyOn(Date, 'now').mockImplementationOnce(() => {
         const customDate = new Date();

         return customDate.setHours(customDate.getHours() + 3);
      });

      await expect(
         resetPassword.execute({
            password: '123123',
            token
         })
      ).rejects.toBeInstanceOf(AppError);


   });

});


