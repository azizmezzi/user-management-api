import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { CreateUserInput } from './Inputs/user.input';
import { UserService } from './users.service';
import { UserType } from './users.type';
import { UpdateUserInput } from './Inputs/user-update.input';

@Resolver((of) => UserType)
export class UserResolver {
  constructor(private userService: UserService) {}
  /**
   * Query to get a user
   * @param id : given id to get a user
   * @returns user selected
   */
  @Query((returns) => UserType)
  user(@Args('id') id: string): Promise<User> {
    return this.userService.getUserById(id);
  }
  /**
   * Query to get all the users
   * @returns list of all users
   */
  @Query((returns) => [UserType])
  users(): Promise<User[]> {
    return this.userService.getUsers();
  }
  /**
   * Mutation to create a user
   * @param createUserInput user input to be created
   * @returns user created
   */
  @Mutation((returns) => UserType)
  createUser(@Args('CreateUserInput') createUserInput: CreateUserInput) {
    return this.userService.createUser(createUserInput);
  }
  /**
   * Mutation to update a given user
   * @param id : id to select a user
   * @param data : data to update the user
   * @returns updated user
   */
  @Mutation((returns) => UserType)
  updateUser(
    @Args('id') id: string,
    @Args('data') data: UpdateUserInput,
  ): Promise<User> {
    return this.userService.updateUser(id, data);
  }
}
