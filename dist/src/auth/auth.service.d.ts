import { PrismaService } from '../prisma.service';
export declare class AuthService {
    private prisma;
    constructor(prisma: PrismaService);
    validateToken(token: string): Promise<{
        userId: string;
        email: string;
        roleFlags: string;
    }>;
}
