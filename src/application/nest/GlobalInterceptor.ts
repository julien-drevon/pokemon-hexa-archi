import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  LoggerService,
  NestInterceptor
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class GlobalInterceptor implements NestInterceptor {
  constructor(@Inject('logger') private readonly logger: LoggerService) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>
  ): Observable<any> | Promise<Observable<any>> {
    this.logger.log(context);
    return next.handle().pipe(tap((n) => this.logger.log(n)));
  }
}
