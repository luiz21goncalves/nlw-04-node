import { Repository } from 'typeorm';

import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { User } from '../entities/User';

class CreateUserService {
  constructor(
    private usersRepository: Repository<User>,
  ) {}

  async execute({ name, email }: ICreateUserDTO): Promise<User> {
    const userAlreadyExists = await this.usersRepository.findOne({
      where: { email },
    });

    if (userAlreadyExists) {
      throw new Error('User already exists!');
    }

    const user = this.usersRepository.create({
      name,
      email,
    });

    await this.usersRepository.save(user);

    return user;
  }
}

export { CreateUserService };
