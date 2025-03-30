import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../commands/create-user.command';
import { UserRepository } from '../../user.repository';
import { UserAggregate } from '../aggregates/user.aggregate';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler
  implements ICommandHandler<CreateUserCommand>
{
  constructor(
    private userRepo: UserRepository,
    private publisher: EventPublisher,
  ) {}
  async execute({ user }: CreateUserCommand): Promise<string> {
    const UserPublisher = this.publisher.mergeClassContext(UserAggregate);

    const userId = await this.userRepo.create(user);

    const publisher = new UserPublisher();

    publisher.logger(userId);

    publisher.commit();

    return userId;
  }
}
