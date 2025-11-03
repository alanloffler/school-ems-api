import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Admin } from "@admin/entities/admin.entity";
import { ApiResponse } from "@/common/helpers/api-response.helper";
import { CreateAdminDto } from "@/admin/dto/create-admin.dto";
import { UpdateAdminDto } from "@admin/dto/update-admin.dto";

@Injectable()
export class AdminService {
  constructor(@InjectRepository(Admin) private adminRepository: Repository<Admin>) {}

  async create(createAdminDto: CreateAdminDto): Promise<ApiResponse<Admin>> {
    const createAdmin = this.adminRepository.create(createAdminDto);
    const saveAdmin = await this.adminRepository.save(createAdmin);
    if (!saveAdmin) throw new HttpException("Error al crear admin", HttpStatus.BAD_REQUEST);

    return ApiResponse.created<Admin>("Admin creado", saveAdmin);
  }

  async findAll(): Promise<ApiResponse<Admin[]>> {
    const admins = await this.adminRepository.find();
    if (!admins) throw new HttpException("Admins no encontrados", HttpStatus.NOT_FOUND);

    return ApiResponse.success<Admin[]>("Admins encontrados", admins);
  }

  async findOne(id: string): Promise<ApiResponse<Admin>> {
    const admin = await this.adminRepository.findOne({ where: { id } });
    if (!admin) throw new HttpException("Admin no encontrado", HttpStatus.NOT_FOUND);

    return ApiResponse.success<Admin>("Admin encontrado", admin);
  }

  async update(id: string, updateAdminDto: UpdateAdminDto): Promise<ApiResponse<Admin>> {
    const adminToUpdate = await this.findAdminById(id);

    const merged = this.adminRepository.merge(adminToUpdate, updateAdminDto);
    const result = await this.adminRepository.save(merged);
    if (!result) throw new HttpException("Error al actualizar admin", HttpStatus.BAD_REQUEST);

    return ApiResponse.success<Admin>("Admin actualizado", result);
  }

  async remove(id: string): Promise<ApiResponse<Admin>> {
    const adminToRemove = await this.findAdminById(id);

    const result = await this.adminRepository.remove(adminToRemove);
    if (!result) throw new HttpException("Error al eliminar admin", HttpStatus.BAD_REQUEST);

    return ApiResponse.removed<Admin>("Admin eliminado", result);
  }

  private async findAdminById(id: string): Promise<Admin> {
    const admin = await this.adminRepository.findOne({ where: { id } });
    if (!admin) throw new HttpException("Admin no encontrado", HttpStatus.NOT_FOUND);

    return admin;
  }
}
