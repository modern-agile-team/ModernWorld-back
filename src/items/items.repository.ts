import { PrismaService } from "src/prisma/prisma.service";

export class ItemsRepository {
  constructor(private readonly prisma: PrismaService) {}
}
