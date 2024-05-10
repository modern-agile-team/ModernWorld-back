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
import { AcceptReject } from "./enum/present-status-enum";

@Controller("users/presents")
export class PresentsController {
  constructor(private readonly presentsService: PresentsService) {}

  @Get("/:presentNo")
  getOnePresent(@Param("presentNo", ParseIntPipe) presentNo: number) {
    console.log(`Get /users/presents/:${presentNo}`);
    const userNo = 1;

    return this.presentsService.getOnePresent(userNo, presentNo);
  }

  // @Get()
  // getPresentsByBox(
  //   @Query("senderReceiverNoField", new ParseEnumPipe(SenderReceiverNoField))
  //   senderReceiverNoField?: SenderReceiverNoField,
  // ) {
  //   console.log("Get /presents/?senderReceiverNoField=");
  //   const userNo = 1;

  //   return this.presentsService.getOneOrManyPresentsByBox(userNo);
  // }

  // @Get(":presentNo")
  // getOnePresentByBox(
  //   @Param("presentNo", ParseIntPipe) presentNo: number,
  //   @Query("senderReceiverNoField", new ParseEnumPipe(SenderReceiverNoField))
  //   senderReceiverNoField: SenderReceiverNoField,
  // ) {
  //   console.log("Get /presents/:presentNo/?senderReceiverNoField=");

  //   const userNo = 1;

  //   return this.presentsService.getOnePresent(
  //     userNo,
  //     senderReceiverNoField,
  //     presentNo,
  //   );
  // }

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
