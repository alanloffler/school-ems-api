import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Admin } from "@admin/entities/admin.entity";
import { AdminController } from "@admin/admin.controller";
import { AdminService } from "@admin/admin.service";

@Module({
  imports: [TypeOrmModule.forFeature([Admin])],
  providers: [AdminService],
  controllers: [AdminController],
  exports: [AdminService],
})
export class AdminModule {}
