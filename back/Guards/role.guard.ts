import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private readonly jwtService: JwtService,
    ) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles = this.reflector.get<string[]>('requiredRoles', context.getHandler());
        console.log(requiredRoles);
        if (!requiredRoles || requiredRoles.length === 0) {
            return true; // No required roles specified, allow access
        }
        const request = context.switchToHttp().getRequest();
        const user = this.getUserFromToken(request.headers.authorization);
        if (!user) {
            return false; // No user or invalid token, deny access
        }
        return requiredRoles.some(role => user.role === role);
    }

    private getUserFromToken(authorizationHeader: string): { role: string } | null {
        const token = this.extractToken(authorizationHeader);
        console.log(token)
        if (!token) {
            return null;
        }
        try {
            console.log("try")
            const decodedToken = this.jwtService.verify(token);
            console.log(decodedToken)
            return decodedToken && decodedToken.role ? { role: decodedToken.role } : null;
        } catch (error) {
            console.error('Error decoding token:', error);
            return null; // Token is invalid
        }
    }

    protected extractToken(authorizationHeader: string): string | null {
        const tokenParts = authorizationHeader.split(' ');
        if (tokenParts.length === 2 && tokenParts[0] === 'Bearer') {
            return tokenParts[1];
        }
        return null;
    }
}
