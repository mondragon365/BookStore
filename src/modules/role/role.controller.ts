import { Controller, Get, Param, Post, Body, Put, Patch, Delete, ParseIntPipe } from '@nestjs/common';
import { RoleService } from './role.service';
import { Role } from './role.entity';
import { ReadRoleDto, CreateRoleDto, UpdateRoleDto } from './dtos';

@Controller('roles')
export class RoleController {
    constructor(private readonly _roleService: RoleService) {
    }

    @Get()
    async getRoles(): Promise<ReadRoleDto[]> {
        return await this._roleService.getAll();
    }

    @Get(':id')
    async getRole(@Param('id', ParseIntPipe) id: number): Promise<ReadRoleDto> {
        return await this._roleService.get(id);
    }

    @Post()
    async createRole(@Body() role: Partial<CreateRoleDto>): Promise<ReadRoleDto> {
        return await this._roleService.create(role);
    }

    @Patch(':id')
    async updateRole(@Param('id', ParseIntPipe) id: number, @Body() role: Partial<UpdateRoleDto>): Promise<ReadRoleDto> {
        return await this._roleService.update(id, role);
    }

    @Delete(':id')
    async deleteRole(@Param('id', ParseIntPipe) id: number) {
        await this._roleService.delete(id);
        return true;
    }
}
