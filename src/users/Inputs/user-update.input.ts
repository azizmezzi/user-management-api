import { InputType, Field } from '@nestjs/graphql';
import { UserRole } from '../user-role.enum';

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  password?: string;

  @Field({ nullable: true })
  role?: UserRole;
}
