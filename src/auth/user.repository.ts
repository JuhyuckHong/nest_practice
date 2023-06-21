import {
    Injectable,
    ConflictException,
    InternalServerErrorException,
} from '@nestjs/common';
import { Auth, Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async createUser(authCredentialDto: AuthCredentialsDto): Promise<void> {
        const { username, password } = authCredentialDto;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = this.userRepository.create({
            username,
            password: hashedPassword,
        });

        try {
            await this.userRepository.save(user);
        } catch (error) {
            console.log(error);
            if (error.errno === 1062) {
                throw new ConflictException('Existing username');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async findOneUser(username: string): Promise<User> {
        const user = await this.userRepository.findOne({ where: { username } });
        return user;
    }
}
