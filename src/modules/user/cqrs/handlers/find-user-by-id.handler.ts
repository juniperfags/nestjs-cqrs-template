import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindUserByIdQuery } from '../queries/find-user-by-id.query';
import { UserRepository } from '../../user.repository';

@QueryHandler(FindUserByIdQuery)
export class FindUserByIdHandler implements IQueryHandler<FindUserByIdQuery> {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(query: FindUserByIdQuery): Promise<any> {
    const response = await this.userRepo.findUserById(query.userId);
    return response;
  }
}
