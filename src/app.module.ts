import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { JwtAuthGuard } from './modules/auth/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { VehicleModule } from './modules/vehicle/vehicle.module';

@Module({
  imports: [AuthModule, DatabaseModule, VehicleModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
