//Core
import { Test, TestingModule } from '@nestjs/testing';
//Services
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma/prisma.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, PrismaService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  let name = 'test';
});
