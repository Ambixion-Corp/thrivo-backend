import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ProfilesService {
  constructor(private prisma: PrismaService) {}

  async getFounderProfile(userId: string) {
    const profile = await this.prisma.founderProfile.findUnique({
      where: { id: userId },
    });
    if (!profile) {
      throw new NotFoundException('Founder profile not found');
    }
    return profile;
  }

  async updateFounderProfile(userId: string, data: any) {
    return this.prisma.founderProfile.upsert({
      where: { id: userId },
      update: data,
      create: {
        id: userId,
        ...data,
      },
    });
  }

  // Creator, Investor, Consumer profiles follow same structure (mocked/stored in extensions database)
  async getCreatorProfile(userId: string) {
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
}
