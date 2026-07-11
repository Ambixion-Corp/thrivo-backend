import { PrismaService } from '../prisma.service';
export declare class ProfilesService {
    private prisma;
    constructor(prisma: PrismaService);
    getFounderProfile(userId: string): Promise<{
        id: string;
        company_name: string;
        legal_entity_identifier: string;
        pitch_deck_url: string;
        funding_goal: import("@prisma/client-runtime-utils").Decimal;
    }>;
    updateFounderProfile(userId: string, data: any): Promise<{
        id: string;
        company_name: string;
        legal_entity_identifier: string;
        pitch_deck_url: string;
        funding_goal: import("@prisma/client-runtime-utils").Decimal;
    }>;
    getCreatorProfile(userId: string): Promise<{
        userId: string;
        name: string;
        handle: string;
        bio: string;
        primaryPlatform: string;
        audienceSize: string;
        engagementRate: string;
        topSectors: string[];
        pastSponsors: string[];
    }>;
}
