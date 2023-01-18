import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserData = createParamDecorator(
  (_, ctx: ExecutionContext) => ctx.switchToHttp().getRequest().user
);