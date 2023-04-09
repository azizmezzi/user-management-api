import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { UserRole } from '../user-role.enum';

@InputType()
export class CreateUserInput {
  @IsNotEmpty()
  @Field()
  firstName: string;

  @IsNotEmpty()
  @Field()
  lastName: string;

  @IsNotEmpty()
  @Field()
  email: string;

  @IsNotEmpty()
  @Field()
  password: string;

  @IsNotEmpty()
  @Field()
  role: UserRole;
}
