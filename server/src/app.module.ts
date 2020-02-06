import { GraphQLModule } from '@nestjs/graphql';
import { HttpException, HttpStatus, Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './resolvers/auth/auth.module';
import { UserModule } from './resolvers/user/user.module';
import { PostModule } from './resolvers/post/post.module';
import { MulterModule } from '@nestjs/platform-express';
import { AppResolver } from './resolvers/app.resolver';
import { DateScalar } from './common/scalars/date.scalar';
import * as multer from 'multer';
import { UploadService } from './services/upload.service';


@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: './src/schema.graphql',
      debug: true,
      playground: true,
      context: ({ req }) => ({ req })
    }),
    PrismaModule,
    MulterModule,
    AuthModule,
    UserModule,
    PostModule,

  ],
  controllers: [AppController],
  providers: [AppService, UploadService, AppResolver, DateScalar]
})
export class AppModule {}
