import { Test, TestingModule } from '@nestjs/testing';
import { SysconfigService } from './sysconfig.service';
import { PrismaService } from '../../services/prisma/prisma.service';

const mockPrismaService = {
  sysconfig: {
    findUnique: jest.fn(),
    upsert: jest.fn(),
    delete: jest.fn(),
    findMany: jest.fn(),
  },
};

describe('SysconfigService', () => {
  let service: SysconfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SysconfigService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<SysconfigService>(SysconfigService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('get() calls findUnique with the correct key', () => {
    service.get('theme');
    expect(mockPrismaService.sysconfig.findUnique).toHaveBeenCalledWith({
      where: { key: 'theme' },
    });
  });

  it('set() calls upsert with correct payload', () => {
    service.set('theme', { mode: 'dark' });
    expect(mockPrismaService.sysconfig.upsert).toHaveBeenCalledWith({
      where: { key: 'theme' },
      update: { value: { mode: 'dark' } },
      create: { key: 'theme', value: { mode: 'dark' } },
    });
  });

  it('delete() calls delete with the correct key', () => {
    service.delete('theme');
    expect(mockPrismaService.sysconfig.delete).toHaveBeenCalledWith({
      where: { key: 'theme' },
    });
  });

  it('getAll() calls findMany', () => {
    service.getAll();
    expect(mockPrismaService.sysconfig.findMany).toHaveBeenCalled();
  });
});
