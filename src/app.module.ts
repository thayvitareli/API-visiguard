import { Module } from '@nestjs/common';

import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { JwtAuthGuard } from './modules/auth/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { VehicleModule } from './modules/vehicle/vehicle.module';
import { SuplierModule } from './modules/suplier/suplier.module';
import { VisitorModule } from './modules/visitor/visitor.module';
import { CheckInOutModule } from './modules/check-in-out/check-in-out.module';
import { UserModule } from './modules/user/user.module';
import { CollaboratorModule } from './modules/collaborator/collaborator.module';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    VehicleModule,
    SuplierModule,
    CollaboratorModule,
    VisitorModule,
    CheckInOutModule,
    UserModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
