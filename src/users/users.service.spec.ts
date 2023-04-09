import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './users.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { NotFoundException } from '@nestjs/common';
import { CreateUserInput } from './Inputs/user.input';
import { UserRole } from './user-role.enum';
import * as bcrypt from 'bcryptjs';

const user = new User();
user.id = '1';
user.firstName = 'aziz';
user.lastName = 'mezzi';
user.password = bcrypt.hash('password', 10);
user.email = 'azizmezzi@yahoo.fr';
user.role = UserRole.ADMIN;

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should get the user with the given ID', async () => {
    jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(user);

    const result = await userService.getUserById('1');

    expect(result).toEqual(user);
  });

  it('should throw NotFoundException when user is not found', async () => {
    jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(null);
    await expect(userService.getUserById('10')).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should get all users', async () => {
    jest.spyOn(userRepository, 'find').mockResolvedValue([user]);

    const result = await userService.getUsers();

    expect(result).toEqual([user]);
  });

  it('should create the user', async () => {
    const userToCreate: CreateUserInput = {
      firstName: 'aziz',
      lastName: 'mezzi',
      email: 'aziz@example.com',
      password: await bcrypt.hash('password', 10),
      role: UserRole.ADMIN,
    };

    const createdUser = new User();
    createdUser.id = '1';
    createdUser.firstName = 'aziz';
    createdUser.lastName = 'mezzi';
    createdUser.password = await bcrypt.hash('password', 10);
    createdUser.email = 'azizmezzi@yahoo.fr';
    createdUser.role = UserRole.ADMIN;

    jest.spyOn(userRepository, 'create').mockReturnValue(createdUser);
    jest.spyOn(userRepository, 'save').mockResolvedValue(createdUser);

    const result = await userService.createUser(userToCreate);

    expect(result).toEqual(createdUser);
  });

  it('should update the user with the given ID', async () => {
    const updatedUser = new User();
    updatedUser.id = '1';
    updatedUser.firstName = 'Jane';
    updatedUser.lastName = 'mezzi';
    updatedUser.password = bcrypt.hash('password', 10);
    updatedUser.email = 'azizmezzi@yahoo.fr';
    updatedUser.role = UserRole.ADMIN;

    jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(user);
    jest.spyOn(userRepository, 'save').mockResolvedValue(updatedUser);
    const result = await userService.updateUser('1', {
      firstName: 'Jane',
    });

    expect(result).toEqual(user);
  });
});
