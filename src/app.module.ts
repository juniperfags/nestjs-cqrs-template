import { CacheModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { MongoConfigurationServer } from './configuration/databases/mongo/mongo-config-server';
import source from './configuration/source';
import { configValidator } from './configuration/validators/config-validator';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: configValidator,
      envFilePath: process.env.NODE_ENV
        ? `.env.${process.env.NODE_ENV}`
        : `.env`,
      load: [source],
    }),
    MongooseModule.forRootAsync({
      useClass: MongoConfigurationServer,
    }),
    UserModule,
  ],
})
export class AppModule {}
