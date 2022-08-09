import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CatController } from './controller/cats';
import { AppService } from './app.service';
import { FishController } from './fish/fish.controller';

@Module({
  imports: [],
  controllers: [AppController, CatController, FishController],
  providers: [AppService],
})
export class AppModule {}
