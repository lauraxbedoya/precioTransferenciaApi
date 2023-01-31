import { IsNotEmpty, IsEnum, ValidateIf, NotEquals, IsOptional, IsEmail, IsString, MinLength, Validate } from 'class-validator';
import { UniqueFields } from './unique-fields.guard';
import { UserCreatedFrom, UserRole } from './user.enum';

export class UpdateUserDto {

  @IsString()
  @MinLength(3)
  @ValidateIf((object, value) => value !== undefined)
  @IsOptional()
  name?: string;

  @IsString()
  @MinLength(3)
  @IsOptional()
  lastName?: string;

  @IsString({ message: 'Debe ser string' })
  @IsEmail()
  @ValidateIf((object, value) => value !== undefined)
  @NotEquals(null)
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  @ValidateIf((object, value) => value !== undefined)
  password?: string;

  @IsEnum(UserRole)
  @IsOptional()
  @ValidateIf((object, value) => value !== undefined)
  role?: UserRole;
}


export class CreateUserDto {

  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  name: string;

  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @Validate(UniqueFields, ['email'])
  email: string;

  @IsString()
  @IsOptional()
  password: string;

  @IsEnum(UserRole)
  @IsOptional()
  @IsNotEmpty()
  role: UserRole.Customer;

  @IsString()
  createdFrom: UserCreatedFrom.SignUp;
}

export class CreateUserShouldDeclareDto {

  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @Validate(UniqueFields, ['email'])
  email: string;

  @IsString()
  createdFrom: UserCreatedFrom;

}