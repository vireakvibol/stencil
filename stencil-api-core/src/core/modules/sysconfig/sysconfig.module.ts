import { Module } from '@nestjs/common';
import { SysconfigService } from './sysconfig.service';
import { PrismaService } from '../../services/prisma/prisma.service';

@Module({
  providers: [SysconfigService, PrismaService],
  exports: [SysconfigService],
})
export class SysconfigModule {}
