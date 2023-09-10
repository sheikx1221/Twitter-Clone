import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

const publicPaths = [
  { url: '/auth/login', method: 'POST' },
  { url: '/auth/register', method: 'POST' }
];

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private authService: AuthService) {
    super();
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    let valid = false;
    console.log({ request: { path: request.url, method: request.method }});
    for (let path of publicPaths) {
      if (request.url === path.url && request.method === path.method) { valid = true; break; }
    }

    if (valid) return true;

    const token = request.headers.authorization?.split(' ')[1];

    if (token) {
      const isValid = this.authService.validateToken(token);
      if (isValid) {
        return true;
      }
    }

    return false;
  }
}