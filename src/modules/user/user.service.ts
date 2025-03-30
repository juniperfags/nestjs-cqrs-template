import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { CreateUserCommand } from './cqrs/commands/create-user.command';
import { FindUserByIdQuery } from './cqrs/queries/find-user-by-id.query';
import { CreateUserDto, FindUserResponseDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  async createUser(createUser: CreateUserDto) {
    const response = await this.commandBus.execute<CreateUserCommand, string>(
      new CreateUserCommand(createUser),
    );
    return { message: 'New user created', response };
  }
  async findUserById(userId: string) {
    const { _id } = await this.queryBus.execute<
      FindUserByIdQuery,
      FindUserResponseDto
    >(new FindUserByIdQuery(userId));
    return _id;
  }
}
