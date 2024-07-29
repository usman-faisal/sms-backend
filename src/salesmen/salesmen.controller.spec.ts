import { Test, TestingModule } from '@nestjs/testing';
import { SalesmenController } from './salesmen.controller';
import { SalesmenService } from './salesmen.service';

describe('SalesmenController', () => {
  let controller: SalesmenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SalesmenController],
      providers: [SalesmenService],
    }).compile();

    controller = module.get<SalesmenController>(SalesmenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
