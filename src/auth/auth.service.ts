import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(private readonly userRepository: UserRepository) {}

    async signUp(authCredentialDto: AuthCredentialsDto): Promise<void> {
        return this.userRepository.createUser(authCredentialDto);
    }

    async signIn(authCredentialDto: AuthCredentialsDto): Promise<string> {
        const { username, password } = authCredentialDto;
        const user = await this.userRepository.findOneUser(username);
        if (user && (await bcrypt.compare(password, user.password))) {
            return 'Login success';
        } else {
            throw new UnauthorizedException('Login failed');
        }
    }
}
