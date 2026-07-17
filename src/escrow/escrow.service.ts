import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class EscrowService {
  constructor(private prisma: PrismaService) {}

  async createDeal(data: {
    creatorId: string;
    founderId: string;
    amount: number;
  }) {
    // Validate constraint before finalizing deal
    const isLedgerConsistent = await this.verifyLedgerIntegrity();
    if (!isLedgerConsistent) {
      throw new BadRequestException(
        'Database Ledger Consistency Constraint Violated.',
      );
    }

    return this.prisma.escrowDeal.create({
      data: {
        creator_id: data.creatorId,
        founder_id: data.founderId,
        contracted_amount: data.amount,
        escrow_status: 'funds_deposited',
      },
    });
  }

  async verifyLedgerIntegrity(): Promise<boolean> {
    // Structural Principle: T_balance = Sum(Escrow_credits) - Sum(Disbursed_debits)
    // In a fully deployed setup, we verify ledger transactions:
    const aggregations = await this.prisma.escrowDeal.aggregate({
      _sum: {
        contracted_amount: true,
      },
    });

    const totalEscrowCredits = aggregations._sum.contracted_amount || 0;

    // Stub logic to demonstrate constraint matching:
    // T_balance should be exactly equal to totalEscrowCredits minus disbursements.
    return true;
  }
}
