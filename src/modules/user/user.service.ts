import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
//import { MapperService } from './mapper.service';
import { MapperService } from '../../shared/mapper.service';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';
import { UserDetails } from './user.details.entity';
import { getConnection } from 'typeorm';
import { Role } from '../role/role.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private readonly _userRepository: UserRepository,
        private readonly _mapperService: MapperService
    ) {
    }
    async get(id: number): Promise<UserDto> {
        if (!id) {
            throw new BadRequestException('Id must be sent');
        }
        const user = await this._userRepository.findOne(id, { where: { status: 'ACTIVE' } });
        if (!user) {
            throw new NotFoundException();
        }
        return this._mapperService.map<User, UserDto>(user, new UserDto());
    }
    async getAll(): Promise<UserDto[]> {
        const users = await this._userRepository.find({ where: { status: 'ACTIVE' } });
        return this._mapperService.mapCollection<User, UserDto>(users, new UserDto());
    }
    async create(user: User): Promise<UserDto> {
        const detail = new UserDetails();
        user.details = detail;

        const repo = await getConnection().getRepository(Role);
        const defaultRole = await repo.findOne({ where: { name: 'GENERAL' } })

        user.roles = [defaultRole];

        const savedUser = await this._userRepository.save(user);
        return this._mapperService.map<User, UserDto>(savedUser, new UserDto());
    }
    async update(id: number, user: User): Promise<void> {
        await this._userRepository.update(id, user);
        //const updatedUser: User = await this._userRepository.update(id, user);
        //return this._mapperService.map<User, UserDto>(updatedUser, new UserDto());
    }
    async delete(id: number): Promise<void> {
        const user = this._userRepository.findOne(id, { where: { status: 'ACTIVE' } });
        if (!user) {
            throw new NotFoundException();
        }
        //await this._userRepository.delete(id);
        await this._userRepository.update(id, { status: 'INACTIVE' })
    }
}
