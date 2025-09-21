import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    create(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>>;
    findOneByEmail(email: string): Promise<User | null>;
    validateUser(email: string, pass: string): Promise<Omit<User, 'password'> | null>;
    findAll(): Promise<Omit<User, 'password'>[]>;
    findOne(id: number): string;
    update(id: number, _updateUserDto: any): string;
    remove(id: number): string;
}
