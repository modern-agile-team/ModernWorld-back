import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Query,
} from "@nestjs/common";
import { PresentsService } from "./presents.service";

@Controller("presents")
export class PresentsController {
  constructor(private readonly presentsService: PresentsService) {}

  @Get("")
  getPresentsByBox(@Query("where") where: string) {
    console.log("Get /presents/?where={where}");
    const userNo = 1;

    return this.presentsService.getOneOrManyPresentsByBox(userNo, where);
  }

  @Get(":presentNo")
  getOnePresentByBox(
    @Param("presentNo", ParseIntPipe) presentNo: number,
    @Query("where") where: string,
  ) {
    console.log("Get /presents/:presentNo/?where={where}");

    const userNo = 1;

    return this.presentsService.getOneOrManyPresentsByBox(
      userNo,
      where,
      presentNo,
    );
  }

  @Patch("inbox/:presentNo/accept")
  acceptOnePresent(@Param("presentNo", ParseIntPipe) presentNo: number) {
    console.log("Patch /inbox/:prensentNo/accept", presentNo);

    const userNo = 1;

    return this.presentsService.acceptOnePresent(userNo, presentNo);
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
