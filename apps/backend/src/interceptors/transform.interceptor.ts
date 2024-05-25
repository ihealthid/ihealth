import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';

export interface Response<T> {
  data: T;
}

export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<any> | Promise<Observable<any>> {
    const message = this.getMessage(context);
    const { name } = context.getHandler();

    if (name.includes('export')) {
      return next.handle();
    }

    return next
      .handle()
      .pipe(map((data) => ({ ...this.getData(context, data), message })));
  }

  private getData<T>(context: ExecutionContext, data: T) {
    const { name } = context.getHandler();
    if (name.includes('paginate') || name.includes('pagination')) {
      if (typeof data[0] === 'number') {
        return {
          total: data[0],
          data: data[1],
        };
      } else {
        return {
          total: data[1],
          data: data[0],
        };
      }
    }

    if (name === 'get') {
      return data;
    }

    return { data };
  }

  private getMessage(context: ExecutionContext) {
    const { name } = context.getHandler();
    if (name.includes('delete')) {
      return 'Data delete successfully';
    }

    if (name.includes('update')) {
      return 'Data update successfully';
    }

    if (name.includes('find')) {
      return 'Data found';
    }

    if (name.includes('create')) {
      return 'Data created successfully';
    }

    return 'Success';
  }
}
