import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class LikesRepository {
  constructor(private readonly prisma: PrismaService) {}

  createOneLike() {}

  deleteOneLike() {}
}
