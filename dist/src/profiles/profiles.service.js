"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfilesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let ProfilesService = class ProfilesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getFounderProfile(userId) {
        const profile = await this.prisma.founderProfile.findUnique({
            where: { id: userId },
        });
        if (!profile) {
            throw new common_1.NotFoundException('Founder profile not found');
        }
        return profile;
    }
    async updateFounderProfile(userId, data) {
        return this.prisma.founderProfile.upsert({
            where: { id: userId },
            update: data,
            create: {
                id: userId,
                ...data,
            },
        });
    }
    async getCreatorProfile(userId) {
        return {
            userId,
            name: 'Mock Creator',
            handle: 'mockcreator',
            bio: 'Creating tech visuals and code breakdowns.',
            primaryPlatform: 'TikTok',
            audienceSize: '150k',
            engagementRate: '4.8%',
            topSectors: ['SaaS', 'AI'],
            pastSponsors: ['Supabase', 'Vercel'],
        };
    }
};
exports.ProfilesService = ProfilesService;
exports.ProfilesService = ProfilesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProfilesService);
//# sourceMappingURL=profiles.service.js.map