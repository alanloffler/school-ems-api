import { Injectable } from "@nestjs/common";

import type { IRequest } from "@auth/interfaces/request.interface";
import { AdminService } from "@/admin/admin.service";

@Injectable()
export class AuthService {
  constructor(private readonly adminService: AdminService) {}

  async signIn(req: IRequest, res) {
    console.log(req.user);
    // const admin = await this.adminService.findOne({ where: { email } });
    // return admin;
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.adminService.findOne({ where: { email } });

    if (!user) {
      throw new HttpException("Invalid credentials", HttpStatus.UNAUTHORIZED);
    }

    return {
      id: user.id,
      email: user.email,
      role: user.role,
    };
  }
}
