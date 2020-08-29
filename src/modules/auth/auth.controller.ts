import { Controller, Body, UsePipes, ValidationPipe, Post } from '@nestjs/common';
import { SignupDto, SigninDto } from './dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly _authService: AuthService) { }

    @Post('/signup')
    @UsePipes(ValidationPipe)
    async singup(@Body() signupDto: SignupDto) {
        return this._authService.signup(signupDto);
    }

    @Post('/signin')
    @UsePipes(ValidationPipe)
    async singin(@Body() signinDto: SigninDto) {
        return this._authService.signin(signinDto);
    }
}
