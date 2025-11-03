import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Role } from "@roles/entities/role.entity";
import { RolesController } from "@roles/roles.controller";
import { RolesService } from "@roles/roles.service";

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
