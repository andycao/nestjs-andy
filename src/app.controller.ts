import { Request } from 'express';
import { Controller, Get, Req, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('calc')
  calcRes(@Query() query): string {
    const { a, b } = query;
    return this.appService.calcRes(Number(a), Number(b)) + '';
  }
}
