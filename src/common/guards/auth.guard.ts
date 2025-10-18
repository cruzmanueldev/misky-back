import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization']?.replace('Bearer ', '');

    const expectedToken = this.configService.get<string>('TOKEN_AUTH');

    if (!token) {
      throw new UnauthorizedException('Token no enviado');
    }

    if (token !== expectedToken) {
      throw new UnauthorizedException('Token inválido');
    }

    return true;
  }
}
