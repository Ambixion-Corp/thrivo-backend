import { Module } from '@nestjs/common';
import { EscrowService } from './escrow.service';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [EscrowService, PrismaService],
  exports: [EscrowService],
})
export class EscrowModule {}
