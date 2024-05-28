import { Injectable } from "@nestjs/common";
import { LikesRepository } from "./likes.repository";

@Injectable()
export class LikesService {
  constructor(private readonly likesRepository: LikesRepository) {}

  createOneLike() {}

  deleteOneLike() {}
}
