import { applyDecorators, SetMetadata, UseInterceptors } from '@nestjs/common';
import { TimeoutInterceptor } from 'src/interceptors/timeout.intereceptor';

const SetTimeout = (timeout: number) => SetMetadata('request-timeout', timeout);

export function SetRequestTimeout(timeout: number = 60000) {
  return applyDecorators(
    SetTimeout(timeout),
    UseInterceptors(TimeoutInterceptor),
  );
}
