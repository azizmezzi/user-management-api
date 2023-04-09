import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserResolver } from './users.resolver';
import { UserService } from './users.service';

@Module({
  providers: [UserResolver, UserService],
  imports: [TypeOrmModule.forFeature([User])],
})
export class UsersModule {}
