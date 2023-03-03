import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { FiltersArgsDto } from 'src/dto/filters-args.dto';
import { hashPassword } from 'src/utils';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { username, password } = createUserDto;
    const hashedPassword = await hashPassword(password);
    const user = this.userRepository.create({
      username,
      password: hashedPassword,
      status: true,
    });

    await this.userRepository.save(user);
    return user;
  }

  async findAll(filtersDto: FiltersArgsDto): Promise<User[]> {
    const query = this.userRepository.createQueryBuilder('user');
    const users = await query.getMany();
    return users;
  }

  async findOne(id: number): Promise<User> {
    const found = await this.userRepository.findOneBy({ id });

    if (!found) {
      throw new NotFoundException();
    }

    return found;
  }
  async findOneByUsername(username: string): Promise<User> {
    const found = await this.userRepository.findOneBy({ username });

    if (!found) {
      throw new NotFoundException();
    }

    return found;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const { status } = updateUserDto;
    const user = await this.findOne(id);
    user.status = status;
    await this.userRepository.save(user);
    return user;
  }

  async remove(id: number): Promise<void> {
    const result = await this.userRepository.softDelete(id);
    if (!result.affected) {
      throw new NotFoundException();
    }
  }
}
