import { Test } from '@nestjs/testing';
import { UserResolver } from './users.resolver';
import { UserService } from './users.service';
import { CreateUserInput } from './Inputs/user.input';
import { UpdateUserInput } from './Inputs/user-update.input';
import { User } from './entities/user.entity';
import { UserRole } from './user-role.enum';
import * as bcrypt from 'bcryptjs';

const user = new User();
user.id = '1';
user.firstName = 'aziz';
user.lastName = 'mezzi';
user.password = bcrypt.hash('password', 10);
user.email = 'azizmezzi@yahoo.fr';
user.role = UserRole.ADMIN;

describe('UserResolver', () => {
  let userResolver: UserResolver;
  let userService: UserService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UserResolver,
        {
          provide: UserService,
          useValue: {
            getUserById: jest.fn(),
            getUsers: jest.fn(),
            createUser: jest.fn(),
            updateUser: jest.fn(),
          },
        },
      ],
    }).compile();

    userResolver = moduleRef.get<UserResolver>(UserResolver);
    userService = moduleRef.get<UserService>(UserService);
  });

  describe('users', () => {
    it('should return an array of users', async () => {
      const users: User[] = [user];

      jest.spyOn(userService, 'getUsers').mockResolvedValue(users);

      const result = await userResolver.users();

      expect(result).toEqual(users);

      expect(userService.getUsers).toHaveBeenCalled();
    });

    it('should get user with a given ID', async () => {
      jest.spyOn(userService, 'getUserById').mockResolvedValue(user);

      const result = await userResolver.user('1');

      expect(result).toEqual(user);

      expect(userService.getUserById).toHaveBeenCalled();
    });
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const createUserInput: CreateUserInput = {
        firstName: 'aziz',
        lastName: 'mezzi',
        email: 'azizmezzi@yahoo.fr',
        password: bcrypt.hash('password', 10),
        role: UserRole.ADMIN,
      };

      jest.spyOn(userService, 'createUser').mockResolvedValue(user);

      const result = await userResolver.createUser(createUserInput);

      expect(result).toEqual(user);
    });
  });

  describe('updateUser', () => {
    it('should update an existing user', async () => {
      const id = '1';
      const updateUserInput: UpdateUserInput = {
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'janedoe@example.com',
        password: bcrypt.hash('newpassword', 10),
        role: UserRole.USER,
      };

      jest.spyOn(userService, 'updateUser').mockResolvedValue(user);

      const result = await userResolver.updateUser(id, updateUserInput);

      expect(result).toEqual(user);
    });
  });
});
