import { BadRequestException, Injectable, NestMiddleware, Request } from "@nestjs/common";
import { NextFunction } from "express";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private authService: AuthService) { }
    async use(@Request() req, res: Response, next: NextFunction) {
        const token = req.headers['authorization']?.split(' ')[1];
        if (token) {
            const userId = await this.authService.verifyToken(token);

            if (!userId) {
                throw new BadRequestException('Token is invalid');
            }
            const user = await this.authService.validateUser({ userId: userId.toString() });
            req.user = user;
        }
        next();
    }
}