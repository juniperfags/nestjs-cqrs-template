import { AggregateRoot } from '@nestjs/cqrs';
import { CreateUserEvent } from '../events/create-user.event';

export class UserAggregate extends AggregateRoot {
  constructor() {
    super();
  }
  logger(id: string) {
    //You can add customized events btw...
    this.apply(new CreateUserEvent(id));
  }
}
