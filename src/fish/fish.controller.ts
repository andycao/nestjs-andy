import {
  Controller,
  Post,
  Get,
  Query,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

export class CreateFishDto {
  name: string;
  age: number;
}

import { Express } from 'express';

@Controller('fish')
export class FishController {
  @Get()
  list(@Query() query): any {
    console.log(query);
    return [{ name: 'fish1', age: 1, ...query }];
  }

  @Get('detail/:id')
  async info(@Param() params) {
    console.log(params);
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          ...params,
          name: 'fish detail',
        });
      }, 1000);

      setTimeout(() => {
        reject({
          error: 'cuo wu',
        });
      }, 500);
    });
    return promise;
  }

  @Post('create')
  create(@Body() createCatDto: CreateFishDto) {
    console.log(createCatDto);
    return {
      code: 0,
      msg: 'success',
      data: {
        ...createCatDto,
      },
    };
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  upload(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 900000 }),
          new FileTypeValidator({ fileType: 'jpeg' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body() body,
  ) {
    console.log(file, body);
    if (file) {
      return {
        code: 0,
        msg: 'success',
        data: {
          ...body,
        },
      };
    } else {
      return { code: 1, msg: 'error' };
    }
  }
}
