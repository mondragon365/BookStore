import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { RoleRepository } from '../role/role.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserDetails } from './user.details.entity';
import { getConnection } from 'typeorm';
import { Role } from '../role/role.entity';
import { status } from '../../shared/entity-status.enum';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        @InjectRepository(RoleRepository)
        private readonly _userRepository: UserRepository,
        private readonly _roleRepository: RoleRepository,
    ) {
    }
    async get(id: number): Promise<User> {
        if (!id) {
            throw new BadRequestException('Id must be sent');
        }
        const user = await this._userRepository.findOne(id, { where: { status: status.ACTIVE } });
        if (!user) {
            throw new NotFoundException();
        }
        return user;
    }
    async getAll(): Promise<User[]> {
        const users = await this._userRepository.find({ where: { status: status.ACTIVE } });
        return users;
    }
    async create(user: User): Promise<User> {
        const detail = new UserDetails();
        user.details = detail;

        const repo = await getConnection().getRepository(Role);
        const defaultRole = await repo.findOne({ where: { name: 'GENERAL' } })

        user.roles = [defaultRole];

        const savedUser = await this._userRepository.save(user);
        return savedUser;
    }
    async update(id: number, user: User): Promise<void> {
        await this._userRepository.update(id, user);
        //const updatedUser: User = await this._userRepository.update(id, user);
        //return this._mapperService.map<User, User>(updatedUser, new User());
    }
    async delete(id: number): Promise<void> {
        const user = this._userRepository.findOne(id, { where: { status: status.ACTIVE } });
        if (!user) {
            throw new NotFoundException();
        }
        //await this._userRepository.delete(id);
        await this._userRepository.update(id, { status: status.INACTIVE })
    }
    async setRoleToUserr(userId: number, roleId: number) {
        const userExist = await this._userRepository.findOne(userId, {
            where: { status: status.ACTIVE },
        });
        if (!userExist) {
            throw new NotFoundException();
        }
        const roleExist = await this._roleRepository.findOne(roleId, {
            where: { status: status.ACTIVE }
        });
        if (!roleExist) {
            throw new NotFoundException('role does not exist');
        }
        userExist.roles.push(roleExist);
        await this._userRepository.save(userExist);
        return true;
    }
}
