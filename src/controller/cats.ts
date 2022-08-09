import { Request } from 'express';
import { Controller, Get, Req } from '@nestjs/common';

type Cat = {
  name: string;
  age: number;
};

@Controller('cat')
export class CatController {
  @Get()
  index() {
    return this.getCats();
  }

  @Get('list')
  getCats(): Array<Cat> {
    return [
      {
        name: 'cat1',
        age: 2,
      },
    ];
  }
}
