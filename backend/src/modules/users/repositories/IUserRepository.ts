import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

export default interface UserRepository {
   // [x] encontrar por e-mail
   // [x] create and save
   // [x] encontrar por ID
   // [x] atualizar user

   findById(id:string): Promise<User | undefined>;
   findByEmail(email:string): Promise<User | undefined>;
   create(data: ICreateUserDTO): Promise<User>;
   save(user: User): Promise<User>;

}
