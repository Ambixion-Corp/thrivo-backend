import { ProfilesService } from './profiles.service';
export declare class ProfilesController {
    private readonly profilesService;
    constructor(profilesService: ProfilesService);
    getFounder(req: any): Promise<{
        id: string;
        company_name: string;
        legal_entity_identifier: string;
        pitch_deck_url: string;
        funding_goal: import("@prisma/client-runtime-utils").Decimal;
    }>;
    updateFounder(req: any, body: any): Promise<{
        id: string;
        company_name: string;
        legal_entity_identifier: string;
        pitch_deck_url: string;
        funding_goal: import("@prisma/client-runtime-utils").Decimal;
    }>;
    getCreator(req: any): Promise<{
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
