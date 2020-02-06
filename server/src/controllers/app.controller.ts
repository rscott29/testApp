import {
  Controller,
  Param,
  Post,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { UploadService } from '../services/upload.service';
import { Mutation } from 'type-graphql';
import { User } from '../models/user';
import { Resolver } from '@nestjs/graphql';
import { PrismaService } from '../prisma/prisma.service';

const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: 'rscott',
  api_key: '933425886238987',
  api_secret: 'xNvw-Hx71xsf84o_p6mcZ44HFy4'
});
@Controller()
@Resolver('Upload')
export class AppController {
  constructor(
    private uploadService: UploadService,
    private prisma: PrismaService
  ) {}

  @Post('upload/:userid')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: cloudinaryStorage({
        cloudinary: cloudinary,
        folder: 'uploads',
        filename: function(req, file, cb) {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        }
      })
    })
  )
  @Mutation(returns => User)
  async updateUser(@Param('userid') userId, @UploadedFile() file) {
    return this.prisma.client.updateUser({
      data: {
        avatarUrl: file.secure_url
      },
      where: {
        id: userId
      }
    });
  }
}
