import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      accelerateUrl:
        process.env.DATABASE_URL ||
        'postgresql://dummy:dummy@localhost:5432/dummy',
    });
  }

  async onModuleInit() {
    try {
      await this.$connect();
    } catch (error) {
      console.warn(
        'WARNING: Local database connection failed. Running backend in fallback offline mode.',
      );
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
