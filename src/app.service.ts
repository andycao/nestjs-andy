import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  calcRes(a: number, b: number): number {
    return a * b;
  }
}
