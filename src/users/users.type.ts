import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserRole } from './user-role.enum';

@ObjectType('User')
export class UserType {
  @Field((type) => ID)
  id: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  role: UserRole;
}
