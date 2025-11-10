import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, UseGuards } from "@nestjs/common";

import { AdminService } from "@admin/admin.service";
import { CreateAdminDto } from "@/admin/dto/create-admin.dto";
import { ERole } from "@/common/enums/role.enum";
import { JwtAuthGuard } from "@/auth/guards/jwt-auth.guard";
import { Roles } from "@/common/decorators/roles.decorator";
import { UpdateAdminDto } from "@admin/dto/update-admin.dto";

@Roles([ERole.Superadmin])
@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  create(@Body() admin: CreateAdminDto) {
    return this.adminService.create(admin);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @Get(":id")
  findOne(@Param("id", ParseUUIDPipe) id: string) {
    return this.adminService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id", ParseUUIDPipe) id: string, @Body() admin: UpdateAdminDto) {
    return this.adminService.update(id, admin);
  }

  @Delete(":id")
  remove(@Param("id", ParseUUIDPipe) id: string) {
    return this.adminService.remove(id);
  }
}
