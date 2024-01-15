import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { RefreshDto } from "./dto/refresh.dto";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    @HttpCode(200)
    async login(@Body() dataLogin: LoginDto) {
        return this.authService.login(dataLogin)
    }

    @Post('refresh')
    @HttpCode(200)
    async refresh(@Body() dataRefresh: RefreshDto) {
        return this.authService.refresh(dataRefresh)
    }
}