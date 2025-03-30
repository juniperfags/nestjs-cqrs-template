import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { CqrsModule } from '@nestjs/cqrs';
import { UserRepository } from './user.repository';

import { CreateUserEventHandler } from './cqrs/events/create-user-event.handler';
import { UserController } from './user.controller';
import { User, UserSchema } from './schema/user.schema';
import { CreateUserCommandHandler } from './cqrs/handlers/create-user.handler';
import { FindUserByIdHandler } from './cqrs/handlers/find-user-by-id.handler';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [
    UserService,
    UserRepository,
    CreateUserCommandHandler,
    CreateUserEventHandler,
    FindUserByIdHandler,
  ],
  controllers: [UserController],
})
export class UserModule {}
