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

  @Get()
  getPresentsByBox(
    @Query("senderReceiverNoField", new ParseEnumPipe(SenderReceiverNoField))
    senderReceiverNoField?: SenderReceiverNoField,
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
    @Query("acceptReject", new ParseEnumPipe(AcceptReject))
    acceptReject: AcceptReject,
  ) {
    const userNo = 1;

    return this.presentsService.acceptOrRejectOnePresent(
      userNo,
      presentNo,
      acceptReject,
    );
  }
}
