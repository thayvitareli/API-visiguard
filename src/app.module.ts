import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { JwtAuthGuard } from './modules/auth/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { VehicleModule } from './modules/vehicle/vehicle.module';
import { SuplierModule } from './modules/suplier/suplier.module';
import { ColaboratorModule } from './modules/colaborator/colaborator.module';
import { VisitorModule } from './modules/visitor/visitor.module';
import { CheckInOutModule } from './modules/check-in-out/check-in-out.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    VehicleModule,
    SuplierModule,
    ColaboratorModule,
    VisitorModule,
    CheckInOutModule,
    UserModule,
  ],
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
