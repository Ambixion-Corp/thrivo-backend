import { PrismaService } from '../prisma.service';
export declare class EscrowService {
    private prisma;
    constructor(prisma: PrismaService);
    createDeal(data: {
        creatorId: string;
        founderId: string;
        amount: number;
    }): Promise<{
        id: string;
        contracted_amount: import("@prisma/client-runtime-utils").Decimal;
        escrow_status: import("@prisma/client").$Enums.EscrowStatus;
        creator_id: string;
        founder_id: string;
    }>;
    verifyLedgerIntegrity(): Promise<boolean>;
}
