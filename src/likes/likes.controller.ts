import { Controller, Delete, Post } from "@nestjs/common";

@Controller("like")
export class LikesController {
  @Post("")
  test() {}

  @Delete("")
  test2() {}
}
