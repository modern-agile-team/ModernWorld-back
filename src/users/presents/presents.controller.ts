import {
  Controller,
  Delete,
  Get,
  Param,
  ParseEnumPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { PresentsService } from "./presents.service";
import { AcceptReject } from "./enum/present-status-enum";
import { ApiTags } from "@nestjs/swagger";

@Controller("presents")
@ApiTags("Presents")
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
  //유저 선물 생성
  @Post(":presentNo/user/:userNo")
  presentOneItem(
    @Param("userNo", ParseIntPipe) receiverNo: number,
    @Param("presentNo", ParseIntPipe) presentNo: number,
  ) {
    console.log(`Post /presents/:${presentNo}/users/:${receiverNo}`);

    const userNo = 1;
  }
}
