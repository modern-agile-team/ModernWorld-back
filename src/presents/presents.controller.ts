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
import { AcceptReject } from "./enum/present-status-enum";

@Controller("presents")
export class PresentsController {
  constructor(private readonly presentsService: PresentsService) {}

  @Get("")
  getPresentsByBox(
    @Query("senderReceiverNoField", new ParseEnumPipe(SenderReceiverNoField))
    senderReceiverNoField: SenderReceiverNoField,
  ) {
    console.log("Get /presents/?senderReceiverNoField=");
    const userNo = 1;

    return this.presentsService.getOneOrManyPresentsByBox(
      userNo,
      senderReceiverNoField,
    );
  }

  @Get(":presentNo")
  getOnePresentByBox(
    @Param("presentNo", ParseIntPipe) presentNo: number,
    @Query("senderReceiverNoField", new ParseEnumPipe(SenderReceiverNoField))
    senderReceiverNoField: SenderReceiverNoField,
  ) {
    console.log("Get /presents/:presentNo/?senderReceiverNoField=");

    const userNo = 1;

    return this.presentsService.getOneOrManyPresentsByBox(
      userNo,
      senderReceiverNoField,
      presentNo,
    );
  }

  @Patch(":presentNo")
  updatePresentStatus(
    @Param("presentNo", ParseIntPipe) presentNo: number,
    @Query("senderReceiverNoField", new ParseEnumPipe(SenderReceiverNoField))
    senderReceiverNoField: SenderReceiverNoField,
    @Query("acceptReject", new ParseEnumPipe(AcceptReject))
    acceptReject: AcceptReject,
  ) {
    const userNo = 1;

    console.log(userNo, presentNo, senderReceiverNoField, acceptReject);

    return this.presentsService.acceptOrRejectOnePresent(
      userNo,
      presentNo,
      acceptReject,
    );
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
