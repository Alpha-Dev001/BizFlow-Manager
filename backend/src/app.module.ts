// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { CacheModule } from '@nestjs/cache-manager';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { DepartmentsModule } from './modules/departments/departments.module';
import { UsersModule } from './modules/users/users.module'
import { ChatsModule } from './modules/chats/chats.module';
import { MeetingsModule } from './modules/meetings/meetings.module';
import { NotificationsModule } from './modules/notifications/notifications.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.register({
        isGlobal: true,
        ttl:600000,
    }),
    PrismaModule,
    AuthModule,
    DepartmentsModule,
    UsersModule,
    ChatsModule,
    MeetingsModule,
    NotificationsModule
  ],

  providers:[{
    provide:APP_GUARD,
    useClass:JwtAuthGuard
  }]
})
export class AppModule {}
