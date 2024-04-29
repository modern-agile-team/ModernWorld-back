import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
} from "@nestjs/common";

@Controller("presents")
export class PresentsController {
  @Get("inbox")
  getInboxPresents() {
    console.log("asd");

    return 0;
  }

  @Get("outbox")
  getOutboxPresents() {
    console.log("dd");

    return 0;
  }

  @Get("outbox/:presentNo")
  getOutboxOnePresent(@Param("presentNo", ParseIntPipe) presentNo: number) {
    console.log("outbox", presentNo);

    return 0;
  }

  @Get("inbox/:presentNo")
  getInboxOnePresent(@Param("presentNo", ParseIntPipe) presentNo: number) {
    console.log("inbox", presentNo);

    return 0;
  }

  @Patch("inbox/:presentNo/accept")
  acceptOnePresent(@Param("presentNo", ParseIntPipe) presentNo: number) {
    console.log("inbox/:prensentNo/accept", presentNo);

    return 0;
  }

  @Patch("inbox/:presentNo/reject")
  rejectOnePresent(@Param("presentNo", ParseIntPipe) presentNo: number) {
    console.log("inbox/:prensentNo/reject", presentNo);

    return 0;
  }

  @Delete("outbox/:presentNo")
  deleteOutboxOnePresent(@Param("presentNo", ParseIntPipe) prensentNo: number) {
    console.log("outbox/:presentNo", prensentNo);

    return 0;
  }

  @Delete("inbox/:presentNo")
  deleteInboxOnePresent(@Param("presentNo", ParseIntPipe) prensentNo: number) {
    console.log("inbox/:presentNo", prensentNo);

    return 0;
  }
}
