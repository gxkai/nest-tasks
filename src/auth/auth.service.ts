import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private readonly userRepository: UserRepository
    ) { }

    signUp(authCretentialDto: AuthCredentialsDto): Promise<void> {
        return this.userRepository.signUp(authCretentialDto);
    }

    async signIn(authCretentialDto: AuthCredentialsDto) {
        const username = await this.userRepository.validateUserPassword(authCretentialDto);
        if (!username) {
            throw new UnauthorizedException('Invalid credentials');
        }
    }


}
