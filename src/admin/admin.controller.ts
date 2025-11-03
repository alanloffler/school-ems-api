import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from "@nestjs/common";

import { AdminService } from "@admin/admin.service";
import { CreateAdminDto } from "@/admin/dto/create-admin.dto";
import { UpdateAdminDto } from "@admin/dto/update-admin.dto";
import { Roles } from "@/common/decorators/roles.decorator";
import { ERole } from "@/common/enums/role.enum";

@Roles([ERole.Superadmin])
@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  create(@Body() admin: CreateAdminDto) {
    return this.adminService.create(admin);
  }

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
