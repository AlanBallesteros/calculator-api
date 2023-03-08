import { Repository } from 'typeorm';
import { User } from '../../../users/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export default class UserSeederService {
  /**
   *
   * @param {Repository<User>} usersRepository
   */
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(): Promise<User[]> {
    const password = await bcrypt.hash('p@ssword', 10);
    return this.usersRepository.save(
      [{ username: 'alanb@gmail.com', password, status: true }].map((user) =>
        this.usersRepository.create(user),
      ),
    );
  }
}
