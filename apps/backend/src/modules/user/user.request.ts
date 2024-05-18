import { IsNumber, IsString, MinLength } from 'class-validator';

export class UserCreateRequest {
  @IsString()
  username: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  fullName: string;

  @IsNumber(
    {},
    {
      each: true,
    },
  )
  roles: number[];
}
