import { Controller, Get, Param, Post, Body, Put, Patch, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../role/decorators/role.decorator';
import { RoleGuard } from '../role/guards/role.guard';
import { RoleType } from '../role/roletype.enum';
import { ReadUserDto, UpdateUserDto } from './dto';

@Controller('users')
export class UserController {
    constructor(private readonly _userService: UserService) {
    }

    @UseGuards(AuthGuard())
    @Get()
    async getUsers(): Promise<ReadUserDto[]> {
        return await this._userService.getAll();
    }

    @Get(':id')
    @Roles(RoleType.ADMIN, RoleType.AUTHOR)
    @UseGuards(AuthGuard(), RoleGuard)
    async getUser(@Param('id', ParseIntPipe) id: number): Promise<ReadUserDto> {
        return await this._userService.get(id);
    }

    // @Post()
    // async createUser(@Body() user: User): Promise<User> {
    //     const createdUser = await this._userService.create(user);
    //     return createdUser;
    // }

    @Patch(':id')
    async updateUser(@Param('id', ParseIntPipe) id: number, @Body() user: Partial<UpdateUserDto>): Promise<ReadUserDto> {
        return await this._userService.update(id, user);
    }

    @Delete(':id')
    async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return await this._userService.delete(id);
    }

    @Post('setRole/:userId/:roleId')
    async setRoleToUser(
        @Param('userId', ParseIntPipe) userId: number,
        @Param('roleId', ParseIntPipe) roleId: number
    ): Promise<Boolean> {
        return this._userService.setRoleToUserr(userId, roleId);
    }
}
