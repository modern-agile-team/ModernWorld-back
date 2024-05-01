import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  Param,
  ParseEnumPipe,
  ParseIntPipe,
  Patch,
  Query,
} from "@nestjs/common";
import { PresentsService } from "./presents.service";
import { SenderReceiverNoField } from "./enum/present-senderReceiverNo-enum";

@Controller("presents")
export class PresentsController {
  constructor(private readonly presentsService: PresentsService) {}

  @Get("")
  getPresentsByBox(
    @Query("where", new ParseEnumPipe(SenderReceiverNoField))
    senderReceiverNoField: SenderReceiverNoField,
  ) {
    console.log("Get /presents/?where={where}");
    const userNo = 1;

    return this.presentsService.getOneOrManyPresentsByBox(
      userNo,
      senderReceiverNoField,
    );
  }

  @Get(":presentNo")
  getOnePresentByBox(
    @Param("presentNo", ParseIntPipe) presentNo: number,
    @Query("senderReceiverNoFieldw", new ParseEnumPipe(SenderReceiverNoField))
    senderReceiverNoField: SenderReceiverNoField,
  ) {
    console.log("Get /presents/:presentNo/?where={where}");

    const userNo = 1;

    return this.presentsService.getOneOrManyPresentsByBox(
      userNo,
      senderReceiverNoField,
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

  @Delete(":presentNo")
  deleteOnePresent(
    @Param("presentNo", ParseIntPipe) presentNo: number,
    @Query(
      "senderReceiverNoField",
      new ParseEnumPipe(SenderReceiverNoField, {
        exceptionFactory() {
          return new BadRequestException(
            "Validation failed (enum: senderNo,receiverNo)",
          );
        },
      }),
    )
    senderReceiverNoField: SenderReceiverNoField,
  ) {
    console.log("Delete /:presentNo?where=");

    const userNo = 1;

    return this.presentsService.updateOnePresentTodelete(
      userNo,
      senderReceiverNoField,
      presentNo,
    );
  }
}
