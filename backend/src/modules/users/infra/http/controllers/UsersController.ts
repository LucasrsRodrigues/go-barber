import { Response, Request } from "express";
import { container } from 'tsyringe';


import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import CreateUserService from '@modules/users/services/CreateUserService';

export default class UsersController{

   public async create(request: Request, response: Response): Promise<Response>{
      const {name, email, password} = request.body;

      const createUser = container.resolve(CreateUserService);

      const user = await createUser.execute({
         name,
         email,
         password
      });

      delete user.password;

      return response.json(user);
   }
}
