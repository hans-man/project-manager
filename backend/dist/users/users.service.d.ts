import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    create(createUserDto: CreateUserDto): Promise<User>;
    findOneByEmail(email: string): Promise<User | null>;
    findOneById(id: number): Promise<User | null>;
    validateUser(email: string, pass: string): Promise<Omit<User, 'password'> | null>;
}
