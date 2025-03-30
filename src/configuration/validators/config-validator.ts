import { BadRequestException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  validateSync,
} from 'class-validator';

class EnvironmentVariables {
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(65535)
  APP_PORT: number;

  @IsString()
  @IsNotEmpty()
  MONGO_URI: string;

  @IsNumber()
  @IsOptional()
  MONGO_RETRY_DELAY: number;

  @IsNumber()
  @IsOptional()
  MONGO_RETRY_ATTEMPTS: number;
}

export const configValidator = (config: Record<string, unknown>) => {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    const constraintsMatrix = errors.map(({ constraints }) =>
      Object.values(constraints),
    );

    throw new Error(
      `Some errors need to be fixed at env file configuration.\n${constraintsMatrix.toString()}`,
    );
  }
  return validatedConfig;
};
