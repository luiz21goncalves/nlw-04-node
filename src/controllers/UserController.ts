import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import { UsersRepository } from '../repositories/UsersRepository';
import { CreateUserService } from '../services/CreateUserService';

class UserController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;

    const usersRepository = getCustomRepository(UsersRepository);

    try {
      const createUser = new CreateUserService(usersRepository);

      const user = await createUser.execute({ name, email });

      await usersRepository.save(user);

      return response.status(201).json(user);
    } catch (error) {
      return response.status(400).json({
        message: error.message ?? 'Unexpected error',
      });
    }
  }
}

export { UserController };
