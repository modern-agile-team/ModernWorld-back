import {
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
import { SenderReceiverNoField } from "./enum/present-senderReceiverNo-enum";

@Controller("users/presents")
export class PresentsController {
  constructor(private readonly presentsService: PresentsService) {}

  @Get("all")
  getPresents() {
    console.log(`Get /users/presents/all`);

    const userNo = 1;

    return this.presentsService.getPresents(userNo);
  }

  @Get(":presentNo")
  getOnePresent(@Param("presentNo", ParseIntPipe) presentNo: number) {
    console.log(`Get /users/presents/:${presentNo}`);
    const userNo = 1;

    return this.presentsService.getOnePresent(userNo, presentNo);
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

  //유저 선물 softDelete
  @Delete(":presentNo")
  deleteOnePresent(@Param("presentNo", ParseIntPipe) presentNo: number) {
    console.log(`Delete /users/presents/:${presentNo}`);

    const userNo = 1;

    return this.presentsService.updateOnePresentTodelete(userNo, presentNo);
  }
}
