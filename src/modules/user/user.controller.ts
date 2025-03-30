import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, FindUserResponseDto } from './user.dto';
import { ObjectIdValidationPipe } from 'src/shared/pipes/object-id-validation.pipe';

@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiCreatedResponse({
    type: String,
  })
  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @ApiOkResponse({
    type: FindUserResponseDto,
  })
  @Get(':id')
  findById(@Param('id', ObjectIdValidationPipe) id: string) {
    return this.userService.findUserById(id);
  }
}
