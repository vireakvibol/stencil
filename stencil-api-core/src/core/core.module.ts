import { Module } from '@nestjs/common';
import { PrismaService } from './services/prisma/prisma.service';
import { SysconfigModule } from './modules/sysconfig/sysconfig.module';

@Module({
  providers: [PrismaService],
  imports: [SysconfigModule],
  exports: [PrismaService, SysconfigModule]
})
export class CoreModule {}
