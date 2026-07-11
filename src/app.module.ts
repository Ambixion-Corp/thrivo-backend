import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProfilesModule } from './profiles/profiles.module';
import { EscrowModule } from './escrow/escrow.module';
import { MediaModule } from './media/media.module';
import { WebsocketModule } from './websocket/websocket.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    AuthModule,
    ProfilesModule,
    EscrowModule,
    MediaModule,
    WebsocketModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}

