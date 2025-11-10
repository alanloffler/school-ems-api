import type { Request } from "express";
import { ConfigService } from "@nestjs/config";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

import { AdminService } from "@admin/admin.service";

export interface IJwtPayload {
  sub: string;
  email: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly adminService: AdminService,
  ) {
    const secret = configService.get<string>("JWT_SECRET");
    if (!secret) throw new Error("JWT_SECRET no está definido");

    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.accessToken;
        },
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  async validate(payload: IJwtPayload) {
    const admin = await this.adminService.findOne(payload.sub);
    if (!admin) throw new HttpException("Admin no encontrado", HttpStatus.UNAUTHORIZED);

    return {
      id: admin.data?.id,
      email: admin.data?.email,
      role: admin.data?.role.value,
    };
  }
}
