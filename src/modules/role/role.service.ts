import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { RoleRepository } from './role.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../role/role.entity';
import { ReadRoleDto, CreateRoleDto, UpdateRoleDto } from './dtos';
import { plainToClass } from 'class-transformer';
import { status } from '../../shared/entity-status.enum';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(RoleRepository)
        private readonly _roleRepository: RoleRepository,
    ) {
    }
    async get(id: number): Promise<ReadRoleDto> {
        if (!id) {
            throw new BadRequestException('Id must be sent');
        }
        const role = await this._roleRepository.findOne(id, { where: { status: status.ACTIVE } });
        if (!role) {
            throw new NotFoundException();
        }
        return plainToClass(ReadRoleDto, role);
    }
    async getAll(): Promise<ReadRoleDto[]> {
        const roles = await this._roleRepository.find({ where: { status: status.ACTIVE } });
        return roles.map((role) => plainToClass(ReadRoleDto, role));
    }
    async create(role: Partial<CreateRoleDto>): Promise<ReadRoleDto> {
        const savedRole = await this._roleRepository.save(role);
        return plainToClass(ReadRoleDto, savedRole);
    }
    async update(id: number, role: Partial<ReadRoleDto>): Promise<ReadRoleDto> {
        const foundRole: Role = await this._roleRepository.findOne(id, {
            where: { status: status.ACTIVE }
        });
        if (!foundRole) {
            throw new NotFoundException('This roles does not exist');
        }
        foundRole.name = role.name;
        foundRole.description = role.description;
        const updatedRole: Role = await this._roleRepository.save(foundRole);
        return plainToClass(ReadRoleDto, updatedRole);
    }
    async delete(id: number): Promise<void> {
        const role = this._roleRepository.findOne(id, { where: { status: status.ACTIVE } });
        if (!role) {
            throw new NotFoundException();
        }
        await this._roleRepository.update(id, { status: status.INACTIVE })
    }
}
