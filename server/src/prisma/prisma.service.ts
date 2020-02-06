import { Injectable } from '@nestjs/common';
import { Prisma } from '../generated/prisma-client';

@Injectable()
export class PrismaService {
  client: Prisma;

  constructor() {
    this.client = new Prisma({
      // TODO change service name 'blog' and stage 'dev'
      // TODO get endpoint from .env file
      endpoint: 'https://eu1.prisma.sh/richard-scott/testApp/dev',
      // secret: process.env.PRISMA_SECRET
      // debug: !configService.getBoolean('PRODUCTION'),
    });
  }
}
