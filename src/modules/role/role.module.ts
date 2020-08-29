import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleRepository } from '../role/role.repository';
import { RoleService } from '../role/role.service';
import { RoleController } from '../role/role.controller';

@Module({
    imports: [TypeOrmModule.forFeature([RoleRepository])],
    providers: [RoleService],
    controllers: [RoleController]
})
export class RoleModule { }
