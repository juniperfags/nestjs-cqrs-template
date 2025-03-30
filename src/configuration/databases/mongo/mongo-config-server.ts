import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';

interface IMongooseConfig {
  uri: string;
  retryAttempts: number;
  retryDelay: number;
}

@Injectable()
export class MongoConfigurationServer implements MongooseOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createMongooseOptions(): MongooseModuleOptions {
    const mongooseOptions =
      this.configService.getOrThrow<IMongooseConfig>('database.mongo');

    return mongooseOptions;
  }
}
