import FakeStorageProvider from "@shared/container/providers/StorageProvider/fakes/FakeStorageProvider";
import AppError from "@shared/errors/AppError";
import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import UpdatedUserAvatarService from './UpdateUserAvatarService';

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatar: UpdatedUserAvatarService;

describe('UpdatedUserAvatar', () => {
   beforeEach(() => {
      fakeUsersRepository = new FakeUsersRepository();
      fakeStorageProvider = new FakeStorageProvider();

      updateUserAvatar = new UpdatedUserAvatarService(
         fakeUsersRepository,
         fakeStorageProvider
      );
   });

   it('should be able user upload a new avatar', async () =>{

      const user = await fakeUsersRepository.create({
         name: 'John Doe',
         email: 'johndoe@example.com',
         password: '123456'
      })
      await updateUserAvatar.execute({
         user_id: user.id,
         avatarFilename: 'avatar.jpg'
      });

      await expect(user.avatar).toBe('avatar.jpg');
   });

   it('should not be able to update avatar from non existing user', async () =>{
      await expect(updateUserAvatar.execute({
         user_id: 'non-exists-user',
         avatarFilename: 'avatar.jpg'
      })).rejects.toBeInstanceOf(AppError);
   });


   it('should delete old avatar when updating new one', async () =>{

      const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');
      const user = await fakeUsersRepository.create({
         name: 'John Doe',
         email: 'johndoe@example.com',
         password: '123456',
      })
      await updateUserAvatar.execute({
         user_id: user.id,
         avatarFilename: 'avatar.jpg'
      });

      await updateUserAvatar.execute({
         user_id: user.id,
         avatarFilename: 'avatar2.jpg'
      });

      await expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
      await expect(user.avatar).toBe('avatar2.jpg');
   });

});
