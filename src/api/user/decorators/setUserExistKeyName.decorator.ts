import { SetMetadata } from '@nestjs/common';

export const SetUserExistKeyName = (keyName: string) => SetMetadata('keyName', keyName);