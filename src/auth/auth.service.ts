import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const usuario = await this.usuarioService.findByUsername(username);
    if (!usuario) {
      return null;
    }

    if (
      usuario.password &&
      (await bcrypt.compare(password, usuario.password))
    ) {
      const { password, ...result } = usuario;
      return result;
    }
    return null;
  }

  async login(usuario: any) {
    const payload = { username: usuario.username, sub: usuario.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
