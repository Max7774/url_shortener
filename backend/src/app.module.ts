import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';
import { fileStorage } from './utils/storage';

@Module({
  imports: [AuthModule, MulterModule.register({ storage: fileStorage })],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
