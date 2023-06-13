import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();
  });

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      const appController = app.get<AppController>(AppController);

      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  describe('calc tests', () => {
    it('2 * 3 should return 6', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.calcRes({ a: 2, b: 3 })).toBe('6');
    });
    it('0 * 100 should return 0', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.calcRes({ a: 0, b: 100 })).toBe('0');
    });
  });
});
