import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { RoleRepository } from './role.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../role/role.entity';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(RoleRepository)
        private readonly _roleRepository: RoleRepository,
    ) {
    }
    async get(id: number): Promise<Role> {
        if (!id) {
            throw new BadRequestException('Id must be sent');
        }
        const role = await this._roleRepository.findOne(id, { where: { status: 'ACTIVE' } });
        if (!role) {
            throw new NotFoundException();
        }
        return role;
    }
    async getAll(): Promise<Role[]> {
        const roles = await this._roleRepository.find({ where: { status: 'ACTIVE' } });
        return roles;
    }
    async create(role: Role): Promise<Role> {
        const savedRole = await this._roleRepository.save(role);
        return savedRole;
    }
    async update(id: number, role: Role): Promise<void> {
        await this._roleRepository.update(id, role);
    }
    async delete(id: number): Promise<void> {
        const role = this._roleRepository.findOne(id, { where: { status: 'ACTIVE' } });
        if (!role) {
            throw new NotFoundException();
        }
        await this._roleRepository.update(id, { status: 'INACTIVE' })
    }
}
