import { UserResolver } from './user.resolver';
import { PrismaModule } from '../../prisma/prisma.module';
import { Module } from '@nestjs/common';
import { UploadService } from '../../services/upload.service';


@Module({
  imports: [PrismaModule],
  providers: [UserResolver, UploadService],
})
export class UserModule {}
