import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserInput } from './Inputs/user.input';
import { UpdateUserInput } from './Inputs/user-update.input';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  /**
   * get the user with a given id
   * @param id : given id of the user
   * @returns user founded
   */
  async getUserById(id: string): Promise<User> {
    const found = await this.userRepository.findOneBy({ id });
    if (!found) throw new NotFoundException('user not found');
    return found;
  }
  /**
   * get all users in the database
   * @returns list of users
   */
  getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }
  /**
   * create a user
   * @param createUserInput input needed to create a user
   * @returns user created
   */
  async createUser(createUserInput: CreateUserInput): Promise<User> {
    const { firstName, lastName, email, password, role } = createUserInput;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
    });
    return this.userRepository.save(user);
  }
  /**
   * doing an update on a given user (by id)
   * @param id : id to get a user
   * @param data : data given to be updated in the user
   * @returns user updated
   */
  async updateUser(id: string, data: UpdateUserInput): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (data.firstName) {
      user.firstName = data.firstName;
    }

    if (data.lastName) {
      user.lastName = data.lastName;
    }

    if (data.email) {
      user.email = data.email;
    }

    if (data.password) {
      user.password = await bcrypt.hash(data.password, 10);
    }

    if (data.role) {
      user.role = data.role;
    }

    return this.userRepository.save(user);
  }
}
