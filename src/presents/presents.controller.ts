import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
} from "@nestjs/common";
import { PresentsService } from "./presents.service";

@Controller("presents")
export class PresentsController {
  constructor(private readonly presentsService: PresentsService) {}
  @Get("inbox")
  getInboxPresents() {
    console.log("Get /presents/inbox");

    const userNo = 1;

    return this.presentsService.getInboxPresents(userNo);
  }

  @Get("outbox")
  getOutboxPresents() {
    console.log("Get /presents/outbox");

    const userNo = 2;

    return this.presentsService.getOutboxPresents(userNo);
  }

  @Get("inbox/:presentNo")
  getInboxOnePresent(@Param("presentNo", ParseIntPipe) presentNo: number) {
    console.log("Get /inbox/:presentNo", presentNo);

    const userNo = 1;

    return this.presentsService.getInboxOnePresent(userNo, presentNo);
  }

  @Get("outbox/:presentNo")
  getOutboxOnePresent(@Param("presentNo", ParseIntPipe) presentNo: number) {
    console.log("Get /outbox/:presentNo", presentNo);

    const userNo = 2;

    return this.presentsService.getOutboxOnePresent(userNo, presentNo);
  }

  @Patch("inbox/:presentNo/accept")
  acceptOnePresent(@Param("presentNo", ParseIntPipe) presentNo: number) {
    console.log("Patch /inbox/:prensentNo/accept", presentNo);

    return 0;
  }

  @Patch("inbox/:presentNo/reject")
  rejectOnePresent(@Param("presentNo", ParseIntPipe) presentNo: number) {
    console.log("Patch /inbox/:prensentNo/reject", presentNo);

    return 0;
  }

  @Delete("outbox/:presentNo")
  deleteOutboxOnePresent(@Param("presentNo", ParseIntPipe) prensentNo: number) {
    console.log("Delete /outbox/:presentNo", prensentNo);

    return 0;
  }

  @Delete("inbox/:presentNo")
  deleteInboxOnePresent(@Param("presentNo", ParseIntPipe) prensentNo: number) {
    console.log("Delete /inbox/:presentNo", prensentNo);

    return 0;
  }
}
