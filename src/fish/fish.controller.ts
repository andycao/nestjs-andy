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
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import {
  FileInterceptor,
  FileFieldsInterceptor,
  FilesInterceptor,
  AnyFilesInterceptor,
} from '@nestjs/platform-express';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiParam,
  ApiQuery,
  ApiProperty,
} from '@nestjs/swagger';
import { Express } from 'express';

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
@Controller('fish')
export class FishController {
  @Get()
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: CreateFishDto,
  })
  list(@Query() query): any {
    console.log(query);
    return [{ name: 'fish1', age: 1, ...query }];
  }

  @Get('detail/:id')
  @ApiParam({
    name: 'id',
    description: 'fish id to search',
    allowEmptyValue: false,
  })
  @ApiQuery({
    name: 'age',
    allowEmptyValue: false,
  })
  @ApiResponse({
    status: 200,
    type: CreateFishDto,
  })
  async detail(@Param() params) {
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

  // application/json body
  @Post('create')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
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
}
