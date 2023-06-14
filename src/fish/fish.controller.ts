import {
  Controller,
  Post,
  Get,
  Query,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  Delete,
  All,
  Headers,
  Put,
  Redirect,
} from '@nestjs/common';
import { FileInterceptor, AnyFilesInterceptor } from '@nestjs/platform-express';

import {
  ApiBearerAuth,
  ApiResponse,
  ApiTags,
  ApiParam,
  ApiQuery,
  ApiProperty,
  ApiHeader,
} from '@nestjs/swagger';
import { Express } from 'express';

const fishs = require('./fishs.json');

export class CreateFishDto {
  @ApiProperty({
    description: 'fish name',
  })
  name: string;
  @ApiProperty({
    description: 'fish age',
  })
  age: number;
}

@ApiBearerAuth()
@ApiTags('fish')
@Controller({
  path: 'fish',
  host: 'localhost',
})
export class FishController {
  @Get()
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: CreateFishDto,
  })
  list(@Query() query): any {
    console.log(query);
    return fishs;
  }

  @All('detail/:id')
  @ApiParam({
    name: 'id',
    description: 'fish id to search',
    allowEmptyValue: false,
  })
  @ApiResponse({
    status: 200,
    type: CreateFishDto,
  })
  @ApiHeader({
    name: 'test-header',
  })
  async detail(@Param() params, @Headers() headers) {
    const name = headers['test-header'];
    console.log(params, name);

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
      }, 1000);
    });
    return promise;
  }

  // application/json body
  @Post('create')
  @ApiResponse({
    status: 201,
    type: 'created',
    description: 'The record has been successfully created.',
  })
  @ApiHeader({
    name: 'test-header',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
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

  @Post('form')
  @UseInterceptors(AnyFilesInterceptor())
  formSubmit(@Body() createCatDto: CreateFishDto, @UploadedFiles() files) {
    console.log(createCatDto, files);
    return {
      code: 0,
      msg: 'success',
      data: {
        ...createCatDto,
        msg: 'is this cool',
      },
    };
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file: Express.Multer.File, @Body() body) {
    console.log(file, body);
    return {
      code: 0,
      msg: 'success',
      data: {
        ...body,
      },
    };
  }

  @Delete('delete')
  delete() {
    return {
      code: 0,
      message: 'success',
    };
  }

  @Put('put')
  update() {
    return {
      code: 0,
      message: 'success',
    };
  }

  @Get('jump')
  @Redirect('https://nestjs.com')
  jumpToNest() {
    return {
      // return 的参数 override redirect 装饰器
      url: 'https://baidu.com',
    };
  }
  @Get('asyncGet')
  async findFish(): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          name: 'fish1',
          age: Math.random(),
        });
      }, 500);
    });
  }
}
