import type { Response } from "express";
import { Controller, Post, Req, Res, UseGuards } from "@nestjs/common";

import type { IRequest } from "@auth/interfaces/request.interface";
import { AuthService } from "@auth/auth.service";
import { LocalAuthGuard } from "@auth/guards/local-auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post("signIn")
  signIn(@Req() req: IRequest, @Res({ passthrough: true }) res: Response) {
    return this.authService.signIn(req, res);
  }
}
