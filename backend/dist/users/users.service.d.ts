import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findOneByLoginId(loginId: string): Promise<User | null>;
    findOneById(id: number): Promise<User | null>;
    findOneByEmail(email: string): Promise<User | null>;
    validateUser(email: string, pass: string): Promise<Omit<User, 'password'> | null>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<User | null>;
    changePassword(id: number, newPassword: string): Promise<User | null>;
    remove(id: number): Promise<User | null>;
}
