import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('profiles')
@UseGuards(AuthGuard)
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Get('founder')
  async getFounder(@Req() req: any) {
    return this.profilesService.getFounderProfile(req.user.userId);
  }

  @Post('founder')
  async updateFounder(@Req() req: any, @Body() body: any) {
    return this.profilesService.updateFounderProfile(req.user.userId, body);
  }

  @Get('creator')
  async getCreator(@Req() req: any) {
    return this.profilesService.getCreatorProfile(req.user.userId);
  }
}
