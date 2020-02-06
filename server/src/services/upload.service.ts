import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UploadService {
  constructor(private prisma: PrismaService){}

  updateAvatar(url, id){
    this.prisma.client.updateUser({
      data: {
        avatarUrl: url,
      },
      where: {
        id: id,
      },
    });
    return id;
  }
}
