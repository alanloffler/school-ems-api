import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";

import { AdminModule } from "@admin/admin.module";
import { AuthController } from "@auth/auth.controller";
import { AuthService } from "@auth/auth.service";
import { JwtRefreshStrategy } from "@auth/strategies/jwt-refresh.strategy";
import { JwtStrategy } from "@auth/strategies/jwt.strategy";
import { LocalStrategy } from "@auth/strategies/local.strategy";

@Module({
  imports: [
    AdminModule,
    PassportModule,
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_SECRET"),
        signOptions: {
          expiresIn: configService.get<any>("JWT_EXPIRES_IN") || "7d",
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtRefreshStrategy, LocalStrategy],
})
export class AuthModule {}
