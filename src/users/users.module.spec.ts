import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserResolver } from './users.resolver';
import { UserService } from './users.service';
import { UsersModule } from './users.module';

describe('UsersModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        UsersModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: 'postgres',
          database: 'Users',
          entities: [User],
          synchronize: false,
        }),
      ],
    }).compile();
  });

  it('should import the TypeOrmModule', () => {
    expect(module.get(TypeOrmModule)).toBeDefined();
  });

  it('should provide the UserResolver', () => {
    expect(module.get(UserResolver)).toBeDefined();
  });

  it('should provide the UserService', () => {
    expect(module.get(UserService)).toBeDefined();
  });
});
