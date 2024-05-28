import { Controller, Delete, Post } from "@nestjs/common";
import { LikesService } from "./likes.service";

@Controller("like")
export class LikesController {
  constructor(private readonly likesService: LikesService) {}
  @Post("")
  test() {}

  @Delete("")
  test2() {}
}
