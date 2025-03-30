import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ObjectIdValidationPipe implements PipeTransform {
  async transform(value: string) {
    if (!isValidObjectId(value)) {
      throw new BadRequestException(`Value ${value} is not a valid objectID`);
    }
    return value;
  }
}
