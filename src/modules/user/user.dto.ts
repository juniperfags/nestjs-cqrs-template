import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class UserDto {
  @ApiProperty()
  @MinLength(8)
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @MinLength(8)
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  age: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class CreateUserDto extends UserDto {}
export class FindUserResponseDto extends UserDto {
  @ApiProperty()
  _id: string;
}

export class FindUserParamDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id: string;
}
