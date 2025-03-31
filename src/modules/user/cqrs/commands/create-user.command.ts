import { UserAggregate } from '../aggregates/user.aggregate';

export interface ICreateUser {
  username: string;
  email: string;
  password: string;
  name: string;
  age: number;
}

export class CreateUserCommand {
  constructor(public readonly user: ICreateUser) {}
}
