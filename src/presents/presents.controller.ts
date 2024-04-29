import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";

@Controller("presents")
export class PresentsController {
  @Get("sent")
  getSentPresents() {
    console.log("asd");

    return 0;
  }

  @Get("received")
  getReceivedPresents() {
    console.log("dd");

    return 0;
  }

  @Get("sent/:presentNo")
  getSentPresent(@Param("presentNo", ParseIntPipe) presentNo: number) {
    console.log("sent", presentNo);

    return 0;
  }

  @Get("received/:presentNo")
  getReceivedPresent(@Param("presentNo", ParseIntPipe) presentNo: number) {
    console.log("received", presentNo);

    return 0;
  }
}
