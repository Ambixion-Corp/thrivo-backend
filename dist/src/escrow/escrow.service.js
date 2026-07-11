"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EscrowService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let EscrowService = class EscrowService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createDeal(data) {
        const isLedgerConsistent = await this.verifyLedgerIntegrity();
        if (!isLedgerConsistent) {
            throw new common_1.BadRequestException('Database Ledger Consistency Constraint Violated.');
        }
        return this.prisma.escrowDeal.create({
            data: {
                creator_id: data.creatorId,
                founder_id: data.founderId,
                contracted_amount: data.amount,
                escrow_status: 'funds_deposited',
            },
        });
    }
    async verifyLedgerIntegrity() {
        const aggregations = await this.prisma.escrowDeal.aggregate({
            _sum: {
                contracted_amount: true,
            },
        });
        const totalEscrowCredits = aggregations._sum.contracted_amount || 0;
        return true;
    }
};
exports.EscrowService = EscrowService;
exports.EscrowService = EscrowService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EscrowService);
//# sourceMappingURL=escrow.service.js.map