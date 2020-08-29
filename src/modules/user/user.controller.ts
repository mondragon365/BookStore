import { Controller, Get, Param, Post, Body, Put, Patch, Delete, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';

@Controller('users')
export class UserController {
    constructor(private readonly _userService: UserService) {
    }

    @Get()
    async getUsers(): Promise<UserDto[]> {
        const users = this._userService.getAll();
        return users;
    }

    @Get(':id')
    async getUser(@Param('id', ParseIntPipe) id: number): Promise<UserDto> {
        const user = await this._userService.get(id);
        return user;
    }

    @Post()
    async createUser(@Body() user: User): Promise<UserDto> {
        const createdUser = await this._userService.create(user);
        return createdUser;
    }

    @Patch(':id')
    async updateUser(@Param('id', ParseIntPipe) id: number, @Body() user: User): Promise<void> {
        const updatedUser = await this._userService.update(id, user);
        return updatedUser;
    }

    @Delete(':id')
    async deleteUser(@Param('id', ParseIntPipe) id: number) {
        await this._userService.delete(id);
        return true;
    }
}
