import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getEvents(): string {
    return 'Hello World!';
  }
}
